export interface Program {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: "education" | "health" | "entrepreneurship" | "environment" | "financial-literacy";
  image: string;
  icon: string;
  beneficiaries: number;
  duration: string;
  eligibility: string[];
  outcomes: string[];
  featured: boolean;
  quizTags: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  state: string;
  image: string;
  category: "workshop" | "seminar" | "camp" | "drive" | "bootcamp";
  registrationUrl?: string;
  capacity?: number;
  registered?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage?: string;
  date: string;
  image: string;
  category: "education" | "health" | "environment" | "entrepreneurship" | "impact";
  tags: string[];
  featured: boolean;
  readTime: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  department: "leadership" | "programs" | "operations" | "outreach";
  linkedin?: string;
  email?: string;
  featured: boolean;
}

export interface StateData {
  stateId: string;
  stateName: string;
  programsRunning: number;
  beneficiaries: number;
  volunteers: number;
  successStories: number;
  activePrograms: string[];
  highlight: boolean;
}

export interface SuccessStory {
  id: string;
  name: string;
  age?: number;
  location: string;
  program: string;
  image: string;
  quote: string;
  story: string;
  outcome: string;
  videoUrl?: string;
  featured: boolean;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  icon: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: "events" | "programs" | "volunteers" | "community";
  width: number;
  height: number;
}
