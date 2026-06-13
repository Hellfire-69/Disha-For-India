# Technical Requirements Document (TRD)
## Disha for India — Website Redesign
**Version:** 1.0  
**Author:** Nox  
**Status:** Draft  

---

## 1. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 15 (App Router) | SSG, SEO-ready, improved caching + async APIs |
| Language | TypeScript | Production standard |
| Styling | Tailwind CSS v4 | Native CSS config, no tailwind.config.js, faster builds |
| UI Components | shadcn/ui | Unstyled, fully customizable |
| Animation | Framer Motion | Scroll animations, counters, transitions |
| Icons | Lucide React | Consistent, lightweight |
| Map | React Simple Maps | SVG India map, lightweight, no API key |
| AI Chatbot | Gemini Flash 2.0 (free tier) | Free, fast, conversational |
| Forms | React Hook Form + Zod | Schema validation, multi-step form state |
| Fonts | Fontshare (Clash Display, Satoshi) + Google Fonts | Unique, non-generic |
| Deployment | Vercel (via GitHub) | Zero config, free |

---

## 2. Design System

### 2.1 Color Tokens
```css
--color-primary:     #F26522;  /* Disha Orange */
--color-secondary:   #1A6B3C;  /* Deep Green */
--color-bg:          #F9F7F4;  /* Warm White */
--color-bg-dark:     #0F1A13;  /* Dark Green-Black (hero sections) */
--color-text:        #1A1A1A;
--color-text-muted:  #6B7280;
--color-accent:      #FFF3E8;  /* Light Orange tint */
```

### 2.2 Typography
```css
--font-display:  'Clash Display', sans-serif;   /* Heroes, headings H1-H2 */
--font-body:     'Satoshi', sans-serif;          /* Body, H3-H6, UI */
--font-accent:   'Cabinet Grotesk', sans-serif;  /* Pull quotes, stats */
```

| Element | Font | Size | Weight |
|---|---|---|---|
| H1 Hero | Clash Display | 64px / 48px mobile | 700 |
| H2 Section | Clash Display | 40px / 32px mobile | 600 |
| H3 Card | Satoshi | 24px | 600 |
| Body | Satoshi | 16px | 400 |
| Stat Number | Cabinet Grotesk | 56px | 700 |
| Caption | Satoshi | 14px | 400 |

### 2.3 Spacing Scale
Tailwind default spacing — base unit `4px`. Sections use `py-20` (80px) desktop, `py-12` (48px) mobile.

### 2.4 Border Radius
- Cards: `rounded-2xl`
- Buttons: `rounded-full`
- Images: `rounded-3xl`

---

## 3. Folder Structure

```
dishaforindia/
├── app/
│   ├── layout.tsx               # Root layout, fonts, nav, footer
│   ├── page.tsx                 # Home
│   ├── about/page.tsx
│   ├── vision-mission/page.tsx
│   ├── programs/page.tsx
│   ├── events/page.tsx
│   ├── blog/page.tsx
│   ├── gallery/page.tsx
│   ├── volunteer/page.tsx
│   ├── contact/page.tsx
│   ├── program-finder/page.tsx
│   ├── impact-map/page.tsx
│   ├── success-stories/page.tsx
│   └── api/
│       └── chat/route.ts        # Gemini API proxy route
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── ui/                      # shadcn components
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── ImpactCounter.tsx
│   │   ├── ProgramsPreview.tsx
│   │   └── TestimonialCarousel.tsx
│   ├── shared/
│   │   ├── SectionHeader.tsx
│   │   ├── ProgramCard.tsx
│   │   └── EventCard.tsx
│   ├── features/
│   │   ├── ProgramQuiz.tsx
│   │   ├── IndiaMap.tsx
│   │   └── AIChatWidget.tsx
├── data/                        # Static JSON (no DB needed)
│   ├── programs.json
│   ├── events.json
│   ├── blog.json
│   ├── team.json
│   ├── map-data.json            # State-wise impact data
│   └── success-stories.json
├── public/
│   └── assets/
│       ├── logo.png
│       ├── images/              # Downloaded + Unsplash images
│       └── icons/
├── lib/
│   ├── gemini.ts                # Gemini API client
│   ├── motion.ts                # Reusable Framer Motion variants & transitions
│   └── utils.ts
├── styles/
│   └── globals.css              # Font imports, CSS variables
└── .env.local                   # GEMINI_API_KEY
```

---

## 4. Page-by-Page Component Map

| Page | Key Components |
|---|---|
| Home | Hero, ImpactCounter, ProgramsPreview, EventsTeaser, TestimonialCarousel, NewsletterBanner |
| About | PageHero, StoryTimeline, TeamGrid, PartnersStrip |
| Vision & Mission | PageHero, CoreValuesGrid, ManifestoSection |
| Programs | ProgramCard (grid), FilterBar, ProgramDetail modal |
| Events | EventCard (grid), UpcomingBadge, RegistrationModal |
| Blog | BlogCard (grid), CategoryFilter, SearchBar |
| Gallery | MasonryGrid, Lightbox, VideoEmbed |
| Volunteer | MultiStepForm (3 steps), InterestSelector, SuccessState |
| Contact | ContactForm, EmbedMap, SocialLinks |
| Program Finder | QuizFlow (4 questions), ResultCard, CTA |
| Impact Map | IndiaMapSVG, StatePopover, StatsPanel |
| Success Stories | StoryCard, VideoTestimonial, ImpactBadge |

---

## 5. Responsiveness Rules

| Breakpoint | Width | Strategy |
|---|---|---|
| Mobile | 320px–767px | Single column, stacked layout |
| Tablet | 768px–1023px | 2-column grids, condensed nav |
| Desktop | 1024px+ | Full layout, sidebars, animations |

- Mobile-first Tailwind classes throughout
- Hamburger menu on mobile (shadcn Sheet component)
- Touch-friendly tap targets (min 44px)
- No horizontal scroll on any breakpoint
- Images use `next/image` with responsive `sizes` prop

---

## 6. Feature Implementation Plan

### 6.1 AI Chat Widget (Gemini Flash 2.0)
- Floating button (bottom-right, all pages)
- API call via `/api/chat` Next.js route (hides API key)
- System prompt: trained on Disha's programs, volunteer info, contact
- Free tier: 15 RPM, 1M tokens/day
- **Rate limit handling:** client-side throttle (1 req/3s) + graceful `429` fallback message in UI — no crashes

### 6.2 Program Finder Quiz
- 4 questions, single-select each
- Pure client-side logic (no API)
- Result mapped from `/data/programs.json`
- Framer Motion page transitions between questions

### 6.3 Interactive India Map
- `react-simple-maps` — SVG-based, no Google Maps API needed
- State click → popover with data from `/data/map-data.json`
- Static data for now, real data in future scope

### 6.4 Impact Counter
- Triggered on scroll into view (Framer Motion `useInView`)
- Numbers animate from 0 → target over 2s

---

## 7. SEO & Performance

- `next/image` for all images (auto WebP, lazy load)
- `generateMetadata()` on every page
- OG tags for social sharing
- Sitemap via `next-sitemap`
- Target Lighthouse score: **95+** (Performance, Accessibility, Best Practices)

---

## 8. Environment Variables

```env
GEMINI_API_KEY=your_key_here
NEXT_PUBLIC_SITE_URL=https://dishaforindia.vercel.app
```

---

## 9. Out of Scope (TRD Level)
- Auth / user sessions
- CMS integration
- Database (Prisma/Supabase — future scope)
- Payment gateway
