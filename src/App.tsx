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
import { useSupabaseCMS } from "./hooks/useSupabaseCMS";
import { 
  PROJECTS as DEFAULT_PROJECTS, 
  SERVICES as DEFAULT_SERVICES, 
  EXPERIENCES as DEFAULT_EXPERIENCES, 
  FAQS as DEFAULT_FAQS,
  DEFAULT_SOCIAL_LINKS,
  DEFAULT_SITE_CONFIG
} from "./data";
import { HeroContent, AboutContent, ContactContent } from "./types";

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

  const {
    loading,
    heroContent,
    projectsContent,
    servicesContent,
    experiencesContent,
    faqsContent,
    aboutContent,
    contactContent,
    sectionVisibility,
    socialLinks,
    siteConfig,
    handleUpdateHero,
    handleUpdateProjects,
    handleUpdateServices,
    handleUpdateExperiences,
    handleUpdateFaqs,
    handleUpdateAbout,
    handleUpdateContact,
    handleUpdateVisibility,
    handleUpdateSocialLinks,
    handleUpdateSiteConfig,
  } = useSupabaseCMS();

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

  // Show a minimalist loading screen while fetching CMS data initially
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center font-mono text-xs uppercase tracking-widest text-[#0A0A0A]">
        Loading System Environment...
      </div>
    );
  }

  // Isolate Admin view entirely to "behind" a secure entry path
  if (isAdminView) {
    return (
      <AdminPanel
        content={heroContent}
        onUpdate={handleUpdateHero}
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
