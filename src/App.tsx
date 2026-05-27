import { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import CaseStudies from "./components/CaseStudies";
import Services from "./components/Services";
import Experience from "./components/Experience";
import FAQ from "./components/FAQ";
import About from "./components/About";
import ContactBanner from "./components/ContactBanner";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import ProjectDetail from "./components/ProjectDetail";
import AllProjects from "./components/AllProjects";
import { HeroContent, Project, Service, ExperienceItem, FAQItem, AboutContent, ContactContent, SectionVisibility, SocialLink, SiteConfig } from "./types";
import { 
  PROJECTS as DEFAULT_PROJECTS, 
  SERVICES as DEFAULT_SERVICES, 
  EXPERIENCES as DEFAULT_EXPERIENCES, 
  FAQS as DEFAULT_FAQS,
  DEFAULT_SOCIAL_LINKS,
  DEFAULT_SITE_CONFIG
} from "./data";

const DEFAULT_HERO_CONTENT: HeroContent = {
  topLabel: "00 // SWISS DESIGN STUDIO ZURICH",
  headline: "Freelance web and product designer with 12 years of experience.",
  companyName: "Linear",
  freelanceMonth: "June",
  bannerText: "Designing full-time @**Linear**. Accepting freelance opportunities for **June**."
};

const DEFAULT_ABOUT_CONTENT: AboutContent = {
  title: "About Alex",
  subtitle: "05 // BIO & CREATIVE ORIGIN",
  imageUrl: "https://picsum.photos/seed/alex-designer/800/1000?grayscale=1",
  bioPara: "I'm Alex Reyes, a 32-year-old web designer based in Zurich. My career has taken me across Europe and beyond, shaping my design philosophy along the way. I blend European precision with minimalist sensibility, working remotely for international clients.",
  philosophyLabel: "Core Philosophy:",
  philosophyText: "Stripping away the decorative fluff. In my studio, whitespace behaves with strict architectural purpose. Beautiful layouts speak louder than animations, and every single pixel aligns back to a modular division.",
  xLink: "https://x.com",
  xLinkLabel: "Find me on X"
};

const DEFAULT_CONTACT_CONTENT: ContactContent = {
  label: "06 // INITIATE DIALOGUE",
  heading: "Available for freelance projects, now booking for June.",
  subtext: "If you'd like to chat about a potential collaboration, please get in touch. Let's carve out something beautiful.",
  email: "hello@alexreyes.com",
  emailLabel: "hello@alexreyes.com"
};

const DEFAULT_VISIBILITY: SectionVisibility = {
  work: true,
  services: true,
  experience: true,
  faq: true,
  about: true,
  contact: true
};

export default function App() {
  // Check hash on initialization
  const [isAdminView, setIsAdminView] = useState(() => {
    return window.location.hash === "#admin";
  });

  // Check custom project detail state on initialization
  const [activeProjectDetailId, setActiveProjectDetailId] = useState<string | null>(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#project/")) {
      return hash.substring("#project/".length);
    }
    return null;
  });

  // Check if we are initially on the whole index listing page
  const [isProjectsListPage, setIsProjectsListPage] = useState<boolean>(() => {
    return window.location.hash === "#projects";
  });

  // Initialize Hero Content from LocalStorage or default fallback
  const [heroContent, setHeroContent] = useState<HeroContent>(() => {
    try {
      const saved = localStorage.getItem("stelvio_hero_cms");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load CMS content", e);
    }
    return DEFAULT_HERO_CONTENT;
  });

  // Initialize Projects Content from LocalStorage or default fallback
  const [projectsContent, setProjectsContent] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem("stelvio_projects_cms");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load Projects CMS content", e);
    }
    return DEFAULT_PROJECTS;
  });

  // Initialize Services Content from LocalStorage or default fallback
  const [servicesContent, setServicesContent] = useState<Service[]>(() => {
    try {
      const saved = localStorage.getItem("stelvio_services_cms");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load Services CMS content", e);
    }
    return DEFAULT_SERVICES;
  });

  // Initialize Experiences Content from LocalStorage or default fallback
  const [experiencesContent, setExperiencesContent] = useState<ExperienceItem[]>(() => {
    try {
      const saved = localStorage.getItem("stelvio_experiences_cms");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load Experiences CMS content", e);
    }
    return DEFAULT_EXPERIENCES;
  });

  // Initialize FAQs Content from LocalStorage or default fallback
  const [faqsContent, setFaqsContent] = useState<FAQItem[]>(() => {
    try {
      const saved = localStorage.getItem("stelvio_faqs_cms");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load FAQs CMS content", e);
    }
    return DEFAULT_FAQS;
  });

  // Initialize About Bio Content from LocalStorage or default fallback
  const [aboutContent, setAboutContent] = useState<AboutContent>(() => {
    try {
      const saved = localStorage.getItem("stelvio_about_cms");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load About Bio CMS content", e);
    }
    return DEFAULT_ABOUT_CONTENT;
  });

  // Initialize Contact Dialogue Content from LocalStorage or default fallback
  const [contactContent, setContactContent] = useState<ContactContent>(() => {
    try {
      const saved = localStorage.getItem("stelvio_contact_cms");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load Contact Dialogue CMS content", e);
    }
    return DEFAULT_CONTACT_CONTENT;
  });

  // Initialize Section Visibility from LocalStorage or default fallback
  const [sectionVisibility, setSectionVisibility] = useState<SectionVisibility>(() => {
    try {
      const saved = localStorage.getItem("stelvio_visibility_cms");
      if (saved) {
        return { ...DEFAULT_VISIBILITY, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error("Failed to load Section Visibility CMS content", e);
    }
    return DEFAULT_VISIBILITY;
  });

  // Initialize Social Links Content from LocalStorage or default fallback
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(() => {
    try {
      const saved = localStorage.getItem("stelvio_socials_cms");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load Social Links CMS content", e);
    }
    return DEFAULT_SOCIAL_LINKS;
  });

  // Initialize Site Config from LocalStorage or default fallback
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem("stelvio_site_config_cms");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load Site Config CMS content", e);
    }
    return DEFAULT_SITE_CONFIG;
  });

  // Effect to update favicon
  useEffect(() => {
    if (siteConfig.faviconUrl) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = siteConfig.faviconUrl;
    }
  }, [siteConfig.faviconUrl]);

  // Save changes to local storage when socialLinks updates
  const handleUpdateSocialLinks = (updatedSocialLinks: SocialLink[]) => {
    setSocialLinks(updatedSocialLinks);
    try {
      localStorage.setItem("stelvio_socials_cms", JSON.stringify(updatedSocialLinks));
    } catch (e) {
      console.error("Failed to save Social Links CMS content", e);
    }
  };

  // Save changes to local storage when siteConfig updates
  const handleUpdateSiteConfig = (updatedConfig: SiteConfig) => {
    setSiteConfig(updatedConfig);
    try {
      localStorage.setItem("stelvio_site_config_cms", JSON.stringify(updatedConfig));
    } catch (e) {
      console.error("Failed to save Site Config CMS content", e);
    }
  };

  // Save changes to local storage when sectionVisibility updates
  const handleUpdateVisibility = (updatedVisibility: SectionVisibility) => {
    setSectionVisibility(updatedVisibility);
    try {
      localStorage.setItem("stelvio_visibility_cms", JSON.stringify(updatedVisibility));
    } catch (e) {
      console.error("Failed to save Section Visibility CMS content", e);
    }
  };

  // Save changes to local storage when heroContent updates
  const handleUpdate = (updatedContent: HeroContent) => {
    setHeroContent(updatedContent);
    try {
      localStorage.setItem("stelvio_hero_cms", JSON.stringify(updatedContent));
    } catch (e) {
      console.error("Failed to save CMS content", e);
    }
  };

  // Save changes to local storage when projectsContent updates
  const handleUpdateProjects = (updatedProjects: Project[]) => {
    setProjectsContent(updatedProjects);
    try {
      localStorage.setItem("stelvio_projects_cms", JSON.stringify(updatedProjects));
    } catch (e) {
      console.error("Failed to save Projects CMS content", e);
    }
  };

  // Save changes to local storage when servicesContent updates
  const handleUpdateServices = (updatedServices: Service[]) => {
    setServicesContent(updatedServices);
    try {
      localStorage.setItem("stelvio_services_cms", JSON.stringify(updatedServices));
    } catch (e) {
      console.error("Failed to save Services CMS content", e);
    }
  };

  // Save changes to local storage when experiencesContent updates
  const handleUpdateExperiences = (updatedExperiences: ExperienceItem[]) => {
    setExperiencesContent(updatedExperiences);
    try {
      localStorage.setItem("stelvio_experiences_cms", JSON.stringify(updatedExperiences));
    } catch (e) {
      console.error("Failed to save Experiences CMS content", e);
    }
  };

  // Save changes to local storage when faqsContent updates
  const handleUpdateFaqs = (updatedFaqs: FAQItem[]) => {
    setFaqsContent(updatedFaqs);
    try {
      localStorage.setItem("stelvio_faqs_cms", JSON.stringify(updatedFaqs));
    } catch (e) {
      console.error("Failed to save FAQs CMS content", e);
    }
  };

  // Save changes to local storage when aboutContent updates
  const handleUpdateAbout = (updatedAbout: AboutContent) => {
    setAboutContent(updatedAbout);
    try {
      localStorage.setItem("stelvio_about_cms", JSON.stringify(updatedAbout));
    } catch (e) {
      console.error("Failed to save About Bio CMS content", e);
    }
  };

  // Save changes to local storage when contactContent updates
  const handleUpdateContact = (updatedContact: ContactContent) => {
    setContactContent(updatedContact);
    try {
      localStorage.setItem("stelvio_contact_cms", JSON.stringify(updatedContact));
    } catch (e) {
      console.error("Failed to save Contact Dialogue CMS content", e);
    }
  };

  // Sync state with URL hash updates dynamically
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setIsAdminView(hash === "#admin");
      
      const isProjectDetail = hash.startsWith("#project/");
      const isProjectsList = hash === "#projects";
      
      if (isProjectDetail) {
        const id = hash.substring("#project/".length);
        setActiveProjectDetailId(id);
        setIsProjectsListPage(false);
        window.scrollTo(0, 0);
      } else if (isProjectsList) {
        setActiveProjectDetailId(null);
        setIsProjectsListPage(true);
        window.scrollTo(0, 0);
      } else {
        const oldProjectDetail = activeProjectDetailId;
        const oldProjectsList = isProjectsListPage;

        setActiveProjectDetailId(null);
        setIsProjectsListPage(false);

        const targetId = hash.startsWith("#") ? hash.substring(1) : "";
        if (targetId && ["work", "services", "experience", "faq", "about", "contact"].includes(targetId)) {
          const delay = (oldProjectDetail || oldProjectsList) ? 150 : 0;
          setTimeout(() => {
            const element = document.getElementById(targetId);
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, delay);
        } else if (!hash) {
          window.scrollTo(0, 0);
        }
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [activeProjectDetailId, isProjectsListPage]);

  // Force scroll to top or target section on page reload/mount
  useEffect(() => {
    if (window.history && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    
    const hash = window.location.hash;
    const targetId = hash.startsWith("#") ? hash.substring(1) : "";
    if (targetId && ["work", "services", "experience", "faq", "about", "contact"].includes(targetId)) {
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  // Isolate Admin view entirely to "behind" a secure entry path
  if (isAdminView) {
    return (
      <AdminPanel
        content={heroContent}
        onUpdate={handleUpdate}
        defaultContent={DEFAULT_HERO_CONTENT}
        projects={projectsContent}
        onUpdateProjects={handleUpdateProjects}
        defaultProjects={DEFAULT_PROJECTS}
        services={servicesContent}
        onUpdateServices={handleUpdateServices}
        defaultServices={DEFAULT_SERVICES}
        experiences={experiencesContent}
        onUpdateExperiences={handleUpdateExperiences}
        defaultExperiences={DEFAULT_EXPERIENCES}
        faqs={faqsContent}
        onUpdateFaqs={handleUpdateFaqs}
        defaultFaqs={DEFAULT_FAQS}
        about={aboutContent}
        onUpdateAbout={handleUpdateAbout}
        defaultAbout={DEFAULT_ABOUT_CONTENT}
        contact={contactContent}
        onUpdateContact={handleUpdateContact}
        defaultContact={DEFAULT_CONTACT_CONTENT}
        visibility={sectionVisibility}
        onUpdateVisibility={handleUpdateVisibility}
        socialLinks={socialLinks}
        onUpdateSocialLinks={handleUpdateSocialLinks}
        defaultSocialLinks={DEFAULT_SOCIAL_LINKS}
        siteConfig={siteConfig}
        onUpdateSiteConfig={handleUpdateSiteConfig}
        defaultSiteConfig={DEFAULT_SITE_CONFIG}
        onBackToSite={() => {
          window.location.hash = "";
          setIsAdminView(false);
        }}
      />
    );
  }

  // Find active project if we are viewing detail
  const activeProject = activeProjectDetailId 
    ? projectsContent.find((p) => p.id === activeProjectDetailId) 
    : null;

  return (
    <div className="font-sans antialiased text-[#0A0A0A] bg-[#FFFFFF] min-h-screen selection:bg-neutral-900 selection:text-white">
      {/* 1. Navigation Header */}
      <Navigation visibility={sectionVisibility} />

      {/* Main Container */}
      <main className="w-full">
        {activeProject ? (
          <ProjectDetail 
            project={activeProject} 
            onBack={() => {
              window.location.hash = isProjectsListPage ? "#projects" : "";
            }}
            allProjects={projectsContent}
            onNavigateToProject={(id) => {
              window.location.hash = `#project/${id}`;
            }}
          />
        ) : isProjectsListPage ? (
          <AllProjects 
            projects={projectsContent}
            onBackToHome={() => {
              window.location.hash = "";
            }}
            onSelectProject={(id) => {
              window.location.hash = `#project/${id}`;
            }}
          />
        ) : (
          <>
            {/* 2. Hero Presentation with parameterizable Custom Content */}
            <Hero content={heroContent} />

            {/* 3. Case Studies Slider Grid */}
            {sectionVisibility.work && <CaseStudies projects={projectsContent} />}

            {/* 4. Service Capabilities */}
            {sectionVisibility.services && <Services services={servicesContent} />}

            {/* 5. Experience Timeline */}
            {sectionVisibility.experience && <Experience experiences={experiencesContent} />}

            {/* 6. FAQ Accordion Grid */}
            {sectionVisibility.faq && <FAQ faqs={faqsContent} />}

            {/* 7. Detailed Biography */}
            {sectionVisibility.about && <About content={aboutContent} />}

            {/* 8. Black CTA Banner */}
            {sectionVisibility.contact && <ContactBanner content={contactContent} />}
          </>
        )}
      </main>

      {/* 9. Site Footer Information */}
      <Footer socialLinks={socialLinks} />
    </div>
  );
}


