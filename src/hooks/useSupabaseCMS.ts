import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { 
  HeroContent, Project, Service, ExperienceItem, FAQItem, 
  AboutContent, ContactContent, SectionVisibility, SocialLink, SiteConfig 
} from '../types';
import { 
  PROJECTS as DEFAULT_PROJECTS, 
  SERVICES as DEFAULT_SERVICES, 
  EXPERIENCES as DEFAULT_EXPERIENCES, 
  FAQS as DEFAULT_FAQS,
  DEFAULT_SOCIAL_LINKS,
  DEFAULT_SITE_CONFIG
} from '../data';

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

export function useSupabaseCMS() {
  const [loading, setLoading] = useState(true);

  const [heroContent, setHeroContent] = useState<HeroContent>(DEFAULT_HERO_CONTENT);
  const [projectsContent, setProjectsContent] = useState<Project[]>(DEFAULT_PROJECTS);
  const [servicesContent, setServicesContent] = useState<Service[]>(DEFAULT_SERVICES);
  const [experiencesContent, setExperiencesContent] = useState<ExperienceItem[]>(DEFAULT_EXPERIENCES);
  const [faqsContent, setFaqsContent] = useState<FAQItem[]>(DEFAULT_FAQS);
  const [aboutContent, setAboutContent] = useState<AboutContent>(DEFAULT_ABOUT_CONTENT);
  const [contactContent, setContactContent] = useState<ContactContent>(DEFAULT_CONTACT_CONTENT);
  const [sectionVisibility, setSectionVisibility] = useState<SectionVisibility>(DEFAULT_VISIBILITY);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(DEFAULT_SOCIAL_LINKS);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [
        { data: hero }, { data: projects }, { data: services },
        { data: experiences }, { data: faqs }, { data: about },
        { data: contact }, { data: visibility }, { data: social },
        { data: config }
      ] = await Promise.all([
        supabase.from('hero_content').select('*').single(),
        supabase.from('projects').select('*').order('created_at', { ascending: true }),
        supabase.from('services').select('*').order('created_at', { ascending: true }),
        supabase.from('experiences').select('*').order('created_at', { ascending: true }),
        supabase.from('faqs').select('*').order('created_at', { ascending: true }),
        supabase.from('about_content').select('*').single(),
        supabase.from('contact_content').select('*').single(),
        supabase.from('section_visibility').select('*').single(),
        supabase.from('social_links').select('*').order('created_at', { ascending: true }),
        supabase.from('site_config').select('*').single()
      ]);

      if (hero) setHeroContent(hero);
      if (projects && projects.length > 0) setProjectsContent(projects);
      if (services && services.length > 0) setServicesContent(services);
      if (experiences && experiences.length > 0) setExperiencesContent(experiences);
      if (faqs && faqs.length > 0) setFaqsContent(faqs);
      if (about) setAboutContent(about);
      if (contact) setContactContent(contact);
      if (visibility) setSectionVisibility(visibility);
      if (social && social.length > 0) setSocialLinks(social);
      if (config) setSiteConfig(config);

    } catch (error) {
      console.error("Error fetching data from Supabase:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handlers for saving
  const handleUpdateHero = async (updated: HeroContent) => {
    setHeroContent(updated);
    const { error } = await supabase.from('hero_content').upsert({ id: 1, ...updated });
    if (error) console.error("Error saving hero:", error);
  };

  const handleUpdateProjects = async (updated: Project[]) => {
    setProjectsContent(updated);
    const { error: delErr } = await supabase.from('projects').delete().neq('id', '0');
    if (delErr) console.error("Error deleting projects:", delErr);
    const toInsert = updated.map((p, idx) => ({ ...p, created_at: new Date(Date.now() + idx).toISOString() }));
    const { error: insErr } = await supabase.from('projects').insert(toInsert);
    if (insErr) console.error("Error inserting projects:", insErr);
  };

  const handleUpdateServices = async (updated: Service[]) => {
    setServicesContent(updated);
    await supabase.from('services').delete().neq('id', '0');
    const toInsert = updated.map((s, idx) => ({ ...s, created_at: new Date(Date.now() + idx).toISOString() }));
    const { error } = await supabase.from('services').insert(toInsert);
    if (error) console.error("Error saving services:", error);
  };

  const handleUpdateExperiences = async (updated: ExperienceItem[]) => {
    setExperiencesContent(updated);
    await supabase.from('experiences').delete().neq('id', '0');
    const toInsert = updated.map((e, idx) => ({ ...e, created_at: new Date(Date.now() + idx).toISOString() }));
    const { error } = await supabase.from('experiences').insert(toInsert);
    if (error) console.error("Error saving experiences:", error);
  };

  const handleUpdateFaqs = async (updated: FAQItem[]) => {
    setFaqsContent(updated);
    await supabase.from('faqs').delete().neq('id', '0');
    const toInsert = updated.map((f, idx) => ({ ...f, created_at: new Date(Date.now() + idx).toISOString() }));
    const { error } = await supabase.from('faqs').insert(toInsert);
    if (error) console.error("Error saving faqs:", error);
  };

  const handleUpdateAbout = async (updated: AboutContent) => {
    setAboutContent(updated);
    const { error } = await supabase.from('about_content').upsert({ id: 1, ...updated });
    if (error) console.error("Error saving about:", error);
  };

  const handleUpdateContact = async (updated: ContactContent) => {
    setContactContent(updated);
    const { error } = await supabase.from('contact_content').upsert({ id: 1, ...updated });
    if (error) console.error("Error saving contact:", error);
  };

  const handleUpdateVisibility = async (updated: SectionVisibility) => {
    setSectionVisibility(updated);
    const { error } = await supabase.from('section_visibility').upsert({ id: 1, ...updated });
    if (error) console.error("Error saving visibility:", error);
  };

  const handleUpdateSocialLinks = async (updated: SocialLink[]) => {
    setSocialLinks(updated);
    await supabase.from('social_links').delete().neq('id', '0');
    const toInsert = updated.map((s, idx) => ({ ...s, created_at: new Date(Date.now() + idx).toISOString() }));
    const { error } = await supabase.from('social_links').insert(toInsert);
    if (error) console.error("Error saving social links:", error);
  };

  const handleUpdateSiteConfig = async (updated: SiteConfig) => {
    setSiteConfig(updated);
    const { error } = await supabase.from('site_config').upsert({ id: 1, ...updated });
    if (error) console.error("Error saving site config:", error);
  };

  return {
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
  };
}
