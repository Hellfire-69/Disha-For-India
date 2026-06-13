# DATA-SCHEMAS.md — Disha for India
## Static Data Layer Reference
**Version:** 1.0
**Author:** Nox
> Antigravity must read this file before generating any component that consumes data. Never guess field names or types. All JSON files live in `/data/`. All TypeScript interfaces live in `/lib/types.ts`.

---

## 0. Global Conventions

| Rule | Detail |
|---|---|
| Naming | camelCase for all field names — never snake_case |
| IDs | String slugs — e.g. `"entrepreneurship-bootcamp"` not integers |
| Dates | ISO 8601 string — `"2024-03-15"` |
| Images | Relative path from `/public/` — e.g. `"/assets/images/program-1.jpg"` |
| Required fields | Marked with `// required` in schema |
| Optional fields | Marked with `// optional` |

---

## 1. programs.json

### Schema
```ts
interface Program {
  id: string              // required — unique slug
  title: string           // required
  tagline: string         // required — one line description
  description: string     // required — 2-3 sentences
  category: "education" | "health" | "entrepreneurship" | "environment" | "financial-literacy" // required
  image: string           // required — image path
  icon: string            // required — lucide icon name
  beneficiaries: number   // required
  duration: string        // required — e.g. "6 weeks"
  eligibility: string[]   // required — list of who can apply
  outcomes: string[]      // required — 3-4 key outcomes
  featured: boolean       // required — show on home page
  quizTags: string[]      // required — for Program Finder Quiz matching e.g. ["student", "entrepreneur"]
}
```

### Sample Record
```json
{
  "id": "entrepreneurship-bootcamp",
  "title": "Entrepreneurship Bootcamp",
  "tagline": "Launch your venture with mentorship and funding guidance",
  "description": "A 6-week intensive program equipping aspiring entrepreneurs with business fundamentals, pitch skills, and access to a mentor network.",
  "category": "entrepreneurship",
  "image": "/assets/images/programs/entrepreneurship.jpg",
  "icon": "Rocket",
  "beneficiaries": 1200,
  "duration": "6 weeks",
  "eligibility": ["Age 18-35", "Any educational background", "Passion for business"],
  "outcomes": ["Business plan creation", "Pitch deck skills", "Mentor network access", "Seed funding guidance"],
  "featured": true,
  "quizTags": ["entrepreneur", "financial-literacy"]
}
```

---

## 2. events.json

### Schema
```ts
interface Event {
  id: string              // required
  title: string           // required
  description: string     // required
  date: string            // required — ISO 8601
  time: string            // required — e.g. "10:00 AM"
  location: string        // required — city or "Online"
  state: string           // required — Indian state name
  image: string           // required
  category: "workshop" | "seminar" | "camp" | "drive" | "bootcamp" // required
  // NOTE: No status field. Compute dynamically in the component:
  // const isPast = new Date(event.date) < new Date()
  registrationUrl: string // optional — external link or internal form
  capacity: number        // optional
  registered: number      // optional
}
```

### Sample Record
```json
{
  "id": "financial-literacy-workshop-delhi-2024",
  "title": "Financial Literacy Workshop",
  "description": "A one-day workshop on personal finance, savings, and investment basics for young adults.",
  "date": "2024-04-20",
  "time": "10:00 AM",
  "location": "New Delhi",
  "state": "Delhi",
  "image": "/assets/images/events/financial-workshop.jpg",
  "category": "workshop",
  "registrationUrl": "",
  "capacity": 100,
  "registered": 67
}
```

---

## 3. blog.json

### Schema
```ts
interface BlogPost {
  id: string              // required
  title: string           // required
  excerpt: string         // required — 1-2 sentences
  content: string         // required — markdown string
  author: string          // required — author name
  authorImage: string     // optional
  date: string            // required — ISO 8601
  image: string           // required — cover image
  category: "education" | "health" | "environment" | "entrepreneurship" | "impact" // required
  tags: string[]          // required
  featured: boolean       // required
  readTime: number        // required — minutes
}
```

### Sample Record
```json
{
  "id": "women-entrepreneurship-rise",
  "title": "How Disha Is Empowering Women Entrepreneurs Across India",
  "excerpt": "From rural Maharashtra to urban Delhi, Disha's programs are changing the narrative for women in business.",
  "content": "## Introduction\n\nOver the past three years...",
  "author": "Priya Sharma",
  "authorImage": "/assets/images/team/priya.jpg",
  "date": "2024-03-10",
  "image": "/assets/images/blog/women-entrepreneurs.jpg",
  "category": "entrepreneurship",
  "tags": ["women", "entrepreneurship", "empowerment"],
  "featured": true,
  "readTime": 5
}
```

---

## 4. team.json

### Schema
```ts
interface TeamMember {
  id: string              // required
  name: string            // required
  role: string            // required
  bio: string             // required — 2-3 sentences
  image: string           // required
  department: "leadership" | "programs" | "operations" | "outreach" // required
  linkedin: string        // optional
  email: string           // optional
  featured: boolean       // required — show on About page
}
```

### Sample Record
```json
{
  "id": "rajesh-kumar",
  "name": "Rajesh Kumar",
  "role": "Founder & Executive Director",
  "bio": "Rajesh founded Disha for India in 2015 with a vision to democratize quality education across India. With 20 years in social impact, he has led programs reaching over 50,000 beneficiaries.",
  "image": "/assets/images/team/rajesh.jpg",
  "department": "leadership",
  "linkedin": "https://linkedin.com/in/rajeshkumar",
  "email": "rajesh@dishaforindia.org",
  "featured": true
}
```

---

## 5. map-data.json

### Schema
```ts
interface StateData {
  stateId: string         // required — ISO 3166-2:IN format e.g. "IN-DL"
                          // Antigravity: when consuming india-topojson.json, map this
                          // to properties.id or properties.ISO_A2 inside the SVG payload
  stateName: string       // required
  programsRunning: number // required
  beneficiaries: number   // required
  volunteers: number      // required
  successStories: number  // required
  activePrograms: string[] // required — list of program IDs active in this state
  highlight: boolean      // required — true for states with significant presence
}
```

### Sample Record
```json
{
  "stateId": "IN-DL",
  "stateName": "Delhi",
  "programsRunning": 4,
  "beneficiaries": 8500,
  "volunteers": 120,
  "successStories": 34,
  "activePrograms": ["entrepreneurship-bootcamp", "financial-literacy-workshop"],
  "highlight": true
}
```

---

## 6. success-stories.json

### Schema
```ts
interface SuccessStory {
  id: string              // required
  name: string            // required
  age: number             // optional
  location: string        // required — city, state
  program: string         // required — program ID
  image: string           // required
  quote: string           // required — 1-2 sentence impactful quote
  story: string           // required — 3-4 sentences
  outcome: string         // required — what changed in their life
  videoUrl: string        // optional — YouTube embed URL
  featured: boolean       // required
}
```

### Sample Record
```json
{
  "id": "anita-sharma-story",
  "name": "Anita Sharma",
  "age": 27,
  "location": "Jaipur, Rajasthan",
  "program": "entrepreneurship-bootcamp",
  "image": "/assets/images/stories/anita.jpg",
  "quote": "Disha didn't just teach me business — it gave me the confidence to believe I belong in the room.",
  "story": "Anita came to the bootcamp as a homemaker with a small tailoring business. After 6 weeks, she launched a sustainable fashion label now selling across 3 states.",
  "outcome": "Revenue grew 4x. Now employs 5 women from her community.",
  "videoUrl": "",
  "featured": true
}
```

---

## 7. stats.json

### Schema
```ts
interface Stat {
  id: string              // required
  label: string           // required — display label
  value: number           // required — numeric target for counter animation
  suffix: string          // optional — e.g. "+" or "K"
  icon: string            // required — lucide icon name
}
```

### Sample Record
```json
[
  { "id": "students", "label": "Students Reached", "value": 50000, "suffix": "+", "icon": "GraduationCap" },
  { "id": "volunteers", "label": "Volunteers", "value": 1200, "suffix": "+", "icon": "Users" },
  { "id": "states", "label": "States Covered", "value": 18, "suffix": "", "icon": "MapPin" },
  { "id": "programs", "label": "Programs Running", "value": 12, "suffix": "+", "icon": "BookOpen" }
]
```

---

## 8. TypeScript Interfaces (lib/types.ts)

> Antigravity must generate this file at project setup. All interfaces above consolidated into one file.

```ts
// lib/types.ts

export interface Program { ... }
export interface Event { ... }
export interface BlogPost { ... }
export interface TeamMember { ... }
export interface StateData { ... }
export interface SuccessStory { ... }
export interface Stat { ... }
```

> Replace `{ ... }` with full interfaces from sections above when generating the file.

---

## 9. Quiz Mapping (Program Finder Logic)

```ts
// lib/quizMap.ts
// Maps quiz answer combinations to program IDs

export const quizMap: Record<string, string> = {
  "student":                    "ignite-youth-program",
  "entrepreneur":               "entrepreneurship-bootcamp",
  "woman-returning-to-work":    "women-empowerment-program",
  "financial-literacy":         "financial-literacy-workshop",
  "student+financial-literacy": "ignite-youth-program",
  "entrepreneur+student":       "entrepreneurship-bootcamp",
  "default":                    "ignite-youth-program"
}
```
