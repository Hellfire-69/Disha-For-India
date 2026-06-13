"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Bot, Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";

type Message = {
  id: string;
  role: "user" | "model";
  content: string;
};

export function AIChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "model",
      content: "Hi! I'm Disha Assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const now = Date.now();
    if (now - lastRequestTime < 3000) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "model",
          content: "Please wait a moment before sending another message (throttle limit).",
        },
      ]);
      return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setLastRequestTime(Date.now());

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Too many requests, please wait a moment.");
        }
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "model",
          content: data.reply,
        },
      ]);
    } catch (error: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "model",
          content: error.message || "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger 
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-xl flex items-center justify-center hover:bg-primary-dark transition-all hover:scale-105 z-50 focus:outline-none focus:ring-4 focus:ring-primary/30"
        aria-label="Open AI Chat"
      >
        <MessageSquare className="w-6 h-6" />
      </SheetTrigger>
      
      <SheetContent side="right" className="w-[90vw] max-w-[400px] sm:w-[450px] sm:max-w-[450px] p-0 flex flex-col bg-bg border-l border-border h-full">
        <SheetHeader className="p-4 border-b border-border bg-white shrink-0">
          <SheetTitle className="flex items-center gap-2 font-display text-xl text-secondary">
            <Bot className="w-6 h-6 text-primary" />
            Disha Assistant
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex w-full ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm font-body leading-relaxed shadow-sm ${
                  msg.role === "user"
                    ? "bg-primary text-white rounded-br-none"
                    : "bg-white text-text border border-border rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex w-full justify-start">
              <div className="bg-white border border-border rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-primary animate-spin" />
                <span className="text-sm font-body text-text-muted">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white border-t border-border shrink-0">
          <form onSubmit={handleSubmit} className="flex gap-2 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-bg border border-border text-text rounded-full pl-4 pr-12 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body text-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-1.5 top-1.5 bottom-1.5 w-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
          <div className="text-center mt-3">
            <span className="text-[10px] text-gray-400 font-body uppercase tracking-wider">
              Powered by Google Gemini
            </span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
