import { Project, Service, ExperienceItem, FAQItem, SocialLink, SiteConfig } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    category: "Design & Development",
    year: "2024",
    image: "https://picsum.photos/seed/swiss-minimal-1/1000/750",
    description: "A highly refined, typographic showcase crafted with strict spatial discipline for an architectural studio.",
    story: "For this Swiss architectural studio, we wanted the portfolio to mimic physical paper layouts. By utilizing high-contrast typography pairings (such as Inter & Space Grotesk) and a custom fixed pixel grid framework, the images became central elements of the structural aesthetic. Every scroll interaction reveals architectural line divisions, highlighting the structural focus of both the digital software and physical real-estate products.",
    demoUrl: "https://example.com/demo/portfolio",
    gallery: [
      "https://picsum.photos/seed/swiss-gal-1/1000/750",
      "https://picsum.photos/seed/swiss-gal-2/1000/750"
    ],
    tags: "Type, Minimalism, Grid, React"
  },
  {
    id: "beautiful-websites",
    title: "Beautiful Websites Directory",
    category: "Design Directory",
    year: "2024",
    image: "https://picsum.photos/seed/swiss-minimal-2/1000/750",
    description: "A curated visual index celebrating top-tier typographic websites and minimal design structures across Europe.",
    story: "Initially developed as a private benchmark tool, this curated gallery lists visual design highlights across Switzerland, Germany and Austria. The design philosophy was centered around speed and visual filtering, allowing quick responsive scaling, grayscale modes, and layout division metrics. It operates on client-side state managers to enable instant search queries under 10 milliseconds.",
    demoUrl: "https://example.com/demo/directory",
    gallery: [
      "https://picsum.photos/seed/swiss-gal-3/1000/750",
      "https://picsum.photos/seed/swiss-gal-4/1000/750"
    ],
    tags: "Curator, Showcase, Fast, CSS"
  },
  {
    id: "job-board",
    title: "Job Board Website Build",
    category: "Web Application",
    year: "2023",
    image: "https://picsum.photos/seed/swiss-minimal-3/1000/750",
    description: "Bespoke high-performance employment engine optimized for premium creative studios and digital designers.",
    story: "A collaboration with premium creative design networks, this application enables agencies to list roles and receive curated portfolios. We engineered a complete application pipeline that restricts visual clutter, keeping layouts restricted to text metrics. The platform is built using standard TypeScript, showcasing rapid queries and clean filtration components.",
    demoUrl: "https://example.com/demo/jobboard",
    gallery: [
      "https://picsum.photos/seed/swiss-gal-5/1000/750",
      "https://picsum.photos/seed/swiss-gal-6/1000/750"
    ],
    tags: "Web App, Systems, Tailwind"
  },
  {
    id: "dev-agency",
    title: "Development Agency Website",
    category: "Brand & Engineering",
    year: "2023",
    image: "https://picsum.photos/seed/swiss-minimal-4/1000/750",
    description: "Monochromatic design grid with rigid layout lines and stark negative space built for a Zurich software house.",
    story: "This project showcases pure Swiss Modernist design. Using black layout bounds and absolute alignment systems, we built an elegant home for elite systems builders. There are no gimmicky graphical distractions, only dense nested grid systems delivering high technical information directly to elite corporate client entities.",
    demoUrl: "https://example.com/demo/devagency",
    gallery: [
      "https://picsum.photos/seed/swiss-gal-7/1000/750",
      "https://picsum.photos/seed/swiss-gal-8/1000/750"
    ],
    tags: "Modernism, Engineering, Grayscale"
  },
  {
    id: "design-agency",
    title: "Design Agency Website",
    category: "Interaction Design",
    year: "2023",
    image: "https://picsum.photos/seed/swiss-minimal-5/1000/750",
    description: "Immersive typographic portfolio website experimenting with interactive hover scales and absolute content alignment.",
    story: "An experimental layout crafted to push browser boundaries. By introducing responsive transforms linked with cursor coordinates, we delivered a deep, immersive spatial playground where typographic blocks resize and reposition fluidly based on viewport dimensions.",
    demoUrl: "https://example.com/demo/designagency",
    gallery: [
      "https://picsum.photos/seed/swiss-gal-9/1000/750",
      "https://picsum.photos/seed/swiss-gal-10/1000/750"
    ],
    tags: "Animation, Playground, Interaction"
  },
  {
    id: "creators-shop",
    title: "Creator's Shop and Blog",
    category: "E-Commerce & Journal",
    year: "2022",
    image: "https://picsum.photos/seed/swiss-minimal-6/1000/750",
    description: "An elegant, lightweight retail storefront and editorial blog structured for a multidisciplinary designer.",
    story: "A lightweight publication space and shop for digital design assets. Standard components are kept entirely minimalist, allowing products to stand out cleanly. It includes fully responsive cart behaviors and elegant typography layouts supporting high readability for long-form creative design articles.",
    demoUrl: "https://example.com/demo/creatorshop",
    gallery: [
      "https://picsum.photos/seed/swiss-gal-11/1000/750",
      "https://picsum.photos/seed/swiss-gal-12/1000/750"
    ],
    tags: "Commerce, Blog, Type, Editorial"
  }
];

export const SERVICES: Service[] = [
  {
    id: "design-arch",
    icon: "🖥️",
    name: "Design Architecture",
    tech: "Built in Framer & Figma",
    duration: "2 - 3 weeks",
    description: "Formulating complete layouts, rigid visual grid structures, precise typography pairings, and interaction concepts."
  },
  {
    id: "frontend-eng",
    icon: "🌐",
    name: "Web Development",
    tech: "Built in React & Tailwind",
    duration: "up to 1 month",
    description: "Translating visuals into semantic, high-performance clean code with zero overhead, fully hand-optimized and tested."
  },
  {
    id: "perf-seo",
    icon: "⚡",
    name: "Performance & SEO",
    tech: "Lighthouse Optimization",
    duration: "1 - 2 weeks",
    description: "Auditing page Speed, streamlining layouts, ensuring optimal indexation structures, and clean metadata alignments."
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "framer-dev",
    role: "Framer Developer",
    company: "Circles Design",
    years: "2022 – 2024",
    desc: "Crafted interactive design environments, bespoke layouts, and code-based UI integrations for global creative accounts.",
    logoUrl: "https://picsum.photos/seed/circ/100/100?grayscale=1"
  },
  {
    id: "web-designer-high",
    role: "Web Designer",
    company: "Highflier Agency",
    years: "2020 – 2022",
    desc: "Led visual direction and typography systems for premium corporate portals, scaling and refining creative products.",
    logoUrl: "https://picsum.photos/seed/highfly/100/100?grayscale=1"
  },
  {
    id: "web-designer-south",
    role: "Web Designer",
    company: "Southside",
    years: "2018 – 2020",
    desc: "Constructed precise brand layout frameworks, maintaining extreme grid logic across responsive interfaces.",
    logoUrl: "https://picsum.photos/seed/souths/100/100?grayscale=1"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-specialty",
    question: "What do you specialize in?",
    answer: "I specialize in clean, typography-driven, minimalist websites that blend European design discipline with absolute front-end precision. My typical workflows utilize Figma, Framer, React, and highly optimized Tailwind CSS."
  },
  {
    id: "faq-cost",
    question: "How much does a typical website cost?",
    answer: "Every design is customized to fulfill exact creative goals. Swiss-style bespoke informational websites typically range from CHF 4,000 to CHF 8,000, while larger portfolio platforms or job portals start at CHF 10,000."
  },
  {
    id: "faq-duration",
    question: "How long does it take to complete a website?",
    answer: "A standard landing page or 5-page minimalist portfolio takes between 3 to 5 weeks from conceptual alignment to deployment. More involved design directories and digital products take about 6 to 8 weeks."
  },
  {
    id: "faq-maintenance",
    question: "Do you offer website maintenance services?",
    answer: "Yes, I offer dedicated monthly maintenance support. This covers ongoing CMS updates, regular performance and search index audits, speed profiling, and rapid content edits to keep your digital site sharp and current."
  },
  {
    id: "faq-branding",
    question: "Can you help with branding and logo design as well?",
    answer: "Absolutely. I view typography and space as vital components of a brand's narrative. I shape complete typography manuals, logo marks, monochromatic visual schemes, and layout rules that represent pure Swiss functionality."
  },
  {
    id: "faq-process",
    question: "How do we get started, and what's your process?",
    answer: "We begin with a scope-alignment talk. Next, we outline structure, map typeface systems, compile real assets, construct high-fidelity templates in Figma, develop the responsive codebase, and carefully run tests prior to launch."
  }
];

export const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  {
    id: "instagram",
    name: "Instagram",
    url: "https://instagram.com",
    isEnabled: true
  },
  {
    id: "youtube",
    name: "YouTube",
    url: "https://youtube.com",
    isEnabled: true
  }
];

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  faviconUrl: "/vite.svg"
};
