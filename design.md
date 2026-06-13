# DESIGN.md — Disha for India
## Visual Design System
**Version:** 1.0
**Author:** Nox
> This file is read by Antigravity at session start. All visual decisions must strictly follow this system. Never deviate from these tokens.

---

## 1. Color System

### 1.1 Core Tokens
```css
/* styles/globals.css — inside @theme directive */
@theme {
  --color-primary:        #F26522;  /* Disha Orange — CTAs, highlights, accents */
  --color-primary-light:  #FFF3E8;  /* Orange tint — backgrounds, hover states */
  --color-primary-dark:   #C4511A;  /* Dark orange — hover on buttons */

  --color-secondary:      #1A6B3C;  /* Deep Green — headings, nav, badges */
  --color-secondary-light:#E8F5EE;  /* Green tint — tag backgrounds */
  --color-secondary-dark: #0F4526;  /* Dark green — footer, dark sections */

  --color-bg:             #F9F7F4;  /* Warm white — page background */
  --color-bg-dark:        #0F1A13;  /* Dark green-black — hero, dark sections */
  --color-bg-card:        #FFFFFF;  /* Pure white — cards */

  --color-text:           #1A1A1A;  /* Primary text */
  --color-text-muted:     #6B7280;  /* Secondary text, captions */
  --color-text-light:     #F9F7F4;  /* Text on dark backgrounds */

  --color-border:         #E5E0D8;  /* Card borders, dividers */
  --color-success:        #16A34A;
  --color-error:          #DC2626;
}
```

### 1.2 Usage Rules
| Token | Use | Never Use For |
|---|---|---|
| `primary` | Buttons, links, active states, icons | Backgrounds (except `primary-light`) |
| `secondary` | Headings, nav links, section labels | Body text |
| `bg-dark` | Hero sections, footer, dark feature sections | Card backgrounds |
| `text-muted` | Captions, meta info, placeholders | Headings |

### 1.3 Forbidden
- ❌ Purple of any shade
- ❌ Gradient from purple → pink (AI slop)
- ❌ Pure black `#000000` backgrounds
- ❌ More than 2 colors in any single section

---

## 2. Typography

### 2.1 Font Stack
```css
@theme {
  --font-display: 'Clash Display', sans-serif;
  --font-body:    'Satoshi', sans-serif;
  --font-accent:  'Cabinet Grotesk', sans-serif;
}
```

### 2.2 Font Loading (Next.js 15 — next/font/local)
> **Antigravity instruction:** Do NOT use `@import url()` for fonts. This is render-blocking and will destroy the 95+ Lighthouse score. Instead, download all `.woff2` font files and place them in `/public/fonts/`. Load them via `next/font/local` in `app/layout.tsx` as shown below.

```ts
// app/layout.tsx
import localFont from 'next/font/local'

const clashDisplay = localFont({
  src: [
    { path: '../public/fonts/ClashDisplay-Medium.woff2',  weight: '500' },
    { path: '../public/fonts/ClashDisplay-Semibold.woff2', weight: '600' },
    { path: '../public/fonts/ClashDisplay-Bold.woff2',    weight: '700' },
  ],
  variable: '--font-display',
  display: 'swap',
})

const satoshi = localFont({
  src: [
    { path: '../public/fonts/Satoshi-Regular.woff2', weight: '400' },
    { path: '../public/fonts/Satoshi-Medium.woff2',  weight: '500' },
    { path: '../public/fonts/Satoshi-Bold.woff2',    weight: '700' },
  ],
  variable: '--font-body',
  display: 'swap',
})

const cabinetGrotesk = localFont({
  src: [
    { path: '../public/fonts/CabinetGrotesk-Medium.woff2',    weight: '500' },
    { path: '../public/fonts/CabinetGrotesk-Bold.woff2',      weight: '700' },
    { path: '../public/fonts/CabinetGrotesk-Extrabold.woff2', weight: '800' },
  ],
  variable: '--font-accent',
  display: 'swap',
})
```

Apply all three font variables to the root `<html>` tag:
```tsx
<html className={`${clashDisplay.variable} ${satoshi.variable} ${cabinetGrotesk.variable}`}>
```

### 2.3 Type Scale
| Element | Font | Size (desktop) | Size (mobile) | Weight | Line Height |
|---|---|---|---|---|---|
| Hero H1 | Clash Display | 72px | 40px | 700 | 1.1 |
| Section H2 | Clash Display | 48px | 32px | 600 | 1.15 |
| Card H3 | Clash Display | 28px | 22px | 600 | 1.2 |
| Subheading H4 | Satoshi | 20px | 18px | 600 | 1.3 |
| Body Large | Satoshi | 18px | 16px | 400 | 1.6 |
| Body | Satoshi | 16px | 15px | 400 | 1.6 |
| Caption | Satoshi | 14px | 13px | 400 | 1.5 |
| Stat Number | Cabinet Grotesk | 64px | 40px | 700 | 1.0 |
| Label/Tag | Cabinet Grotesk | 13px | 12px | 500 | 1.0 |

### 2.4 Rules
- H1 and H2 always use Clash Display
- Never use Clash Display below H3
- Stat numbers always Cabinet Grotesk
- Body copy max width: `65ch` for readability
- Never use font-weight below 400

---

## 3. Spacing & Layout

### 3.1 Section Spacing
```
Desktop:  padding-y: 96px (py-24)
Tablet:   padding-y: 64px (py-16)
Mobile:   padding-y: 48px (py-12)
```

### 3.2 Container
```
Max width:    1280px (max-w-7xl)
Padding:      px-6 (mobile), px-8 (tablet), px-12 (desktop)
```

### 3.3 Grid System
| Layout | Desktop | Tablet | Mobile |
|---|---|---|---|
| Program cards | 3 cols | 2 cols | 1 col |
| Team grid | 4 cols | 2 cols | 1 col |
| Blog cards | 3 cols | 2 cols | 1 col |
| Stats | 4 cols | 2 cols | 2 cols |
| Gallery | 3 cols masonry | 2 cols | 1 col |

### 3.4 Gap Scale
- Card grids: `gap-6` (24px)
- Section elements: `gap-12` (48px)
- Inline elements: `gap-3` (12px)

---

## 4. Component Visual Patterns

### 4.1 Buttons
```
Primary:   bg-primary text-white rounded-full px-8 py-3 font-satoshi font-semibold
           hover: bg-primary-dark, scale-[1.02] transition
Secondary: border-2 border-secondary text-secondary rounded-full px-8 py-3
           hover: bg-secondary text-white transition
Ghost:     text-primary underline-offset-4 hover:underline
Size SM:   px-5 py-2 text-sm
Size LG:   px-10 py-4 text-lg
```

### 4.2 Cards
```
Background:   bg-white
Radius:       rounded-2xl (16px)
Padding:      p-6 (desktop), p-4 (mobile)
Shadow:       shadow-sm hover:shadow-md transition
Image radius: rounded-xl (top corners only for card header images)
```

### 4.3 Section Labels (above H2)
```
Pattern:   Small uppercase tag above every section heading
Style:     text-primary font-accent font-500 text-sm tracking-widest uppercase
Example:   "OUR PROGRAMS" → then H2 below
```

### 4.4 Navigation
```
Desktop:   Fixed top, bg-white/90 backdrop-blur, border-b border-border
           Logo left, links center, CTA button right
Mobile:    Hamburger right, shadcn Sheet drawer from left
           Full-width links, large tap targets (min-h-12)
Active:    text-primary border-b-2 border-primary
```

### 4.5 Hero Section
```
Background:   bg-bg-dark (dark green-black)
Text:         text-text-light
Pattern:      Large H1 left, image/visual right (50/50 split desktop)
              Full width stacked on mobile
Accent:       Single orange element (underline, badge, or highlight word)
CTA:          Primary button + ghost button side by side
```

### 4.6 Dark Sections
```
Use bg-bg-dark for:  Hero, Footer, alternating feature sections
Text on dark:        text-text-light for headings, text-text-muted adjusted to #9CA3AF
Accent on dark:      primary orange only
Never:               White cards on dark bg (use bg-secondary-dark cards instead)
```

---

## 5. Animation Guidelines

### 5.1 Timing
| Animation | Duration | Easing |
|---|---|---|
| Fade in | 600ms | easeOut |
| Slide up | 600ms | easeOut |
| Scale in | 500ms | easeOut |
| Counter | 2000ms | easeOut |
| Page transition | 400ms | easeInOut |
| Hover micro | 200ms | easeInOut |

### 5.2 Rules
- All entrance animations trigger on scroll into view (`useInView`)
- Stagger children: `0.1s` delay between items
- Never animate layout properties (width, height) — only transform + opacity
- Reduce motion: respect `prefers-reduced-motion` media query
- No looping animations except hero background (subtle only)

---

## 6. Imagery Guidelines

| Type | Style | Source |
|---|---|---|
| Hero | Bold, people-focused, warm tones | Unsplash / original site |
| Program sections | Action shots, community, education | Unsplash |
| Team | Professional headshots, consistent bg | Original site |
| Gallery | Authentic event photos | Original site |
| Illustrations | Flat, minimal, orange+green palette | Antigravity generated |

- Always use `next/image` with proper `alt` text
- Aspect ratios: Hero `16:9`, Cards `4:3`, Team `1:1`
- No stock photos that look staged or Western
- Prefer Indian faces, Indian contexts

---

## 7. Do's and Don'ts

### ✅ Do
- Use bold typography to make sections feel confident
- Mix dark and light sections for visual rhythm
- Use orange sparingly — it should feel like an accent, not a flood
- Add whitespace generously — NGO sites feel cluttered, stand out by being clean
- Use real numbers and stats prominently
- Make every CTA clear and action-oriented ("Volunteer Now", "Find Your Program")

### ❌ Don't
- Purple. Ever.
- Gradient backgrounds (orange-to-green gradients are also off)
- Clip art or generic flat icons
- Centered body text blocks (left-align body, center only headlines)
- Too many font sizes on one page (stick to the scale)
- Borders + shadows together on the same card (pick one)
