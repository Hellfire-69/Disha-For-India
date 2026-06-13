import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Sliding-window in-memory rate limiter
// Stores timestamps of recent requests per IP.
// Max 5 requests per 60-second window.
// ---------------------------------------------------------------------------
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute

// Module-level cache — persists across requests in the same Node.js process.
const ipRequestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  // Retrieve existing timestamps for this IP, drop anything outside the window
  const timestamps = (ipRequestLog.get(ip) ?? []).filter((t) => t > windowStart);

  if (timestamps.length >= RATE_LIMIT_MAX) {
    // Update the log with cleaned timestamps (no new entry)
    ipRequestLog.set(ip, timestamps);
    return true;
  }

  // Record this request and persist
  timestamps.push(now);
  ipRequestLog.set(ip, timestamps);
  return false;
}

function getClientIp(request: NextRequest): string {
  // Vercel / proxies set x-forwarded-for; fall back to a placeholder
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    // May be a comma-separated list — take the first (original client) IP
    return forwarded.split(",")[0].trim();
  }
  // Next.js 15 experimental connection info (if available)
  return "unknown";
}

export async function POST(request: NextRequest) {
  try {
    // ── Rate Limiting ──────────────────────────────────────────────────────
    const clientIp = getClientIp(request);

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // ── Payload Validation ─────────────────────────────────────────────────
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    // ── API Key Guard ──────────────────────────────────────────────────────
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not set.");
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }

    // ── Build Gemini Payload ───────────────────────────────────────────────
    const contents = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const payload = {
      system_instruction: {
        parts: {
          text: "You are Disha Assistant. Answer questions about Disha for India NGO — programs, volunteering, events, contact. Be concise and helpful.",
        },
      },
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    };

    // ── Call Gemini API ────────────────────────────────────────────────────
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return NextResponse.json(
          { error: "The AI service is currently rate-limited. Please wait a moment." },
          { status: 429 }
        );
      }

      const errorText = await response.text();
      console.error("Gemini API Error:", response.status, errorText);
      return NextResponse.json(
        { error: "Failed to generate response." },
        { status: response.status }
      );
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!replyText) {
      throw new Error("Invalid response structure from Gemini API");
    }

    return NextResponse.json({ reply: replyText });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
