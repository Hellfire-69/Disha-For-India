# Product Requirements Document (PRD)
## Disha for India — Website Redesign
**Version:** 1.0  
**Author:** Nox  
**Status:** Draft  
**Deadline:** Tomorrow 5 PM  

---

## 1. Project Overview

### 1.1 Objective
Redesign and rebuild `dishaforindia.org` as a 10x better, production-level website that is visually superior, fully mobile responsive, and feature-rich enough to drive real user engagement.

### 1.2 Context
- Original site is outdated, unresponsive, and lacks interactivity
- This is an internship assignment — solo project
- Must reuse original branding (logo, name, content) with drastically better design
- No database required for now (future scope)
- Deploy on Vercel via GitHub

### 1.3 Core Mandate
> "Design needs to be BETTER + Mobile Responsive. Website should come up with new features that will force the audience to USE it."

---

## 2. Design Principles

| Principle | Detail |
|---|---|
| Color Palette | Primary: `#F26522` (Disha Orange), Secondary: `#1A6B3C` (Deep Green), BG: `#F9F7F4`, Text: `#1A1A1A` |
| No AI Slop | Zero purple gradients. Clean, trustworthy, warm |
| Typography | Bold display headings, tight hierarchy, readable body |
| Reference | GenocideEdu NGO shot (Flexyglobal/Dribbble) — layout & spatial hierarchy only |
| Feel | Confident, modern NGO — not a charity begging page |

---

## 3. Pages (12 Total)

| # | Page | Purpose |
|---|---|---|
| 1 | **Home** | Hero, impact stats, program overview, CTA |
| 2 | **About Us** | Story, founding, team |
| 3 | **Vision & Mission** | Core purpose, values |
| 4 | **Programs** | All programs listed with detail |
| 5 | **Events** | Upcoming + past events with registration |
| 6 | **Blog** | Articles with category filters |
| 7 | **Gallery** | Photo/video grid |
| 8 | **Volunteer** | Signup flow with area of interest selector |
| 9 | **Contact** | Form + map + socials |
| 10 | **Program Finder Quiz** | Interactive quiz → recommended program |
| 11 | **Impact Map** | Interactive India map with state-wise data |
| 12 | **Success Stories** | Beneficiary stories, testimonials |

---

## 4. Features

### 4.1 Core Features (Must Have)
- [ ] Fully mobile responsive (all 12 pages)
- [ ] Animated impact counter (students reached, volunteers, states covered)
- [ ] Volunteer signup flow (multi-step form with interest selector)
- [ ] Event registration widget
- [ ] Newsletter subscription
- [ ] Blog with category filters
- [ ] Photo gallery with lightbox
- [ ] Sticky nav with mobile hamburger menu

### 4.2 Unique/Engagement Features (Differentiators)
- [ ] **Program Finder Quiz** — 4-5 questions → recommended program result
- [ ] **Interactive India Map** — click state → programs, beneficiaries, stories, volunteers
- [ ] **AI Assistant (Gemini Flash 2.0)** — floating chatbot, answers questions about Disha, programs, how to volunteer
- [ ] **Impact Counter** — animated numbers on scroll (Framer Motion)
- [ ] **Success Story Carousel** — auto-play with pause on hover

### 4.3 Nice to Have (If Time Permits)
- [ ] Dark mode toggle
- [ ] Hindi / English language toggle
- [ ] Donation flow UI (no backend, just UI mockup)

---

## 5. Content Strategy

| Type | Source |
|---|---|
| Logo & Branding | Download from original site → `/public/assets` |
| Program Content | Reuse + reframe from original site |
| Images | Original site URLs + Unsplash/Pexels (education, India, community) |
| AI-generated visuals | Antigravity — section backgrounds, illustrations |
| Stats/Numbers | From original site (or placeholder if broken) |

---

## 6. Non-Functional Requirements

- **Performance:** Lighthouse score > 85
- **Responsiveness:** Works on 320px → 1920px screens
- **Accessibility:** Alt text on all images, keyboard navigable
- **SEO:** Meta tags, OG tags, sitemap on all pages
- **No Database:** All data as static JSON files in `/data` folder

---

## 7. Out of Scope (For Now)
- Backend / CMS
- Payment gateway
- User authentication
- Real-time data for Impact Map (static JSON for now)

---

## 8. Success Criteria
- 12 pages live and deployed on Vercel
- Mobile responsive verified on Chrome DevTools (375px, 768px, 1440px)
- All 3 differentiator features working (Quiz, Map, AI Chat)
- Design clearly superior to original site
- No purple gradients anywhere
