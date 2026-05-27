export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
  story?: string;
  demoUrl?: string;
  location?: string;
  role?: string;
  gallery?: string[];
  originalColor?: boolean;
  tags?: string;
}

export interface Service {
  id: string;
  icon: string;
  name: string;
  tech: string;
  duration: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  years: string;
  desc?: string;
  logoUrl?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface HeroContent {
  topLabel: string;
  headline: string;
  companyName: string;
  freelanceMonth: string;
  bannerText?: string;
}

export interface AboutContent {
  title: string;
  subtitle: string;
  imageUrl: string;
  bioPara: string;
  philosophyLabel: string;
  philosophyText: string;
  xLink: string;
  xLinkLabel: string;
}

export interface ContactContent {
  label: string;
  heading: string;
  subtext: string;
  email: string;
  emailLabel: string;
}

export interface SectionVisibility {
  work: boolean;
  services: boolean;
  experience: boolean;
  faq: boolean;
  about: boolean;
  contact: boolean;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  isEnabled: boolean;
}

export interface SiteConfig {
  faviconUrl: string;
}
