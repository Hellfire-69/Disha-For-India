# AGENTS.md — Disha for India
## Antigravity Prompting Guide
**Version:** 1.1
**Author:** Nox

---

## 1. Project Context Block
> Antigravity must automatically read and parse this AGENTS.md file at the start of every operational loop before taking any action. Do not wait for the user to paste it manually. Load it from the project root, parse all rules, patterns, and constraints, and treat them as active instructions for the entire session.

```
You are a Senior Full Stack Developer working on "Disha for India" — a production-level NGO website redesign built with Next.js 15 (App Router), Tailwind CSS v4, TypeScript, shadcn/ui, and Framer Motion.

Design system:
- Primary: #F26522 (orange), Secondary: #1A6B3C (deep green), BG: #F9F7F4, Dark BG: #0F1A13
- Fonts: Clash Display (headings), Satoshi (body), Cabinet Grotesk (stats/accents)
- No purple gradients. No generic NGO design. Modern, bold, confident.
- Mobile-first. All components must work at 320px → 1920px.
- Lighthouse target: 95+

Rules:
- Use TypeScript strictly (no `any`)
- Use Tailwind v4 utility classes only (no inline styles, no tailwind.config.js/ts)
- All design tokens declared via @theme in styles/globals.css only
- Use Framer Motion variants from lib/motion.ts for all animations
- Use React Hook Form + Zod for all forms
- Use next/image for all images
- Export all data from /data/*.json (no hardcoded content in components)
- Next.js 15: params and searchParams are Promises — always await before accessing properties
```

---

## 2. Prompting Patterns

### 2.1 Starting a New Page
```
Build the [PAGE NAME] page for Disha for India.

File: app/[route]/page.tsx

Sections needed:
- [list sections]

Data source: data/[filename].json
Use existing components where possible: [list reusable components]
Follow the project context block above strictly.
```

### 2.2 Building a Component
```
Create a reusable [COMPONENT NAME] component.

File: components/[folder]/[ComponentName].tsx

Props:
- [prop]: [type]

Behavior:
- [describe interaction or animation]

Use Framer Motion variant from lib/motion.ts for entrance animation.
Mobile-first. Tailwind v4 only.
```

### 2.3 Fixing a Bug
```
Fix this bug in [file path]:

Issue: [describe what's broken]
Expected: [what should happen]
Current behavior: [what is happening]

Do not change any other logic outside the broken area.
```

### 2.4 Refactoring
```
Refactor [file path] for:
- Better readability
- Remove hardcoded values (move to data/ or constants)
- Improve TypeScript types

Do not change functionality or visual output.
```

### 2.5 Adding Animation
```
Add Framer Motion animation to [component/page].

Use variants from lib/motion.ts.
Animation type: [fadeIn / slideUp / staggerChildren / scaleIn]
Trigger: [onLoad / onScroll / onHover / onClick]

Do not change layout or styling.
```

---

## 3. Feature-Specific Prompts

### 3.1 AI Chat Widget
```
Build the AIChatWidget component.

File: components/features/AIChatWidget.tsx
API route: app/api/chat/route.ts

Requirements:
- Floating button bottom-right, visible on all pages
- Opens a chat drawer (shadcn Sheet)
- Calls /api/chat with user message
- API route proxies to Gemini Flash 2.0
- System prompt: "You are Disha Assistant. Answer questions about Disha for India NGO — programs, volunteering, events, contact. Be concise and helpful."
- Handle 429 rate limit: show "Too many requests, please wait a moment" — do not crash
- Client-side throttle: 1 request per 3 seconds
- Gemini API key from process.env.GEMINI_API_KEY
```

### 3.2 Program Finder Quiz
```
Build the ProgramQuiz component.

File: components/features/ProgramQuiz.tsx
Data: data/programs.json

Requirements:
- 4 questions, single-select each
- Questions: "Are you a student?", "Are you an entrepreneur?", "Are you a woman returning to work?", "Do you need financial literacy help?"
- Each answer maps to a program result
- Framer Motion page transition between questions
- Final screen: show recommended program card with CTA
- Pure client-side logic, no API call
```

### 3.3 Interactive India Map
```
Build the IndiaMap component.

File: components/features/IndiaMap.tsx
Library: react-simple-maps
Data: data/map-data.json

Requirements:
- SVG India map, clickable states
- Click state → popover showing: programs running, beneficiaries count, success stories count, volunteers count
- Highlight state on hover (secondary green color)
- Mobile: tap to show popover, close on outside tap
- Static data from map-data.json for now
```

### 3.4 Impact Counter
```
Build the ImpactCounter component.

File: components/home/ImpactCounter.tsx

Stats to show (from data/stats.json):
- Students Reached
- Volunteers
- States Covered
- Programs Running

Requirements:
- Numbers animate from 0 to target on scroll into view
- Use Framer Motion useInView
- Cabinet Grotesk font for numbers
- Mobile: 2x2 grid. Desktop: 4 in a row
```

### 3.5 Multi-Step Volunteer Form
```
Build the VolunteerForm component.

File: components/volunteer/VolunteerForm.tsx
Schema: lib/schemas/volunteer.ts (Zod)
Form: React Hook Form

Steps:
1. Personal Info (name, email, phone, city)
2. Area of Interest (multi-select: Education, Health, Environment, Entrepreneurship, Events)
3. Availability (weekdays/weekends, hours per week) + submit

Requirements:
- Progress bar at top showing step 1/2/3
- Zod validation per step before proceeding
- On submit: console.log data (no backend yet)
- Success state with animation
- Framer Motion slide transition between steps
```

---

## 4. lib/motion.ts Variants Reference
> Tell Antigravity to use these when adding animations.

```typescript
// Prompt: "Use the fadeIn variant from lib/motion.ts"
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
}

// Prompt: "Use the slideUp variant from lib/motion.ts"
export const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

// Prompt: "Use the staggerChildren variant from lib/motion.ts"
export const staggerChildren = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}

// Prompt: "Use the scaleIn variant from lib/motion.ts"
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
}
```

---

## 5. Rules for Antigravity Agent

| Rule | Detail |
|---|---|
| Always mobile-first | Write `sm:` before `md:` before `lg:` |
| No hardcoded content | All text/data from `/data/*.json` |
| No inline styles | Tailwind v4 classes only |
| No `any` in TypeScript | Define proper interfaces |
| Images via next/image | Always include `alt`, `width`, `height` or `fill` |
| Animations from motion.ts | Never write one-off Framer Motion configs |
| Forms via RHF + Zod | Never use uncontrolled inputs |
| One component per file | No multi-component files |
| **Next.js 15 Async Props** | Any page or layout using `params` or `searchParams` MUST treat them as Promises — always `await` before accessing any property. Never access `params.slug` directly; always `const { slug } = await params` |
| **Tailwind v4 Theme Rules** | Never create `tailwind.config.js` or `tailwind.config.ts`. All design tokens, custom colors, and custom utilities MUST be declared using the `@theme` directive inside `styles/globals.css` exclusively |

---

## 6. Session Workflow

```
1. Antigravity auto-reads AGENTS.md at session start (no manual paste needed)
2. Use the relevant prompt pattern (Section 2 or 3)
3. Review output — check mobile layout first
4. If bug → use Fix prompt (Section 2.3)
5. If animation missing → use Animation prompt (Section 2.5)
6. Commit to GitHub after each page is complete
```
