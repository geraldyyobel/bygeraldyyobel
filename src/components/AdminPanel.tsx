import React, { useState, useEffect, FormEvent } from "react";
import { 
  Check, 
  RotateCcw, 
  LayoutDashboard, 
  LogOut, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Sliders, 
  Shield, 
  Briefcase, 
  Plus, 
  Trash2, 
  FolderOpen,
  Wrench,
  Calendar,
  HelpCircle,
  User,
  Mail
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { HeroContent, Project, Service, ExperienceItem, FAQItem, AboutContent, ContactContent, SectionVisibility, SocialLink, SiteConfig } from "../types";

interface AdminPanelProps {
  content: HeroContent;
  onUpdate: (updatedContent: HeroContent) => void;
  defaultContent: HeroContent;
  projects: Project[];
  onUpdateProjects: (updatedProjects: Project[]) => void;
  defaultProjects: Project[];
  services: Service[];
  onUpdateServices: (updatedServices: Service[]) => void;
  defaultServices: Service[];
  experiences: ExperienceItem[];
  onUpdateExperiences: (updatedExperiences: ExperienceItem[]) => void;
  defaultExperiences: ExperienceItem[];
  faqs: FAQItem[];
  onUpdateFaqs: (updatedFaqs: FAQItem[]) => void;
  defaultFaqs: FAQItem[];
  about: AboutContent;
  onUpdateAbout: (updatedAbout: AboutContent) => void;
  defaultAbout: AboutContent;
  contact: ContactContent;
  onUpdateContact: (updatedContact: ContactContent) => void;
  defaultContact: ContactContent;
  visibility: SectionVisibility;
  onUpdateVisibility: (updatedVisibility: SectionVisibility) => void;
  socialLinks: SocialLink[];
  onUpdateSocialLinks: (updatedSocialLinks: SocialLink[]) => void;
  defaultSocialLinks: SocialLink[];
  siteConfig: SiteConfig;
  onUpdateSiteConfig: (updatedConfig: SiteConfig) => void;
  defaultSiteConfig: SiteConfig;
  onBackToSite: () => void;
}

const parseBoldText = (text: string) => {
  if (!text) return "";
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="text-[#0A0A0A] font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

export default function AdminPanel({ 
  content, 
  onUpdate, 
  defaultContent, 
  projects, 
  onUpdateProjects, 
  defaultProjects, 
  services,
  onUpdateServices,
  defaultServices,
  experiences,
  onUpdateExperiences,
  defaultExperiences,
  faqs,
  onUpdateFaqs,
  defaultFaqs,
  about,
  onUpdateAbout,
  defaultAbout,
  contact,
  onUpdateContact,
  defaultContact,
  visibility,
  onUpdateVisibility,
  socialLinks,
  onUpdateSocialLinks,
  defaultSocialLinks,
  siteConfig,
  onUpdateSiteConfig,
  defaultSiteConfig,
  onBackToSite 
}: AdminPanelProps) {
  // Session authentication state (persists across manual triggers but clears when closed)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("admin_authenticated") === "true";
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  
  // Custom Workspace Tabs
  const [activeTab, setActiveTab] = useState<"hero" | "projects" | "services" | "experiences" | "faqs" | "about" | "contact" | "socials">("hero");

  // Hero Fields Temp State
  const [tempContent, setTempContent] = useState<HeroContent>({ ...content });
  
  // Projects Temp State
  const [tempProjects, setTempProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");

  // Services Temp State
  const [tempServices, setTempServices] = useState<Service[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");

  // Experiences Temp State
  const [tempExperiences, setTempExperiences] = useState<ExperienceItem[]>([]);
  const [selectedExperienceId, setSelectedExperienceId] = useState<string>("");

  // FAQs Temp State
  const [tempFaqs, setTempFaqs] = useState<FAQItem[]>([]);
  const [selectedFaqId, setSelectedFaqId] = useState<string>("");

  // About Temp State
  const [tempAbout, setTempAbout] = useState<AboutContent>({ ...about });

  // Contact Temp State
  const [tempContact, setTempContact] = useState<ContactContent>({ ...contact });

  // Socials Temp State
  const [tempSocialLinks, setTempSocialLinks] = useState<SocialLink[]>([]);

  // Site Config Temp State
  const [tempSiteConfig, setTempSiteConfig] = useState<SiteConfig>({ ...siteConfig });

  const [saveSuccess, setSaveSuccess] = useState(false);

  // Drag and Drop state
  const [draggedItem, setDraggedItem] = useState<{ type: string, index: number } | null>(null);

  // FAQ open state inside Sandbox Preview
  const [previewFaqOpenId, setPreviewFaqOpenId] = useState<string | null>(null);

  // Sync temp states on initial load / prop updates
  useEffect(() => {
    setTempContent({ ...content });
  }, [content]);

  useEffect(() => {
    setTempProjects([...projects]);
  }, [projects]);

  useEffect(() => {
    if (tempProjects.length > 0) {
      if (!selectedProjectId || !tempProjects.some((p) => p.id === selectedProjectId)) {
        setSelectedProjectId(tempProjects[0].id);
      }
    } else {
      setSelectedProjectId("");
    }
  }, [tempProjects, selectedProjectId]);

  useEffect(() => {
    setTempServices([...services]);
  }, [services]);

  useEffect(() => {
    if (tempServices.length > 0) {
      if (!selectedServiceId || !tempServices.some((s) => s.id === selectedServiceId)) {
        setSelectedServiceId(tempServices[0].id);
      }
    } else {
      setSelectedServiceId("");
    }
  }, [tempServices, selectedServiceId]);

  useEffect(() => {
    setTempExperiences([...experiences]);
  }, [experiences]);

  useEffect(() => {
    if (tempExperiences.length > 0) {
      if (!selectedExperienceId || !tempExperiences.some((e) => e.id === selectedExperienceId)) {
        setSelectedExperienceId(tempExperiences[0].id);
      }
    } else {
      setSelectedExperienceId("");
    }
  }, [tempExperiences, selectedExperienceId]);

  useEffect(() => {
    setTempFaqs([...faqs]);
  }, [faqs]);

  useEffect(() => {
    if (tempFaqs.length > 0) {
      if (!selectedFaqId || !tempFaqs.some((f) => f.id === selectedFaqId)) {
        setSelectedFaqId(tempFaqs[0].id);
      }
    } else {
      setSelectedFaqId("");
    }
  }, [tempFaqs, selectedFaqId]);

  useEffect(() => {
    setTempAbout({ ...about });
  }, [about]);

  useEffect(() => {
    setTempContact({ ...contact });
  }, [contact]);

  useEffect(() => {
    setTempSocialLinks(socialLinks ? [...socialLinks] : []);
  }, [socialLinks]);

  useEffect(() => {
    setTempSiteConfig({ ...siteConfig });
  }, [siteConfig]);

  // Find currently selected structures in CMS dropdowns
  const selectedProject = tempProjects.find((p) => p.id === selectedProjectId) || tempProjects[0];
  const selectedService = tempServices.find((s) => s.id === selectedServiceId) || tempServices[0];
  const selectedExperience = tempExperiences.find((e) => e.id === selectedExperienceId) || tempExperiences[0];
  const selectedFaq = tempFaqs.find((f) => f.id === selectedFaqId) || tempFaqs[0];

  // Handle Login submission
  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true);
      setLoginError("");
      sessionStorage.setItem("admin_authenticated", "true");
    } else {
      setLoginError("Invalid credentials. Please use admin / admin.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    sessionStorage.removeItem("admin_authenticated");
  };

  const handleHeroChange = (field: keyof HeroContent, value: string) => {
    const next = { ...tempContent, [field]: value };
    setTempContent(next);
    onUpdate(next);
  };

  const handleProjectFieldChange = (id: string, field: keyof Project, value: any) => {
    const next = tempProjects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj));
    setTempProjects(next);
    onUpdateProjects(next);
  };

  const handleProjectGalleryChange = (id: string, gallery: string[]) => {
    const next = tempProjects.map((proj) => (proj.id === id ? { ...proj, gallery } : proj));
    setTempProjects(next);
    onUpdateProjects(next);
  };

  const handleServiceFieldChange = (id: string, field: keyof Service, value: string) => {
    const next = tempServices.map((s) => (s.id === id ? { ...s, [field]: value } : s));
    setTempServices(next);
    onUpdateServices(next);
  };

  const handleAddProject = () => {
    const newProj: Project = {
      id: `project-${Date.now()}`,
      title: "New Architectural Structure",
      category: "Design & Development",
      year: new Date().getFullYear().toString(),
      image: "https://picsum.photos/seed/new-structure/1000/750",
      description: "An elegant physical mock-up exploration designed with minimal visual focus points.",
      story: "This design project explores state-of-the-art interactive grids, structured layouts, and Swiss font scales. Built with a modular alignment system to support flawless responsiveness and modern performance standards.",
      demoUrl: "https://example.com"
    };
    const next = [...tempProjects, newProj];
    setTempProjects(next);
    onUpdateProjects(next);
    setSelectedProjectId(newProj.id);
  };

  const handleDeleteProject = (id: string) => {
    if (tempProjects.length <= 1) {
      alert("At least one project highlight is required to preserve layout continuity.");
      return;
    }
    const filtered = tempProjects.filter((p) => p.id !== id);
    setTempProjects(filtered);
    onUpdateProjects(filtered);
    if (selectedProjectId === id) {
      const remainingId = filtered[0]?.id || "";
      setSelectedProjectId(remainingId);
    }
  };

  const handleAddService = () => {
    const newSer: Service = {
      id: `service-${Date.now()}`,
      icon: "⚡",
      name: "New Capability",
      tech: "Custom System Tech",
      duration: "1 - 2 weeks",
      description: "A high-fidelity implementation designed to handle specific digital engineering workflows perfectly."
    };
    const next = [...tempServices, newSer];
    setTempServices(next);
    onUpdateServices(next);
    setSelectedServiceId(newSer.id);
  };

  const handleDeleteService = (id: string) => {
    if (tempServices.length <= 1) {
      alert("At least one capability highlight is required to preserve layout continuity.");
      return;
    }
    const filtered = tempServices.filter((s) => s.id !== id);
    setTempServices(filtered);
    onUpdateServices(filtered);
    if (selectedServiceId === id) {
      const remainingId = filtered[0]?.id || "";
      setSelectedServiceId(remainingId);
    }
  };

  const handleExperienceFieldChange = (id: string, field: keyof ExperienceItem, value: string) => {
    const next = tempExperiences.map((e) => (e.id === id ? { ...e, [field]: value } : e));
    setTempExperiences(next);
    onUpdateExperiences(next);
  };

  const handleAddExperience = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: "Designer & Engineer",
      company: "Zurich Labs",
      years: "2024 – Present",
      desc: "Delivering bespoke responsive interfaces, interactive custom products, and Swiss typographic frameworks.",
      logoUrl: ""
    };
    const next = [...tempExperiences, newExp];
    setTempExperiences(next);
    onUpdateExperiences(next);
    setSelectedExperienceId(newExp.id);
  };

  const handleDeleteExperience = (id: string) => {
    if (tempExperiences.length <= 1) {
      alert("At least one background retrospective item is required to preserve layout continuity.");
      return;
    }
    const filtered = tempExperiences.filter((e) => e.id !== id);
    setTempExperiences(filtered);
    onUpdateExperiences(filtered);
    if (selectedExperienceId === id) {
      const remainingId = filtered[0]?.id || "";
      setSelectedExperienceId(remainingId);
    }
  };

  const handleFaqFieldChange = (id: string, field: keyof FAQItem, value: string) => {
    const next = tempFaqs.map((f) => (f.id === id ? { ...f, [field]: value } : f));
    setTempFaqs(next);
    onUpdateFaqs(next);
  };

  const handleAddFaq = () => {
    const newFaq: FAQItem = {
      id: `faq-${Date.now()}`,
      question: "How do you align design grids perfectly?",
      answer: "We employ architectural grid limits, matching font scales layout division lines, and proportional spacing offsets precisely."
    };
    const next = [...tempFaqs, newFaq];
    setTempFaqs(next);
    onUpdateFaqs(next);
    setSelectedFaqId(newFaq.id);
  };

  const handleDeleteFaq = (id: string) => {
    if (tempFaqs.length <= 1) {
      alert("At least one FAQ item is required to preserve layout continuity.");
      return;
    }
    const filtered = tempFaqs.filter((f) => f.id !== id);
    setTempFaqs(filtered);
    onUpdateFaqs(filtered);
    if (selectedFaqId === id) {
      const remainingId = filtered[0]?.id || "";
      setSelectedFaqId(remainingId);
    }
  };

  const handleAboutFieldChange = (field: keyof AboutContent, value: string) => {
    const next = { ...tempAbout, [field]: value };
    setTempAbout(next);
    onUpdateAbout(next);
  };

  const handleContactFieldChange = (field: keyof ContactContent, value: string) => {
    const next = { ...tempContact, [field]: value };
    setTempContact(next);
    onUpdateContact(next);
  };

  const handleSocialLinkFieldChange = (id: string, field: keyof SocialLink, value: any) => {
    const next = tempSocialLinks.map((link) => (link.id === id ? { ...link, [field]: value } : link));
    setTempSocialLinks(next);
    onUpdateSocialLinks(next);
  };

  const handleAddSocialLink = () => {
    const newId = `social-${Date.now()}`;
    const newLink: SocialLink = {
      id: newId,
      name: "New Social",
      url: "https://example.com",
      isEnabled: true
    };
    const next = [...tempSocialLinks, newLink];
    setTempSocialLinks(next);
    onUpdateSocialLinks(next);
  };

  const handleDeleteSocialLink = (id: string) => {
    const next = tempSocialLinks.filter((link) => link.id !== id);
    setTempSocialLinks(next);
    onUpdateSocialLinks(next);
  };

  const handleDragStart = (e: React.DragEvent, type: string, index: number) => {
    setDraggedItem({ type, index });
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = "move";
    }
  };

  const handleDrop = (e: React.DragEvent, type: string, targetIndex: number) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.type !== type || draggedItem.index === targetIndex) return;

    if (type === "projects") {
      const newArr = [...tempProjects];
      const [removed] = newArr.splice(draggedItem.index, 1);
      newArr.splice(targetIndex, 0, removed);
      setTempProjects(newArr);
      onUpdateProjects(newArr);
    } else if (type === "services") {
      const newArr = [...tempServices];
      const [removed] = newArr.splice(draggedItem.index, 1);
      newArr.splice(targetIndex, 0, removed);
      setTempServices(newArr);
      onUpdateServices(newArr);
    } else if (type === "experiences") {
      const newArr = [...tempExperiences];
      const [removed] = newArr.splice(draggedItem.index, 1);
      newArr.splice(targetIndex, 0, removed);
      setTempExperiences(newArr);
      onUpdateExperiences(newArr);
    } else if (type === "faqs") {
      const newArr = [...tempFaqs];
      const [removed] = newArr.splice(draggedItem.index, 1);
      newArr.splice(targetIndex, 0, removed);
      setTempFaqs(newArr);
      onUpdateFaqs(newArr);
    }
    setDraggedItem(null);
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (base64Url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      onSuccess(result);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleSave = () => {
    onUpdate(tempContent);
    onUpdateProjects(tempProjects);
    onUpdateServices(tempServices);
    onUpdateExperiences(tempExperiences);
    onUpdateFaqs(tempFaqs);
    onUpdateAbout(tempAbout);
    onUpdateContact(tempContact);
    onUpdateSocialLinks(tempSocialLinks);
    onUpdateSiteConfig(tempSiteConfig);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2000);
  };

  const handleResetToDefault = () => {
    if (activeTab === "hero") {
      if (window.confirm("Are you sure you want to reset the hero content to its original Swiss Design Studio defaults?")) {
        setTempContent({ ...defaultContent });
        onUpdate(defaultContent);
        setTempSiteConfig({ ...defaultSiteConfig });
        onUpdateSiteConfig(defaultSiteConfig);
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
        }, 2000);
      }
    } else if (activeTab === "projects") {
      if (window.confirm("Are you sure you want to reset all project highlights back to defaults? This will erase any custom case studies you created.")) {
        setTempProjects([...defaultProjects]);
        onUpdateProjects(defaultProjects);
        if (defaultProjects.length > 0) {
          setSelectedProjectId(defaultProjects[0].id);
        }
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
        }, 2000);
      }
    } else if (activeTab === "services") {
      if (window.confirm("Are you sure you want to reset all capabilities back to defaults? This will erase any custom services you created.")) {
        setTempServices([...defaultServices]);
        onUpdateServices(defaultServices);
        if (defaultServices.length > 0) {
          setSelectedServiceId(defaultServices[0].id);
        }
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
        }, 2000);
      }
    } else if (activeTab === "experiences") {
      if (window.confirm("Are you sure you want to reset all experiences to defaults?")) {
        setTempExperiences([...defaultExperiences]);
        onUpdateExperiences(defaultExperiences);
        if (defaultExperiences.length > 0) {
          setSelectedExperienceId(defaultExperiences[0].id);
        }
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
        }, 2000);
      }
    } else if (activeTab === "faqs") {
      if (window.confirm("Are you sure you want to reset all FAQs to defaults?")) {
        setTempFaqs([...defaultFaqs]);
        onUpdateFaqs(defaultFaqs);
        if (defaultFaqs.length > 0) {
          setSelectedFaqId(defaultFaqs[0].id);
        }
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
        }, 2000);
      }
    } else if (activeTab === "about") {
      if (window.confirm("Are you sure you want to reset the biography & philosophy to defaults?")) {
        setTempAbout({ ...defaultAbout });
        onUpdateAbout(defaultAbout);
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
        }, 2000);
      }
    } else if (activeTab === "contact") {
      if (window.confirm("Are you sure you want to reset the contact dialogue banner to defaults?")) {
        setTempContact({ ...defaultContact });
        onUpdateContact(defaultContact);
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
        }, 2000);
      }
    } else if (activeTab === "socials") {
      if (window.confirm("Are you sure you want to reset all social media links to defaults?")) {
        setTempSocialLinks([...defaultSocialLinks]);
        onUpdateSocialLinks(defaultSocialLinks);
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
        }, 2000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-[#0A0A0A] flex flex-col justify-between" id="admin-panel-container">
      {/* Dynamic Authentication Gate */}
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          /* Login Form View */
          <motion.div
            key="login-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col items-center justify-center p-6"
            id="admin-login-wrapper"
          >
            <div className="w-full max-w-[420px] bg-[#FFFFFF] border border-[#E5E5E5] p-8 md:p-10 shadow-sm rounded-[2px]">
              {/* Back to site arrow */}
              <button
                onClick={onBackToSite}
                className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#6B6B6B] hover:text-[#0A0A0A] mb-8 transition-colors duration-200 cursor-pointer"
                id="btn-back-from-login"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Return to Portfolio</span>
              </button>

              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-4 w-4 text-[#0A0A0A]" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#6B6B6B] font-bold block">
                    Secured Node Access
                  </span>
                </div>
                <h1 className="font-sans font-extrabold text-[#0A0A0A] tracking-tighter text-3xl m-0 leading-tight">
                  CMS LOGIN
                </h1>
                <p className="font-sans text-xs text-[#6B6B6B] leading-relaxed mt-2 font-light">
                  Authenticate with system username & password to access real-time highlight settings.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-5" id="admin-login-form">
                {/* Username Input */}
                <div className="flex flex-col space-y-1.5 focus-within:text-[#0A0A0A]">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                    System Username
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                    placeholder="Enter Username"
                    id="login-username"
                  />
                </div>

                {/* Password Input */}
                <div className="flex flex-col space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                    Access Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#FFFFFF] border border-[#E5E5E5] pl-4 pr-11 py-3 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                      placeholder="Enter Password"
                      id="login-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B6B6B] hover:text-[#0A0A0A]"
                      style={{ minWidth: "24px", minHeight: "24px" }}
                      aria-label="Toggle password visibility"
                      id="btn-toggle-password-visibility"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Authentication Note */}
                <div className="bg-neutral-50 p-3.5 border border-[#E5E5E5] text-[11px] font-mono text-[#6B6B6B] leading-relaxed">
                  Demo Credentials: <strong className="text-black font-semibold"></strong><strong className="text-black font-semibold"></strong>
                </div>

                {/* Error messages */}
                {loginError && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 font-mono text-[11px] font-semibold"
                    id="login-error-msg"
                  >
                    {loginError}
                  </motion.p>
                )}

                {/* Submit Trigger Button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 bg-[#0A0A0A] text-[#FFFFFF] font-sans font-medium text-xs uppercase tracking-widest py-4 hover:bg-neutral-800 transition-colors duration-200 cursor-pointer shadow-sm rounded-[2px]"
                  style={{ minHeight: "48px" }}
                  id="btn-login-submit"
                >
                  <span>Authenticate Access</span>
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          /* Authenticated CMS Dashboard */
          <motion.div
            key="dashboard-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col"
            id="admin-dashboard-wrapper"
          >
            {/* Top Minimal Admin Navigation Bar */}
            <header className="sticky top-0 z-40 bg-[#FFFFFF] border-b border-[#E5E5E5] h-16 shrink-0">
              <div className="max-w-[1240px] w-full mx-auto h-full px-6 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <LayoutDashboard className="h-4 w-4 text-[#0A0A0A]" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#0A0A0A] font-bold">
                    Geraldy Yobel / CMS Portal
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={onBackToSite}
                    className="inline-flex items-center space-x-1.5 font-sans text-xs text-[#6B6B6B] hover:text-[#0A0A0A] border-r border-[#E5E5E5] pr-4 cursor-pointer"
                    id="btn-nav-public-site"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>View Public Site</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center space-x-1.5 font-mono text-xs uppercase tracking-wider text-red-600 hover:text-red-700 font-semibold cursor-pointer"
                    id="btn-logout"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </header>

            {/* Dashboard Workspace */}
            <div className="flex-1 max-w-[1240px] w-full mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-8">
              {/* Left Column: Form Editor Controls */}
              <div className="bg-[#FFFFFF] border border-[#E5E5E5] p-8 md:p-10 rounded-[2px] shadow-sm flex flex-col justify-between">
                <div>
                  {/* Dynamic Switching Workspace Tabs */}
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-1.5 mb-8 bg-neutral-100 p-1.5 rounded-[4px] border border-[#E5E5E5] w-full">
                    <button
                      onClick={() => setActiveTab("hero")}
                      className={`font-mono text-[9px] uppercase font-bold tracking-wider py-2.5 px-1.5 rounded-[2px] transition-all duration-250 cursor-pointer text-center select-none ${
                        activeTab === "hero" ? "bg-white text-black shadow-xs border border-neutral-200 font-extrabold" : "text-[#6B6B6B] hover:text-[#0A0A0A]"
                      }`}
                    >
                      00 // HERO
                    </button>
                    <button
                      onClick={() => setActiveTab("projects")}
                      className={`font-mono text-[9px] uppercase font-bold tracking-wider py-2.5 px-1.5 rounded-[2px] transition-all duration-250 cursor-pointer text-center select-none ${
                        activeTab === "projects" ? "bg-white text-black shadow-xs border border-neutral-200 font-extrabold" : "text-[#6B6B6B] hover:text-[#0A0A0A]"
                      }`}
                    >
                      01 // BUILDS
                    </button>
                    <button
                      onClick={() => setActiveTab("services")}
                      className={`font-mono text-[9px] uppercase font-bold tracking-wider py-2.5 px-1.5 rounded-[2px] transition-all duration-250 cursor-pointer text-center select-none ${
                        activeTab === "services" ? "bg-white text-black shadow-xs border border-neutral-200 font-extrabold" : "text-[#6B6B6B] hover:text-[#0A0A0A]"
                      }`}
                    >
                      02 // SERVICES
                    </button>
                    <button
                      onClick={() => setActiveTab("experiences")}
                      className={`font-mono text-[9px] uppercase font-bold tracking-wider py-2.5 px-1.5 rounded-[2px] transition-all duration-250 cursor-pointer text-center select-none ${
                        activeTab === "experiences" ? "bg-white text-black shadow-xs border border-neutral-200 font-extrabold" : "text-[#6B6B6B] hover:text-[#0A0A0A]"
                      }`}
                    >
                      03 // EXPERIENCE
                    </button>
                    <button
                      onClick={() => setActiveTab("faqs")}
                      className={`font-mono text-[9px] uppercase font-bold tracking-wider py-2.5 px-1.5 rounded-[2px] transition-all duration-250 cursor-pointer text-center select-none ${
                        activeTab === "faqs" ? "bg-white text-black shadow-xs border border-neutral-200 font-extrabold" : "text-[#6B6B6B] hover:text-[#0A0A0A]"
                      }`}
                    >
                      04 // FAQS
                    </button>
                    <button
                      onClick={() => setActiveTab("about")}
                      className={`font-mono text-[9px] uppercase font-bold tracking-wider py-2.5 px-1.5 rounded-[2px] transition-all duration-250 cursor-pointer text-center select-none ${
                        activeTab === "about" ? "bg-white text-black shadow-xs border border-neutral-200 font-extrabold" : "text-[#6B6B6B] hover:text-[#0A0A0A]"
                      }`}
                    >
                      05 // ABOUT
                    </button>
                    <button
                      onClick={() => setActiveTab("contact")}
                      className={`font-mono text-[9px] uppercase font-bold tracking-wider py-2.5 px-1.5 rounded-[2px] transition-all duration-250 cursor-pointer text-center select-none ${
                        activeTab === "contact" ? "bg-white text-black shadow-xs border border-neutral-200 font-extrabold" : "text-[#6B6B6B] hover:text-[#0A0A0A]"
                      }`}
                    >
                      06 // CONTACT
                    </button>
                    <button
                      onClick={() => setActiveTab("socials")}
                      className={`font-mono text-[9px] uppercase font-bold tracking-wider py-2.5 px-1.5 rounded-[2px] transition-all duration-250 cursor-pointer text-center select-none ${
                        activeTab === "socials" ? "bg-white text-black shadow-xs border border-neutral-200 font-extrabold" : "text-[#6B6B6B] hover:text-[#0A0A0A]"
                      }`}
                    >
                      07 // SOCIALS
                    </button>
                  </div>

                  {/* Header Title based on Active Tab */}
                  {activeTab === "hero" ? (
                    <>
                      <div className="flex items-center space-x-2 mb-2">
                        <Sliders className="h-4 w-4 text-[#0a0a0a]" />
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#6B6B6B] font-bold block">
                          Highlight Customizer
                        </span>
                      </div>
                      <h2 className="font-sans font-bold text-[#0A0A0A] tracking-tighter text-3xl mb-4 m-0">
                        Hero Banner Configurations
                      </h2>
                      <p className="font-sans font-light text-xs text-[#6B6B6B] leading-relaxed mb-8 max-w-xl">
                        Customize the text blocks represented in Section 00 (Hero Banner highlight). All updates are instantly reflected in the preview sandbox panel on your right.
                      </p>

                      <div className="space-y-6">
                        {/* Top Label */}
                        <div className="flex flex-col space-y-1.5">
                          <label className="font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                            Top Category Label
                          </label>
                          <input
                            type="text"
                            value={tempContent.topLabel}
                            onChange={(e) => handleHeroChange("topLabel", e.target.value)}
                            className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                            placeholder="e.g. 00 // SWISS DESIGN STUDIO"
                            id="field-top-label"
                          />
                        </div>

                        {/* Headline */}
                        <div className="flex flex-col space-y-1.5">
                          <label className="font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                            Portfolio Headline Description
                          </label>
                          <textarea
                            rows={4}
                            value={tempContent.headline}
                            onChange={(e) => handleHeroChange("headline", e.target.value)}
                            className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200 resize-none leading-relaxed"
                            placeholder="Central hero statement..."
                            id="field-headline"
                          />
                        </div>

                        {/* Company Name */}
                        <div className="flex flex-col space-y-1.5">
                          <label className="font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                            Active Corporate Company
                          </label>
                          <input
                            type="text"
                            value={tempContent.companyName}
                            onChange={(e) => handleHeroChange("companyName", e.target.value)}
                            className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                            placeholder="e.g. Linear"
                            id="field-company-name"
                          />
                        </div>

                        {/* Target Freelance Month */}
                        <div className="flex flex-col space-y-1.5">
                          <label className="font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                            Freelance Booking Targets (Month)
                          </label>
                          <input
                            type="text"
                            value={tempContent.freelanceMonth}
                            onChange={(e) => handleHeroChange("freelanceMonth", e.target.value)}
                            className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                            placeholder="e.g. June"
                            id="field-freelance-month"
                          />
                        </div>

                        {/* Custom Status Banner Statement */}
                        <div className="flex flex-col space-y-1.5">
                          <label className="font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                            Custom Status Banner Statement
                          </label>
                          <textarea
                            rows={3}
                            value={tempContent.bannerText || ""}
                            onChange={(e) => handleHeroChange("bannerText", e.target.value)}
                            className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200 leading-relaxed"
                            placeholder="e.g. Designing full-time @**Linear**. Accepting freelance opportunities for **June**."
                            id="field-banner-text"
                          />
                          <p className="font-mono text-[9px] text-[#6B6B6B]">
                            TIP: Wrap words with <strong className="text-black">**double asterisks**</strong> to render them in bold Swiss corporate font accents.
                          </p>
                        </div>

                        <div className="border-t border-[#E5E5E5] pt-6 my-6"></div>

                        {/* Favicon URL */}
                        <div className="flex flex-col space-y-1.5">
                          <label className="font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                            Global Favicon URL
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={tempSiteConfig.faviconUrl}
                              onChange={(e) => {
                                const next = { ...tempSiteConfig, faviconUrl: e.target.value };
                                setTempSiteConfig(next);
                                onUpdateSiteConfig(next);
                              }}
                              className="flex-1 bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                              placeholder="e.g. /vite.svg or https://example.com/favicon.ico"
                              id="field-favicon-url"
                            />
                            <label className="cursor-pointer bg-neutral-100 hover:bg-neutral-200 text-[#0A0A0A] font-mono text-[10px] uppercase font-bold tracking-wider px-4 flex items-center justify-center rounded-[2px] border border-[#E5E5E5] transition-colors whitespace-nowrap">
                              Upload
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => handleImageUpload(e, (base64) => {
                                  const next = { ...tempSiteConfig, faviconUrl: base64 };
                                  setTempSiteConfig(next);
                                  onUpdateSiteConfig(next);
                                })} 
                              />
                            </label>
                          </div>
                        </div>

                        <div className="border-t border-[#E5E5E5] pt-6 my-6"></div>

                        {/* Page Section Controls Card */}
                        <div className="bg-[#FAFAFA] border border-[#E5E5E5] p-5 rounded-[4px] space-y-4">
                          <div>
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[#6B6B6B] font-bold block mb-1">
                              Section Module Controls
                            </span>
                            <h3 className="font-sans font-bold text-sm text-[#0A0A0A] tracking-tight m-0">
                              Active Page Modules
                            </h3>
                            <p className="font-sans text-[11px] text-[#6B6B6B] leading-normal mt-0.5 mb-2">
                              Toggle sections on or off to change your portfolio's layout in real-time.
                            </p>
                          </div>

                          <div className="divide-y divide-neutral-200/60 pt-1">
                            {[
                              { key: "work", title: "Selected Case Studies (Work)", desc: "Showcases horizontal-scrolling designer portfolio case studies." },
                              { key: "services", title: "Services & Scope (Capabilities)", desc: "Represents bullet scope cards & visual timeline targets." },
                              { key: "experience", title: "Work Experience Timeline", desc: "Lists agency collaborations and corporate milestones." },
                              { key: "faq", title: "Questions & Answers (FAQ)", desc: "Sleek accordion list detailing workflow alignments." },
                              { key: "about", title: "Detailed Biography (About)", desc: "Chronicles origin story, profile image, and core design manifesto." },
                              { key: "contact", title: "Contact Dialogue Banner", desc: "Minimalist black CTA card and direct inquiries handler." },
                            ].map((sec) => (
                              <div key={sec.key} className="flex items-center justify-between py-3 gap-4">
                                <div className="space-y-0.5">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-sans font-semibold text-xs text-[#0A0A0A]">
                                      {sec.title}
                                    </span>
                                    {visibility[sec.key as keyof SectionVisibility] ? (
                                      <span className="bg-emerald-50 text-emerald-700 text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-[2px] font-bold">
                                        ON
                                      </span>
                                    ) : (
                                      <span className="bg-neutral-100 text-[#6B6B6B] text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-[2px] font-bold">
                                        OFF
                                      </span>
                                    )}
                                  </div>
                                  <p className="font-sans text-[10px] text-[#6B6B6B] leading-tight m-0">
                                    {sec.desc}
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    onUpdateVisibility({
                                      ...visibility,
                                      [sec.key]: !visibility[sec.key as keyof SectionVisibility]
                                    });
                                  }}
                                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                    visibility[sec.key as keyof SectionVisibility] ? 'bg-[#0A0A0A]' : 'bg-[#E5E5E5]'
                                  }`}
                                  id={`toggle-sec-${sec.key}`}
                                >
                                  <span
                                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition duration-205 ease-in-out ${
                                      visibility[sec.key as keyof SectionVisibility] ? 'translate-x-4' : 'translate-x-0'
                                    }`}
                                  />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : activeTab === "projects" ? (
                    <>
                      <div className="flex items-center space-x-2 mb-2">
                        <Briefcase className="h-4 w-4 text-[#0a0a0a]" />
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#6B6B6B] font-bold block">
                          Case Studies Database
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <h2 className="font-sans font-bold text-[#0A0A0A] tracking-tighter text-3xl m-0">
                          Design & Builds Manager
                        </h2>
                        <button
                          type="button"
                          onClick={handleAddProject}
                          className="inline-flex items-center space-x-1.5 bg-[#0A0A0A] text-white hover:bg-neutral-800 font-mono text-[10px] font-bold px-3 py-2 rounded-[2px] uppercase select-none cursor-pointer"
                          id="btn-cms-add-project"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Add Case Study</span>
                        </button>
                      </div>
                      <p className="font-sans font-light text-xs text-[#6B6B6B] leading-relaxed mb-8 max-w-xl">
                        Select of any case studies to configure title, release dates, categories, illustrations, and overview insights. Instantly visualizes below and updates dynamically.
                      </p>

                      {/* Dropdown Project Selector / Active Buttons list */}
                      <div className="space-y-6">
                        <div className="flex flex-col space-y-1.5">
                          <label className="font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                            Select Project to Edit
                          </label>
                          <div className="flex gap-2">
                            <select
                              value={selectedProjectId}
                              onChange={(e) => setSelectedProjectId(e.target.value)}
                              className="flex-1 bg-white border border-[#E5E5E5] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none rounded-[2px] cursor-pointer"
                              id="cms-project-selector"
                            >
                              {tempProjects.map((p, idx) => (
                                <option key={p.id} value={p.id}>
                                  {(idx + 1).toString().padStart(2, "0")} — {p.title} ({p.year})
                                </option>
                              ))}
                            </select>

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => handleDeleteProject(selectedProjectId)}
                              className="p-3 border border-red-200 hover:border-red-500 text-red-600 hover:bg-red-50 rounded-[2px] transition-colors duration-200 flex items-center justify-center cursor-pointer"
                              title="Delete Selected Project"
                              style={{ minWidth: "44px" }}
                              id="btn-cms-delete-project"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {selectedProject && (
                          <div className="bg-neutral-50/50 p-6 border border-[#E5E5E5] space-y-5 rounded-[2px]" id={`nested-editor-${selectedProject.id}`}>
                            <span className="font-mono text-[10.5px] uppercase tracking-widest text-[#0A0A0A] font-extrabold block border-b border-[#E5E5E5] pb-2 mb-2">
                              Configure Target Parameters
                            </span>

                            {/* Case Project Title */}
                            <div className="flex flex-col space-y-1.5">
                              <label className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                                Case Title
                              </label>
                              <input
                                type="text"
                                value={selectedProject.title}
                                onChange={(e) => handleProjectFieldChange(selectedProject.id, "title", e.target.value)}
                                className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-2.5 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                                placeholder="e.g. Portfolio Website Setup"
                                id={`proj-title-${selectedProject.id}`}
                              />
                            </div>

                            {/* Two items side-by-side */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {/* Year */}
                              <div className="flex flex-col space-y-1.5">
                                <label className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                                  Release Year
                                </label>
                                <input
                                  type="text"
                                  value={selectedProject.year}
                                  onChange={(e) => handleProjectFieldChange(selectedProject.id, "year", e.target.value)}
                                  className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-2.5 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                                  placeholder="e.g. 2024"
                                  id={`proj-year-${selectedProject.id}`}
                                />
                              </div>

                              {/* Category */}
                              <div className="flex flex-col space-y-1.5">
                                <label className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                                  Visual Category
                                </label>
                                <input
                                  type="text"
                                  value={selectedProject.category}
                                  onChange={(e) => handleProjectFieldChange(selectedProject.id, "category", e.target.value)}
                                  className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-2.5 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                                  placeholder="e.g. Brand & Engineering"
                                  id={`proj-cat-${selectedProject.id}`}
                                />
                              </div>
                            </div>

                            {/* Image Placeholder URL */}
                            <div className="flex flex-col space-y-1.5">
                              <label className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                                Image Illustration URL
                              </label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={selectedProject.image}
                                  onChange={(e) => handleProjectFieldChange(selectedProject.id, "image", e.target.value)}
                                  className="flex-1 bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-2.5 font-sans text-xs text-[#0A0A0A] font-mono focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                                  placeholder="Image hyperlink..."
                                  id={`proj-image-${selectedProject.id}`}
                                />
                                <label className="cursor-pointer bg-neutral-100 hover:bg-neutral-200 text-[#0A0A0A] font-mono text-[9px] uppercase font-bold tracking-wider px-3 flex items-center justify-center rounded-[2px] border border-[#E5E5E5] transition-colors whitespace-nowrap">
                                  Upload
                                  <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={(e) => handleImageUpload(e, (base64) => handleProjectFieldChange(selectedProject.id, "image", base64))} 
                                  />
                                </label>
                              </div>
                            </div>

                            {/* Description Overview */}
                            <div className="flex flex-col space-y-1.5">
                              <label className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                                Design Insight Overview
                              </label>
                              <textarea
                                rows={3}
                                value={selectedProject.description}
                                onChange={(e) => handleProjectFieldChange(selectedProject.id, "description", e.target.value)}
                                className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-2.5 font-sans text-xs text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200 resize-none leading-relaxed"
                                placeholder="Introduce context overview..."
                                id={`proj-desc-${selectedProject.id}`}
                              />
                            </div>

                             {/* Demo URL */}
                            <div className="flex flex-col space-y-1.5">
                              <label className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                                Demo Project URL
                              </label>
                              <input
                                type="text"
                                value={selectedProject.demoUrl || ""}
                                onChange={(e) => handleProjectFieldChange(selectedProject.id, "demoUrl", e.target.value)}
                                className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-2.5 font-sans text-xs text-[#0A0A0A] font-mono focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                                placeholder="e.g. https://my-demo-website.com"
                                id={`proj-demourl-${selectedProject.id}`}
                              />
                            </div>

                            {/* Specifications: Location & Role */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="flex flex-col space-y-1.5">
                                <label className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                                  Project Location Specification
                                </label>
                                <input
                                  type="text"
                                  value={selectedProject.location || ""}
                                  onChange={(e) => handleProjectFieldChange(selectedProject.id, "location", e.target.value)}
                                  className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-2.5 font-sans text-xs text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                                  placeholder="e.g. ZURICH, CH"
                                  id={`proj-location-${selectedProject.id}`}
                                />
                              </div>

                              <div className="flex flex-col space-y-1.5">
                                <label className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                                  Project Execution Role
                                </label>
                                <input
                                  type="text"
                                  value={selectedProject.role || ""}
                                  onChange={(e) => handleProjectFieldChange(selectedProject.id, "role", e.target.value)}
                                  className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-2.5 font-sans text-xs text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                                  placeholder="e.g. VISUAL ENGINE"
                                  id={`proj-role-${selectedProject.id}`}
                                />
                              </div>
                            </div>
                            
                             {/* Color Mode Option (Warna Asli) */}
                            <div className="flex flex-col space-y-1.5 border border-[#E5E5E5] p-4 bg-[#FAFAFA] rounded-[2px]">
                              <label className="flex items-center gap-3 cursor-pointer select-none">
                                <input
                                  type="checkbox"
                                  checked={!!selectedProject.originalColor}
                                  onChange={(e) => handleProjectFieldChange(selectedProject.id, "originalColor", e.target.checked)}
                                  className="w-4 h-4 rounded-[2px] accent-black border-[#E5E5E5] cursor-pointer"
                                  id={`proj-color-${selectedProject.id}`}
                                />
                                <div className="space-y-0.5">
                                  <span className="font-sans text-xs font-semibold text-[#0A0A0A] uppercase tracking-wide block">
                                    Show Original Colors (Warna Asli)
                                  </span>
                                  <span className="font-mono text-[9px] text-[#6B6B6B] block">
                                    If checked, the case study images will present in full original color spectra instead of standard modernist grayscale.
                                  </span>
                                </div>
                              </label>
                            </div>

                            {/* Project Story/Narrative */}
                            <div className="flex flex-col space-y-1.5 align-baseline">
                              <label className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                                Full Project Story & Narrative
                              </label>
                              <textarea
                                rows={6}
                                value={selectedProject.story || ""}
                                onChange={(e) => handleProjectFieldChange(selectedProject.id, "story", e.target.value)}
                                className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-2.5 font-sans text-xs text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200 leading-relaxed"
                                placeholder="Write the full case study narrative, outlining client criteria, engineering process, typography goals and ultimate project accomplishments..."
                                id={`proj-story-${selectedProject.id}`}
                              />
                            </div>

                            {/* Project Gallery Images (CMS) */}
                            <div className="flex flex-col space-y-3 pt-2 text-[#0A0A0A]">
                              <div className="flex items-center justify-between border-b border-neutral-100 pb-1.5">
                                <label className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                                  Visual Gallery Images ({selectedProject.gallery?.length || 0})
                                </label>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const currentGallery = selectedProject.gallery || [];
                                    handleProjectGalleryChange(selectedProject.id, [...currentGallery, `https://picsum.photos/seed/new-gal-${Date.now()}/1000/750`]);
                                  }}
                                  className="font-mono text-[9px] text-[#0A0A0A] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                                >
                                  + Add Image URL
                                </button>
                              </div>

                              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                                {(selectedProject.gallery || []).map((imgUrl, gIdx) => (
                                  <div key={gIdx} className="flex gap-2 items-center">
                                    <div className="font-mono text-[9px] text-[#6B6B6B] w-6 text-right font-medium">
                                      #{String(gIdx + 1).padStart(2, '0')}
                                    </div>
                                    <div className="flex-1 flex gap-2">
                                      <input
                                        type="text"
                                        value={imgUrl}
                                        onChange={(e) => {
                                          const nextGallery = [...(selectedProject.gallery || [])];
                                          nextGallery[gIdx] = e.target.value;
                                          handleProjectGalleryChange(selectedProject.id, nextGallery);
                                        }}
                                        className="flex-1 bg-[#FFFFFF] border border-[#E5E5E5] px-2 py-1.5 font-sans text-[10px] text-[#0A0A0A] font-mono focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                                        placeholder="https://images.unsplash.com/..."
                                      />
                                      <label className="cursor-pointer bg-neutral-100 hover:bg-neutral-200 text-[#0A0A0A] font-mono text-[9px] uppercase font-bold tracking-wider px-2 flex items-center justify-center rounded-[2px] border border-[#E5E5E5] transition-colors whitespace-nowrap" title="Upload Image">
                                        Up
                                        <input 
                                          type="file" 
                                          accept="image/*" 
                                          className="hidden" 
                                          onChange={(e) => handleImageUpload(e, (base64) => {
                                            const nextGallery = [...(selectedProject.gallery || [])];
                                            nextGallery[gIdx] = base64;
                                            handleProjectGalleryChange(selectedProject.id, nextGallery);
                                          })} 
                                        />
                                      </label>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const nextGallery = (selectedProject.gallery || []).filter((_, i) => i !== gIdx);
                                        handleProjectGalleryChange(selectedProject.id, nextGallery);
                                      }}
                                      className="px-2 py-2 text-[10px] font-mono font-bold uppercase text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors cursor-pointer"
                                      title="Remove from gallery"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                ))}

                                {(!selectedProject.gallery || selectedProject.gallery.length === 0) && (
                                  <span className="font-sans text-xs italic text-neutral-400 block py-1.5 pl-6">
                                    No custom gallery images. Default placeholders will be displayed.
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  ) : activeTab === "services" ? (
                    <>
                      {/* SERVICES AND CAPABILITIES CMS CONTROLS */}
                      <div className="flex items-center space-x-2 mb-2">
                        <Wrench className="h-4 w-4 text-[#0a0a0a]" />
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#6B6B6B] font-bold block">
                          Service Capabilities & Rates
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <h2 className="font-sans font-bold text-[#0A0A0A] tracking-tighter text-3xl m-0">
                          Capabilities Manager
                        </h2>
                        <button
                          type="button"
                          onClick={handleAddService}
                          className="inline-flex items-center space-x-1.5 bg-[#0A0A0A] text-white hover:bg-neutral-800 font-mono text-[10px] font-bold px-3 py-2 rounded-[2px] uppercase select-none cursor-pointer"
                          id="btn-cms-add-service"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Add Capability</span>
                        </button>
                      </div>
                      <p className="font-sans font-light text-xs text-[#6B6B6B] leading-relaxed mb-8 max-w-xl">
                        Select any of your design or developer capabilities to configure title, icon, technologies, turnaround speed, and overview description.
                      </p>

                      <div className="space-y-6">
                        <div className="flex flex-col space-y-1.5">
                          <label className="font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                            Select Capability to Edit
                          </label>
                          <div className="flex gap-2">
                            <select
                              value={selectedServiceId}
                              onChange={(e) => setSelectedServiceId(e.target.value)}
                              className="flex-1 bg-white border border-[#E5E5E5] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none rounded-[2px] cursor-pointer"
                              id="cms-service-selector"
                            >
                              {tempServices.map((s, idx) => (
                                <option key={s.id} value={s.id}>
                                  {(idx + 1).toString().padStart(2, "0")} — {s.name} ({s.duration})
                                </option>
                              ))}
                            </select>

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => handleDeleteService(selectedServiceId)}
                              className="p-3 border border-red-200 hover:border-red-500 text-red-600 hover:bg-red-50 rounded-[2px] transition-colors duration-200 flex items-center justify-center cursor-pointer"
                              title="Delete Selected Capability"
                              style={{ minWidth: "44px" }}
                              id="btn-cms-delete-service"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {selectedService && (
                          <div className="bg-neutral-50/50 p-6 border border-[#E5E5E5] space-y-5 rounded-[2px]" id={`nested-service-editor-${selectedService.id}`}>
                            <span className="font-mono text-[10.5px] uppercase tracking-widest text-[#0A0A0A] font-extrabold block border-b border-[#E5E5E5] pb-2 mb-2">
                              Configure Target Parameters
                            </span>

                            {/* Service name */}
                            <div className="flex flex-col space-y-1.5">
                              <label className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                                Title / Capability Name
                              </label>
                              <input
                                type="text"
                                value={selectedService.name}
                                onChange={(e) => handleServiceFieldChange(selectedService.id, "name", e.target.value)}
                                className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-2.5 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                                placeholder="e.g. Design Architecture"
                                id={`service-name-${selectedService.id}`}
                              />
                            </div>

                            {/* Emoji Icon & Duration Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {/* Emoji Icon */}
                              <div className="flex flex-col space-y-1.5">
                                <label className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                                  Emoji Icon (e.g. 🖥️, 🌐, ⚡)
                                </label>
                                <input
                                  type="text"
                                  value={selectedService.icon}
                                  onChange={(e) => handleServiceFieldChange(selectedService.id, "icon", e.target.value)}
                                  className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-2.5 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                                  placeholder="🖥️"
                                  id={`service-icon-${selectedService.id}`}
                                />
                              </div>

                              {/* Duration */}
                              <div className="flex flex-col space-y-1.5">
                                <label className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                                  Typical Timeline (e.g. 2 - 3 weeks)
                                </label>
                                <input
                                  type="text"
                                  value={selectedService.duration}
                                  onChange={(e) => handleServiceFieldChange(selectedService.id, "duration", e.target.value)}
                                  className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-2.5 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                                  placeholder="2 - 3 weeks"
                                  id={`service-duration-${selectedService.id}`}
                                />
                              </div>
                            </div>

                            {/* Service technologies */}
                            <div className="flex flex-col space-y-1.5">
                              <label className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                                Tech / Tool Alignment
                              </label>
                              <input
                                type="text"
                                value={selectedService.tech}
                                onChange={(e) => handleServiceFieldChange(selectedService.id, "tech", e.target.value)}
                                className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-2.5 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                                placeholder="Built in React & Tailwind"
                                id={`service-tech-${selectedService.id}`}
                              />
                            </div>

                            {/* Description */}
                            <div className="flex flex-col space-y-1.5">
                              <label className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                                Capability Description
                              </label>
                              <textarea
                                rows={3}
                                value={selectedService.description}
                                onChange={(e) => handleServiceFieldChange(selectedService.id, "description", e.target.value)}
                                className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-2.5 font-sans text-xs text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200 resize-none leading-relaxed"
                                placeholder="Describe parameters & details..."
                                id={`service-desc-${selectedService.id}`}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  ) : activeTab === "experiences" ? (
                    <>
                      {/* EXPERIENCES CMS CONTROLS */}
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="h-4 w-4 text-[#0a0a0a]" />
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#6B6B6B] font-bold block">
                          Experience Timeline
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <h2 className="font-sans font-bold text-[#0A0A0A] tracking-tighter text-3xl m-0">
                          Work Experience
                        </h2>
                        <button
                          type="button"
                          onClick={handleAddExperience}
                          className="inline-flex items-center space-x-1.5 bg-[#0A0A0A] text-white hover:bg-neutral-800 font-mono text-[10px] font-bold px-3 py-2 rounded-[2px] uppercase select-none cursor-pointer"
                          id="btn-cms-add-exp"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Add Work</span>
                        </button>
                      </div>
                      <p className="font-sans font-light text-xs text-[#6B6B6B] leading-relaxed mb-8 max-w-xl">
                        Add, modify, or delete elements of your history timeline.
                      </p>

                      <div className="space-y-6">
                        <div className="flex flex-col space-y-1.5">
                          <label className="font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                            Select Work Item to Edit
                          </label>
                          <div className="flex gap-2">
                            <select
                              value={selectedExperienceId}
                              onChange={(e) => setSelectedExperienceId(e.target.value)}
                              className="flex-1 bg-white border border-[#E5E5E5] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none rounded-[2px] cursor-pointer"
                              id="cms-experience-selector"
                            >
                              {tempExperiences.map((exp, idx) => (
                                <option key={exp.id} value={exp.id}>
                                  {(idx + 1).toString().padStart(2, "0")} — {exp.role} at {exp.company}
                                </option>
                              ))}
                            </select>

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => handleDeleteExperience(selectedExperienceId)}
                              className="p-3 border border-red-200 hover:border-red-500 text-red-600 hover:bg-red-50 rounded-[2px] transition-colors duration-200 flex items-center justify-center cursor-pointer"
                              title="Delete Selected Work Item"
                              style={{ minWidth: "44px" }}
                              id="btn-cms-delete-exp"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {selectedExperience && (
                          <div className="bg-neutral-50/50 p-6 border border-[#E5E5E5] space-y-5 rounded-[2px]" id={`nested-exp-editor-${selectedExperience.id}`}>
                            <span className="font-mono text-[10.5px] uppercase tracking-widest text-[#0A0A0A] font-extrabold block border-b border-[#E5E5E5] pb-2 mb-2">
                              Work Parameters
                            </span>

                            {/* Role */}
                            <div className="flex flex-col space-y-1.5">
                              <label className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                                Job Role
                              </label>
                              <input
                                type="text"
                                value={selectedExperience.role}
                                onChange={(e) => handleExperienceFieldChange(selectedExperience.id, "role", e.target.value)}
                                className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-2.5 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                                placeholder="e.g. Lead Designer"
                              />
                            </div>

                            {/* Company & Years */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="flex flex-col space-y-1.5">
                                <label className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                                  Company Name
                                </label>
                                <input
                                  type="text"
                                  value={selectedExperience.company}
                                  onChange={(e) => handleExperienceFieldChange(selectedExperience.id, "company", e.target.value)}
                                  className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-2.5 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                                  placeholder="e.g. Linear Design"
                                />
                              </div>
                              <div className="flex flex-col space-y-1.5">
                                <label className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                                  Years (e.g. 2022 - 2024)
                                </label>
                                <input
                                  type="text"
                                  value={selectedExperience.years}
                                  onChange={(e) => handleExperienceFieldChange(selectedExperience.id, "years", e.target.value)}
                                  className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-2.5 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                                  placeholder="e.g. 2022 – 2024"
                                />
                              </div>
                            </div>

                            {/* Description */}
                            <div className="flex flex-col space-y-1.5">
                              <label className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                                Work Description
                              </label>
                              <textarea
                                rows={3}
                                value={selectedExperience.desc || ""}
                                onChange={(e) => handleExperienceFieldChange(selectedExperience.id, "desc", e.target.value)}
                                className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-2.5 font-sans text-xs text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200 resize-none leading-relaxed"
                                placeholder="Details of your achievements..."
                              />
                            </div>

                            {/* Company Logo URL */}
                            <div className="flex flex-col space-y-1.5">
                              <label className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                                Company Logo Image URL
                              </label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={selectedExperience.logoUrl || ""}
                                  onChange={(e) => handleExperienceFieldChange(selectedExperience.id, "logoUrl", e.target.value)}
                                  className="flex-1 bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-2.5 font-sans text-xs text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                                  placeholder="e.g. https://picsum.photos/seed/company-logo/100/100"
                                />
                                <label className="cursor-pointer bg-neutral-100 hover:bg-neutral-200 text-[#0A0A0A] font-mono text-[9px] uppercase font-bold tracking-wider px-3 flex items-center justify-center rounded-[2px] border border-[#E5E5E5] transition-colors whitespace-nowrap">
                                  Upload
                                  <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={(e) => handleImageUpload(e, (base64) => handleExperienceFieldChange(selectedExperience.id, "logoUrl", base64))} 
                                  />
                                </label>
                              </div>
                              <p className="font-mono text-[8.5px] text-[#6B6B6B] leading-normal">
                                TIP: Enter an image address. If left blank, it will show a clean fallback badge with the company's first two letters. Recommended: grayscale icons.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  ) : activeTab === "faqs" ? (
                    <>
                      {/* FAQS CMS CONTROLS */}
                      <div className="flex items-center space-x-2 mb-2">
                        <HelpCircle className="h-4 w-4 text-[#0a0a0a]" />
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#6B6B6B] font-bold block">
                          FAQs & Policies Settings
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <h2 className="font-sans font-bold text-[#0A0A0A] tracking-tighter text-3xl m-0">
                          FAQ Manager
                        </h2>
                        <button
                          type="button"
                          onClick={handleAddFaq}
                          className="inline-flex items-center space-x-1.5 bg-[#0A0A0A] text-white hover:bg-neutral-800 font-mono text-[10px] font-bold px-3 py-2 rounded-[2px] uppercase select-none cursor-pointer"
                          id="btn-cms-add-faq"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Add FAQ</span>
                        </button>
                      </div>
                      <p className="font-sans font-light text-xs text-[#6B6B6B] leading-relaxed mb-8 max-w-xl">
                        Map questions and answers of your operations and policies.
                      </p>

                      <div className="space-y-6">
                        <div className="flex flex-col space-y-1.5">
                          <label className="font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                            Select FAQ to Edit
                          </label>
                          <div className="flex gap-2">
                            <select
                              value={selectedFaqId}
                              onChange={(e) => setSelectedFaqId(e.target.value)}
                              className="flex-1 bg-white border border-[#E5E5E5] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none rounded-[2px] cursor-pointer"
                              id="cms-faq-selector"
                            >
                              {tempFaqs.map((f, idx) => (
                                <option key={f.id} value={f.id}>
                                  {(idx + 1).toString().padStart(2, "0")} — {f.question}
                                </option>
                              ))}
                            </select>

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => handleDeleteFaq(selectedFaqId)}
                              className="p-3 border border-red-200 hover:border-red-500 text-red-600 hover:bg-red-50 rounded-[2px] transition-colors duration-200 flex items-center justify-center cursor-pointer"
                              title="Delete Selected FAQ Item"
                              style={{ minWidth: "44px" }}
                              id="btn-cms-delete-faq"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {selectedFaq && (
                          <div className="bg-neutral-50/50 p-6 border border-[#E5E5E5] space-y-5 rounded-[2px]" id={`nested-faq-editor-${selectedFaq.id}`}>
                            <span className="font-mono text-[10.5px] uppercase tracking-widest text-[#0A0A0A] font-extrabold block border-b border-[#E5E5E5] pb-2 mb-2">
                              FAQ Fields
                            </span>

                            {/* Question */}
                            <div className="flex flex-col space-y-1.5">
                              <label className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                                Question
                              </label>
                              <input
                                type="text"
                                value={selectedFaq.question}
                                onChange={(e) => handleFaqFieldChange(selectedFaq.id, "question", e.target.value)}
                                className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-2.5 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                                placeholder="Enter Question text..."
                              />
                            </div>

                            {/* Answer */}
                            <div className="flex flex-col space-y-1.5">
                              <label className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                                Answer
                              </label>
                              <textarea
                                rows={4}
                                value={selectedFaq.answer}
                                onChange={(e) => handleFaqFieldChange(selectedFaq.id, "answer", e.target.value)}
                                className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-2.5 font-sans text-xs text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200 resize-none leading-relaxed"
                                placeholder="Enter Detailed answer text..."
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  ) : activeTab === "about" ? (
                    <>
                      {/* BIOGRAPHY CMS CONTROLS */}
                      <div className="flex items-center space-x-2 mb-2">
                        <User className="h-4 w-4 text-[#0a0a0a]" />
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#6B6B6B] font-bold block">
                          Bio & Creative Origin
                        </span>
                      </div>
                      <h2 className="font-sans font-bold text-[#0A0A0A] tracking-tighter text-3xl mb-4 m-0">
                        Biography Configurations
                      </h2>
                      <p className="font-sans font-light text-xs text-[#6B6B6B] leading-relaxed mb-8 max-w-xl">
                        Configure information representing yourself, including portrait photo, philosophy context, and social bookmarks.
                      </p>

                      <div className="space-y-6">
                        {/* Title & Subtitle */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col space-y-1.5">
                            <label className="font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                              Biography Title
                            </label>
                            <input
                              type="text"
                              value={tempAbout.title}
                              onChange={(e) => handleAboutFieldChange("title", e.target.value)}
                              className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                              placeholder="e.g. About Alex"
                            />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <label className="font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                              Biography Mini Tag
                            </label>
                            <input
                              type="text"
                              value={tempAbout.subtitle}
                              onChange={(e) => handleAboutFieldChange("subtitle", e.target.value)}
                              className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                              placeholder="e.g. 05 // BIO & CREATIVE ORIGIN"
                            />
                          </div>
                        </div>

                        {/* Image URL */}
                        <div className="flex flex-col space-y-1.5">
                          <label className="font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                            Portrait Image URL
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={tempAbout.imageUrl}
                              onChange={(e) => handleAboutFieldChange("imageUrl", e.target.value)}
                              className="flex-1 bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-3 font-sans text-xs text-[#0A0A0A] font-mono focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                              placeholder="Image URL..."
                            />
                            <label className="cursor-pointer bg-neutral-100 hover:bg-neutral-200 text-[#0A0A0A] font-mono text-[10px] uppercase font-bold tracking-wider px-4 flex items-center justify-center rounded-[2px] border border-[#E5E5E5] transition-colors whitespace-nowrap">
                              Upload
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => handleImageUpload(e, (base64) => handleAboutFieldChange("imageUrl", base64))} 
                              />
                            </label>
                          </div>
                        </div>

                        {/* Bio Paragraph */}
                        <div className="flex flex-col space-y-1.5">
                          <label className="font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                            Main Bio Statement
                          </label>
                          <textarea
                            rows={4}
                            value={tempAbout.bioPara}
                            onChange={(e) => handleAboutFieldChange("bioPara", e.target.value)}
                            className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200 resize-none leading-relaxed"
                            placeholder="Introduce yourself..."
                          />
                        </div>

                        {/* Philosophy label */}
                        <div className="flex flex-col space-y-1.5">
                          <label className="font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                            Philosophy Summary Header
                          </label>
                          <input
                            type="text"
                            value={tempAbout.philosophyLabel}
                            onChange={(e) => handleAboutFieldChange("philosophyLabel", e.target.value)}
                            className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                            placeholder="e.g. Core Philosophy:"
                          />
                        </div>

                        {/* Philosophy Text */}
                        <div className="flex flex-col space-y-1.5">
                          <label className="font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                            Philosophy Explanation Block
                          </label>
                          <textarea
                            rows={3}
                            value={tempAbout.philosophyText}
                            onChange={(e) => handleAboutFieldChange("philosophyText", e.target.value)}
                            className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200 resize-none leading-relaxed"
                            placeholder="Explain philosophy details..."
                          />
                        </div>

                        {/* Social Link Coordinates */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col space-y-1.5">
                            <label className="font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                              Social Platform Label
                            </label>
                            <input
                              type="text"
                              value={tempAbout.xLinkLabel}
                              onChange={(e) => handleAboutFieldChange("xLinkLabel", e.target.value)}
                              className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                              placeholder="e.g. Find me on X"
                            />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <label className="font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                              Social Profile Link
                            </label>
                            <input
                              type="text"
                              value={tempAbout.xLink}
                              onChange={(e) => handleAboutFieldChange("xLink", e.target.value)}
                              className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-3 font-sans text-xs text-[#0A0A0A] font-mono focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                              placeholder="https://x.com/..."
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : activeTab === "contact" ? (
                    <>
                      {/* CONTACT BANNER CMS CONTROLS */}
                      <div className="flex items-center space-x-2 mb-2">
                        <Mail className="h-4 w-4 text-[#0a0a0a]" />
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#6B6B6B] font-bold block">
                          Initiate Dialogue Banner
                        </span>
                      </div>
                      <h2 className="font-sans font-bold text-[#0A0A0A] tracking-tighter text-3xl mb-4 m-0">
                        Contact Call-To-Action Block
                      </h2>
                      <p className="font-sans font-light text-xs text-[#6B6B6B] leading-relaxed mb-8 max-w-xl">
                        Parameterize section 06 dialogue block, including headline message, description, and copyable email targets.
                      </p>

                      <div className="space-y-6">
                        {/* Label tag */}
                        <div className="flex flex-col space-y-1.5">
                          <label className="font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                            Visual Top Tag
                          </label>
                          <input
                            type="text"
                            value={tempContact.label}
                            onChange={(e) => handleContactFieldChange("label", e.target.value)}
                            className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                            placeholder="e.g. 06 // INITIATE DIALOGUE"
                          />
                        </div>

                        {/* Title Heading */}
                        <div className="flex flex-col space-y-1.5">
                          <label className="font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                            Headline Callout
                          </label>
                          <textarea
                            rows={2}
                            value={tempContact.heading}
                            onChange={(e) => handleContactFieldChange("heading", e.target.value)}
                            className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200 resize-none leading-relaxed"
                            placeholder="Callout text..."
                          />
                        </div>

                        {/* Description message */}
                        <div className="flex flex-col space-y-1.5">
                          <label className="font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                            Dialogue Brief Description
                          </label>
                          <textarea
                            rows={3}
                            value={tempContact.subtext}
                            onChange={(e) => handleContactFieldChange("subtext", e.target.value)}
                            className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200 resize-none leading-relaxed"
                            placeholder="Description block..."
                          />
                        </div>

                        {/* Email address settings */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col space-y-1.5">
                            <label className="font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                              Primary Email Target
                            </label>
                            <input
                              type="email"
                              value={tempContact.email}
                              onChange={(e) => handleContactFieldChange("email", e.target.value)}
                              className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                              placeholder="e.g. hello@alexreyes.com"
                            />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <label className="font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                              CTA Email Label
                            </label>
                            <input
                              type="text"
                              value={tempContact.emailLabel}
                              onChange={(e) => handleContactFieldChange("emailLabel", e.target.value)}
                              className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-4 py-3 font-sans text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                              placeholder="Label on the button..."
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* SOCIALS CMS CONTROLS */}
                      <div className="flex items-center space-x-2 mb-2">
                        <Sliders className="h-4 w-4 text-[#0a0a0a]" />
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#6B6B6B] font-bold block">
                          Footer Social Links
                        </span>
                      </div>
                      <h2 className="font-sans font-bold text-[#0A0A0A] tracking-tighter text-3xl mb-4 m-0">
                        Social Media Channels
                      </h2>
                      <p className="font-sans font-light text-xs text-[#6B6B6B] leading-relaxed mb-8 max-w-xl">
                        Add, toggle active states, modify, or delete links displayed in the footer.
                      </p>

                      <div className="space-y-6">
                        {tempSocialLinks.map((link, idx) => (
                          <div key={link.id} className="p-4 border border-[#E5E5E5] bg-neutral-50 rounded-[2px] space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                                Social #{idx + 1}
                              </span>
                              <div className="flex items-center space-x-3">
                                {/* Toggle On/Off State */}
                                <button
                                  type="button"
                                  onClick={() => handleSocialLinkFieldChange(link.id, "isEnabled", !link.isEnabled)}
                                  className={`font-mono text-[9px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-[2px] border transition-colors cursor-pointer select-none ${
                                    link.isEnabled 
                                      ? "bg-[#0A0A0A] border-[#0A0A0A] text-white" 
                                      : "bg-white border-neutral-200 text-neutral-400"
                                  }`}
                                >
                                  {link.isEnabled ? "ON // ENABLED" : "OFF // DISABLED"}
                                </button>
                                {/* Delete Social Option */}
                                <button
                                  type="button"
                                  onClick={() => handleDeleteSocialLink(link.id)}
                                  className="text-neutral-450 hover:text-red-650 transition-colors cursor-pointer p-1"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="flex flex-col space-y-1.5">
                                <label className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                                  Link Name
                                </label>
                                <input
                                  type="text"
                                  value={link.name}
                                  onChange={(e) => handleSocialLinkFieldChange(link.id, "name", e.target.value)}
                                  className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-3 py-2 font-sans text-xs text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                                  placeholder="e.g. Instagram"
                                />
                              </div>
                              <div className="flex flex-col space-y-1.5">
                                <label className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                                  URL Address
                                </label>
                                <input
                                  type="text"
                                  value={link.url}
                                  onChange={(e) => handleSocialLinkFieldChange(link.id, "url", e.target.value)}
                                  className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-3 py-2 font-sans text-xs text-[#0A0A0A] font-mono focus:border-[#0A0A0A] focus:outline-none transition-colors duration-200"
                                  placeholder="e.g. https://instagram.com/..."
                                />
                              </div>
                            </div>
                          </div>
                        ))}

                        {tempSocialLinks.length === 0 && (
                          <div className="text-center py-6 border border-dashed border-neutral-200 text-neutral-400 text-xs font-sans">
                            No social media channels configured.
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={handleAddSocialLink}
                          className="w-full flex items-center justify-center space-x-1.5 border border-dashed border-[#0A0A0A] text-[#0A0A0A] hover:bg-neutral-50 font-sans font-medium text-xs uppercase tracking-wider py-3.5 transition-colors duration-200 cursor-pointer select-none"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Add New Social Media</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Dashboard Action Triggers */}
                <div className="pt-8 border-t border-[#E5E5E5] mt-12 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Reset button */}
                    <button
                      type="button"
                      onClick={handleResetToDefault}
                      className="flex items-center justify-center space-x-1.5 bg-transparent border border-[#E5E5E5] text-[#6B6B6B] hover:text-[#0A0A0A] hover:border-[#0A0A0A] font-sans font-medium text-xs uppercase tracking-wider py-4 transition-colors duration-200 cursor-pointer select-none"
                      style={{ minHeight: "44px" }}
                      id="btn-cms-reset"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>Use Defaults</span>
                    </button>

                    {/* Apply changes button */}
                    <button
                      type="button"
                      onClick={handleSave}
                      className="flex items-center justify-center space-x-1.5 bg-[#0A0A0A] text-[#FFFFFF] hover:bg-neutral-800 font-sans font-medium text-xs uppercase tracking-wider py-4 transition-colors duration-200 cursor-pointer shadow-sm select-none"
                      style={{ minHeight: "44px" }}
                      id="btn-cms-save"
                    >
                      <Check className="h-4 w-4 text-white" />
                      <span>Apply Changes</span>
                    </button>
                  </div>

                  <AnimatePresence>
                    {saveSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-emerald-600 font-mono text-xs font-bold text-center flex items-center justify-center space-x-2 bg-emerald-50 rounded py-2.5 border border-emerald-100"
                        id="cms-save-success-feedback"
                      >
                        <Check className="h-4 w-4" />
                        <span>Changes Saved Successfully!</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Column: Live Typographic Sandbox Preview */}
              <div className="flex flex-col space-y-6">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#6B6B6B] font-bold block">
                  Interactive Live Render Sandbox
                </span>

                {activeTab === "hero" ? (
                  /* Hero Preview and Section Active Map */
                  <div className="flex flex-col space-y-4">
                    <div className="bg-white border border-[#E5E5E5] p-8 md:p-10 flex flex-col justify-between align-middle rounded-[2px] relative overflow-hidden shadow-sm">
                      {/* Miniature Header */}
                      <div className="flex justify-between items-center pb-6 border-b border-neutral-100">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-bold">
                          A. Reyes - Live Hero Mirror
                        </span>
                        <div className="flex space-x-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-400"></span>
                          <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                          <span className="w-2 h-2 rounded-full bg-green-400"></span>
                        </div>
                      </div>

                      {/* Sandboxed Section 00 */}
                      <div className="py-8 my-auto space-y-6">
                        <span className="font-sans text-[10px] uppercase tracking-widest text-[#6B6B6B] font-semibold block">
                          {tempContent.topLabel || "[NO LABEL]"}
                        </span>
                        <h1 
                          style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.3rem)" }} 
                          className="font-sans font-extrabold tracking-tighter leading-none text-[#0A0A0A] m-0"
                        >
                          {tempContent.headline || "[NO HEADLINE]"}
                        </h1>
                        <p className="font-sans text-xs text-[#6B6B6B] leading-relaxed">
                          {tempContent.bannerText ? (
                            parseBoldText(tempContent.bannerText)
                          ) : (
                            <>
                              Designing full-time @<strong className="text-[#0A0A0A] font-semibold">{tempContent.companyName || "..."}</strong>. Accepting freelance opportunities for <strong className="text-[#0A0A0A] font-semibold">{tempContent.freelanceMonth || "..."}</strong>.
                            </>
                          )}
                        </p>
                      </div>

                      {/* Sandbox CTA Footer */}
                      <div className="pt-6 border-t border-neutral-100 text-[10px] font-mono text-[#6B6B6B] flex justify-between items-center">
                        <span>STATUS: HERO PREVIEW</span>
                        <span className="text-emerald-600 font-semibold animate-pulse block">● LIVE MIRROR</span>
                      </div>
                    </div>

                    {/* Active Sections Visualizer Card */}
                    <div className="bg-[#FAF9F6] border border-[#E5E5E5] p-5 rounded-[2px] shadow-xs">
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 animate-pulse animate-none"></span>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[#0A0A0A] font-bold">
                          Primary View Architecture Layout Map
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="bg-[#0A0A0A] text-white py-1.5 px-3 rounded-[1px] font-mono text-[9px] uppercase select-none flex justify-between items-center animate-none">
                          <span>00 // Hero Greeting Banner</span>
                          <span className="text-emerald-400 font-bold text-[8px] tracking-wider">● ALWAYS ON</span>
                        </div>
                        {[
                          { key: "work", label: "01 // Selected Case Studies (Work)" },
                          { key: "services", label: "02 // Services & Scope" },
                          { key: "experience", label: "03 // Work Experience" },
                          { key: "faq", label: "04 // Questions & Answers" },
                          { key: "about", label: "05 // Biography & About" },
                          { key: "contact", label: "06 // Dialogue & Contact Banner" },
                        ].map((item) => {
                          const isVisible = visibility[item.key as keyof SectionVisibility];
                          return (
                            <div 
                              key={item.key} 
                              className={`py-1.5 px-3 rounded-[1px] font-mono text-[9px] uppercase select-none flex justify-between items-center transition-all duration-300 ${
                                isVisible 
                                  ? "bg-[#FFFFFF] border border-[#E5E5E5] text-[#0A0A0A]" 
                                  : "bg-neutral-100 border border-neutral-200 text-neutral-400 line-through opacity-70"
                              }`}
                            >
                              <span>{item.label}</span>
                              {isVisible ? (
                                <span className="text-emerald-600 font-bold text-[8px] tracking-wider">● ON</span>
                              ) : (
                                <span className="text-neutral-400 font-bold text-[8px] tracking-wider">○ OFF</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : activeTab === "projects" ? (
                  /* Projects Grid Preview - Custom Matching Design Reference */
                  <div className="bg-white border border-[#E5E5E5] p-4 md:p-5 flex flex-col justify-between rounded-[2px] relative overflow-hidden shadow-sm h-fit">
                    {/* Miniature Header */}
                    <div className="flex justify-between items-center pb-3 border-b border-neutral-100 mb-4 font-medium">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-bold">
                        A. Reyes - Live Case Studies Mirror
                      </span>
                      <div className="flex space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#E5E5E5]"></span>
                        <span className="w-2 h-2 rounded-full bg-[#D5D5D5]"></span>
                        <span className="w-2 h-2 rounded-full bg-[#A5A5A5]"></span>
                      </div>
                    </div>

                    {/* Designer Header Inspired by Reference Image */}
                    <div className="mb-4 text-left">
                      <span className="font-mono text-[8.5px] uppercase tracking-widest text-[#6B6B6B] block mb-1 font-bold">
                        01 // DESIGN & BUILDS
                      </span>
                      <h3 className="font-sans font-extrabold text-[#0A0A0A] tracking-tighter text-xl m-0 leading-tight">
                        Selected Case Studies
                      </h3>
                    </div>

                    {/* Miniature Portfolio Grid (3 Columns, 2 Rows without unnecessary heights or scrollbars) */}
                    <div className="w-full mb-2">
                      <div className="grid grid-cols-3 gap-x-3 gap-y-4" id="project-grid-sandbox">
                        {tempProjects.map((p, idx) => {
                          const isChosen = p.id === selectedProjectId;
                          const formattedIndex = String(idx + 1).padStart(2, '0');
                          return (
                            <div 
                              key={p.id} 
                              onClick={() => setSelectedProjectId(p.id)}
                              draggable
                              onDragStart={(e) => handleDragStart(e, "projects", idx)}
                              onDragOver={handleDragOver}
                              onDrop={(e) => handleDrop(e, "projects", idx)}
                              className={`group flex flex-col cursor-pointer transition-all duration-300 text-left relative ${draggedItem?.type === 'projects' && draggedItem.index === idx ? 'opacity-50' : ''}`}
                            >
                              {/* Image Container with Absolute Index Badge */}
                              <div 
                                className={`relative aspect-[4/3] w-full rounded-[3px] bg-[#FAF9F6] overflow-hidden border transition-all duration-300 ${
                                  isChosen 
                                    ? "border-[#0A0A0A] ring-2 ring-[#0A0A0A]/10 shadow-sm" 
                                    : "border-neutral-200/50 group-hover:border-neutral-400"
                                }`}
                              >
                                <img 
                                  src={p.image} 
                                  className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-[1.03]" 
                                  referrerPolicy="no-referrer" 
                                  alt={p.title || ""} 
                                />
                                
                                {/* Overlay Index Badge */}
                                <div className="absolute top-1.5 left-1.5 bg-white border border-neutral-100 px-1.5 py-0.5 text-[7px] font-mono tracking-tight text-[#0A0A0A] font-extrabold rounded-[1px] shadow-xs select-none z-10">
                                  {formattedIndex}
                                </div>

                                {/* Selected Indicator Ribbon */}
                                {isChosen && (
                                  <div className="absolute bottom-1 right-1 bg-[#0A0A0A] text-white font-mono text-[5.5px] font-extrabold px-1.5 py-0.5 rounded-[1px] uppercase tracking-wider z-10 shadow-sm">
                                    editing
                                  </div>
                                )}
                              </div>

                              {/* Title and Metadata Details (Matched to Reference, Highly Compact) */}
                              <div className="mt-2 flex justify-between items-baseline gap-1.5">
                                <h4 className="font-sans font-bold text-[9.5px] text-[#0A0A0A] tracking-tight truncate m-0">
                                  {p.title || "[No Title]"}
                                </h4>
                                <span className="font-sans text-[8px] text-[#6B6B6B] font-light shrink-0">
                                  {p.year}
                                </span>
                              </div>
                              <p className="font-mono text-[7px] text-[#6B6B6B] uppercase tracking-wider truncate mt-0.5 m-0 font-medium">
                                {p.category}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Sandbox CTA Footer */}
                    <div className="pt-3 border-t border-neutral-100 text-[9px] font-mono text-[#6B6B6B] flex justify-between items-center mt-3">
                      <span>PROJECTS COUNT: {tempProjects.length}</span>
                      <span className="text-emerald-600 font-semibold animate-pulse block">● GRID READY</span>
                    </div>
                  </div>
                ) : activeTab === "services" ? (
                  /* Services List Preview */
                  <div className="flex-1 bg-white border border-[#E5E5E5] p-8 md:p-10 flex flex-col justify-between align-middle rounded-[2px] relative overflow-hidden shadow-sm">
                    {/* Miniature Header */}
                    <div className="flex justify-between items-center pb-6 border-b border-neutral-100 mb-4">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-bold">
                        A. Reyes - Capabilities Mirror
                      </span>
                      <div className="flex space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#E5E5E5]"></span>
                        <span className="w-2 h-2 rounded-full bg-[#D5D5D5]"></span>
                        <span className="w-2 h-2 rounded-full bg-[#A5A5A5]"></span>
                      </div>
                    </div>

                    {/* Miniature Services Grid */}
                    <div className="flex-1 overflow-y-auto space-y-6 max-h-[380px] pr-1.5 scrollbar-thin">
                      {tempServices.map((s, idx) => {
                        const isChosen = s.id === selectedServiceId;
                        return (
                          <div 
                            key={s.id} 
                            onClick={() => setSelectedServiceId(s.id)}
                            draggable
                            onDragStart={(e) => handleDragStart(e, "services", idx)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, "services", idx)}
                            className={`p-3 border rounded-[4px] cursor-pointer transition-all duration-200 text-left ${
                              draggedItem?.type === 'services' && draggedItem.index === idx ? 'opacity-50 ' : ''
                            }${
                              isChosen 
                                ? "border-[#0A0A0A] bg-neutral-50 shadow-xs" 
                                : "border-neutral-200 hover:border-neutral-400"
                            }`}
                          >
                            <div className="flex gap-3">
                              <div className="w-10 h-10 rounded-[2px] bg-neutral-100 flex items-center justify-center font-sans text-lg border border-neutral-200 shrink-0">
                                {s.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                  <h4 className="font-sans font-bold text-xs text-[#0A0A0A] truncate">{s.name || "[No Name]"}</h4>
                                  <span className="font-mono text-[9px] text-[#6B6B6B] shrink-0">{s.duration}</span>
                                </div>
                                <p className="font-mono text-[9px] text-[#6B6B6B] uppercase truncate mb-1">{s.tech}</p>
                                <p className="font-sans text-[10px] text-neutral-500 line-clamp-1">{s.description}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Sandbox CTA Footer */}
                    <div className="pt-6 border-t border-neutral-100 text-[10px] font-mono text-[#6B6B6B] flex justify-between items-center mt-4">
                      <span>CAPABILITIES COUNT: {tempServices.length}</span>
                      <span className="text-emerald-600 font-semibold animate-pulse block">● ACTIVE SPEED</span>
                    </div>
                  </div>
                ) : activeTab === "experiences" ? (
                  /* Experiences Timeline Preview */
                  <div className="flex-1 bg-white border border-[#E5E5E5] p-8 md:p-10 flex flex-col justify-between align-middle rounded-[2px] relative overflow-hidden shadow-sm">
                    {/* Miniature Header */}
                    <div className="flex justify-between items-center pb-6 border-b border-neutral-100 mb-4">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-bold">
                        A. Reyes - Work History Mirror
                      </span>
                      <div className="flex space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#E5E5E5]"></span>
                        <span className="w-2 h-2 rounded-full bg-[#D5D5D5]"></span>
                        <span className="w-2 h-2 rounded-full bg-[#A5A5A5]"></span>
                      </div>
                    </div>

                    {/* Miniature Experience Timeline */}
                    <div className="flex-1 overflow-y-auto space-y-5 max-h-[380px] pr-1.5 scrollbar-thin text-left">
                      {tempExperiences.map((exp, idx) => {
                        const isChosen = exp.id === selectedExperienceId;
                        return (
                          <div
                            key={exp.id}
                            onClick={() => setSelectedExperienceId(exp.id)}
                            draggable
                            onDragStart={(e) => handleDragStart(e, "experiences", idx)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, "experiences", idx)}
                            className={`p-3.5 border rounded-[2px] transition-all duration-200 cursor-pointer ${
                              draggedItem?.type === 'experiences' && draggedItem.index === idx ? 'opacity-50 ' : ''
                            }${
                              isChosen
                                ? "border-[#0A0A0A] bg-neutral-50"
                                : "border-neutral-100 hover:border-neutral-300"
                            }`}
                          >
                            <span className="font-mono text-[9px] uppercase text-[#6B6B6B] block mb-1">
                              {exp.years}
                            </span>
                            <div className="flex justify-between items-start">
                              <h4 className="font-sans font-bold text-xs text-[#0A0A0A]">
                                {exp.role || "[Untitled Role]"}
                              </h4>
                              <span className="font-sans text-[10px] text-[#6B6B6B] font-medium bg-neutral-100 px-1.5 py-0.5 rounded-[2px] shrink-0 ml-2">
                                {exp.company}
                              </span>
                            </div>
                            <p className="font-sans text-[10px] text-neutral-500 mt-2 leading-relaxed line-clamp-2">
                              {exp.desc}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Sandbox CTA Footer */}
                    <div className="pt-6 border-t border-neutral-100 text-[10px] font-mono text-[#6B6B6B] flex justify-between items-center mt-4">
                      <span>HISTORY CHRONICLES: {tempExperiences.length}</span>
                      <span className="text-emerald-600 font-semibold animate-pulse block">● TIMELINE LIVE</span>
                    </div>
                  </div>
                ) : activeTab === "faqs" ? (
                  /* FAQs & Policies Accordion Preview */
                  <div className="flex-1 bg-white border border-[#E5E5E5] p-8 md:p-10 flex flex-col justify-between align-middle rounded-[2px] relative overflow-hidden shadow-sm">
                    {/* Miniature Header */}
                    <div className="flex justify-between items-center pb-6 border-b border-neutral-100 mb-4">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-bold">
                        A. Reyes - Policy & FAQ Mirror
                      </span>
                      <div className="flex space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#E5E5E5]"></span>
                        <span className="w-2 h-2 rounded-full bg-[#D5D5D5]"></span>
                        <span className="w-2 h-2 rounded-full bg-[#A5A5A5]"></span>
                      </div>
                    </div>

                    {/* Miniature FAQ List */}
                    <div className="flex-1 overflow-y-auto space-y-3 max-h-[380px] pr-1.5 scrollbar-thin text-left">
                      {tempFaqs.map((faq, idx) => {
                        const isChosen = faq.id === selectedFaqId;
                        const isPreviewOpen = previewFaqOpenId === faq.id || (previewFaqOpenId === null && isChosen);
                        return (
                          <div
                            key={faq.id}
                            onClick={() => {
                              setSelectedFaqId(faq.id);
                              setPreviewFaqOpenId(faq.id);
                            }}
                            draggable
                            onDragStart={(e) => handleDragStart(e, "faqs", idx)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, "faqs", idx)}
                            className={`p-3 border rounded-[2px] transition-all duration-200 cursor-pointer ${
                              draggedItem?.type === 'faqs' && draggedItem.index === idx ? 'opacity-50 ' : ''
                            }${
                              isChosen ? "border-[#0A0A0A]" : "border-neutral-100 hover:border-neutral-300"
                            } ${isPreviewOpen ? "bg-neutral-50/55" : ""}`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-sans font-bold text-xs text-[#0A0A0A] line-clamp-1 pr-4">
                                {faq.question || "[Untitled Question]"}
                              </span>
                              <Plus className={`h-3 w-3 shrink-0 text-neutral-500 transition-transform duration-200 ${isPreviewOpen ? "rotate-45" : ""}`} />
                            </div>
                            {isPreviewOpen && (
                              <p className="font-sans text-[10px] text-neutral-500 mt-2.5 leading-relaxed">
                                {faq.answer || "[No Answer Compiled]"}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Sandbox CTA Footer */}
                    <div className="pt-6 border-t border-neutral-100 text-[10px] font-mono text-[#6B6B6B] flex justify-between items-center mt-4">
                      <span>COMPILED QUESTIONS: {tempFaqs.length}</span>
                      <span className="text-emerald-600 font-semibold animate-pulse block">● POLICY SYNCED</span>
                    </div>
                  </div>
                ) : activeTab === "about" ? (
                  /* Biography & About Profile Preview */
                  <div className="flex-1 bg-white border border-[#E5E5E5] p-8 md:p-10 flex flex-col justify-between align-middle rounded-[2px] relative overflow-hidden shadow-sm">
                    {/* Miniature Header */}
                    <div className="flex justify-between items-center pb-6 border-b border-neutral-100 mb-4">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-bold">
                        A. Reyes - Bio Mirror
                      </span>
                      <div className="flex space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#E5E5E5]"></span>
                        <span className="w-2 h-2 rounded-full bg-[#D5D5D5]"></span>
                        <span className="w-2 h-2 rounded-full bg-[#A5A5A5]"></span>
                      </div>
                    </div>

                    {/* Miniature About Structure */}
                    <div className="flex-1 overflow-y-auto space-y-5 max-h-[380px] pr-1.5 scrollbar-thin text-left pt-2 pb-2">
                      <div className="flex gap-4 items-center">
                        <div className="w-14 h-14 overflow-hidden bg-neutral-100 rounded-[2px] shrink-0 border border-neutral-200">
                          <img
                            src={tempAbout.imageUrl || "https://picsum.photos/seed/alex-designer/800/1000?grayscale=1"}
                            alt=""
                            className="w-full h-full object-cover grayscale"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="font-mono text-[8px] uppercase tracking-widest text-[#6B6B6B] block">
                            {tempAbout.subtitle || "05 // BIO & CREATIVE ORIGIN"}
                          </span>
                          <h4 className="font-sans font-bold text-sm text-[#0A0A0A] truncate">
                            {tempAbout.title || "About Alex"}
                          </h4>
                        </div>
                      </div>

                      {/* Main bio paragraph */}
                      <p className="font-sans text-[11px] text-[#6B6B6B] leading-relaxed font-light">
                        {tempAbout.bioPara || "[Bio statement is empty]"}
                      </p>

                      {/* Core Philosophy mini */}
                      <div className="p-3 bg-neutral-50/60 border border-neutral-100 rounded-[2px]">
                        <span className="font-mono text-[8px] uppercase tracking-wider text-[#0A0A0A] font-bold block mb-1">
                          {tempAbout.philosophyLabel || "Core Philosophy:"}
                        </span>
                        <p className="font-sans text-[10px] text-neutral-500 leading-relaxed font-light">
                          {tempAbout.philosophyText}
                        </p>
                      </div>

                      {/* Social Coord */}
                      {tempAbout.xLink && (
                        <div className="pt-1 select-none">
                          <span className="font-mono text-[9px] text-[#0A0A0A] font-medium border-b border-[#0A0A0A] pb-0.5 inline-flex items-center gap-1">
                            {tempAbout.xLinkLabel || "Find me on X"}
                            <ArrowLeft className="h-2 w-2 rotate-135" />
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Sandbox CTA Footer */}
                    <div className="pt-6 border-t border-neutral-100 text-[10px] font-mono text-[#6B6B6B] flex justify-between items-center mt-4">
                      <span>BIO SIZE: {tempAbout.bioPara?.length || 0} CH</span>
                      <span className="text-emerald-600 font-semibold animate-pulse block">● PROFILE ONLINE</span>
                    </div>
                  </div>
                ) : activeTab === "contact" ? (
                  /* Contact Dialogue Banner Preview */
                  <div className="flex-1 bg-[#0A0A0A] text-white border border-[#E5E5E5] p-8 md:p-10 flex flex-col justify-between align-middle rounded-[2px] relative overflow-hidden shadow-md">
                    {/* Miniature Header */}
                    <div className="flex justify-between items-center pb-6 border-b border-neutral-800 mb-4">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 font-bold">
                        A. Reyes - Contact Dialogue Mimic
                      </span>
                      <div className="flex space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      </div>
                    </div>

                    {/* Miniature Contact CTA */}
                    <div className="flex-1 flex flex-col justify-center text-center my-auto px-2 space-y-4">
                      <span className="font-mono text-[8px] uppercase tracking-widest text-[#9c9c9c] font-semibold block">
                        {tempContact.label || "06 // INITIATE DIALOGUE"}
                      </span>
                      <h4 className="font-sans font-bold text-base leading-tight tracking-tight text-white mb-2 line-clamp-2">
                        {tempContact.heading || "[No heading custom tag]"}
                      </h4>
                      <p className="font-sans text-[9.5px] text-neutral-400 leading-normal font-light line-clamp-3">
                        {tempContact.subtext || "[No description target specified]"}
                      </p>

                      {/* Imitated Action Buttons */}
                      <div className="flex justify-center gap-2 pt-2 text-[9px]">
                        <div className="bg-white text-black font-sans font-semibold px-3 py-1.5 rounded-[1px] cursor-pointer hover:bg-neutral-200 transition-colors duration-200 truncate max-w-[140px]">
                          {tempContact.emailLabel || tempContact.email || "Email"}
                        </div>
                        <div className="border border-neutral-700 font-sans font-medium px-2.5 py-1.5 rounded-[1px] hover:bg-neutral-900 transition-all duration-200">
                          Copy Email
                        </div>
                      </div>
                    </div>

                    {/* Sandbox CTA Footer */}
                    <div className="pt-6 border-t border-neutral-800 text-[10px] font-mono text-neutral-400 flex justify-between items-center mt-4">
                      <span>TARGET: {tempContact.email || "hello@alexreyes.com"}</span>
                      <span className="text-emerald-400 font-semibold animate-pulse block">● INBOX ACTIVE</span>
                    </div>
                  </div>
                ) : (
                  /* Footer Social Links Preview */
                  <div className="flex-1 bg-white border border-[#E5E5E5] p-8 md:p-10 flex flex-col justify-between align-middle rounded-[2px] relative overflow-hidden shadow-sm">
                    {/* Miniature Header */}
                    <div className="flex justify-between items-center pb-6 border-b border-neutral-100 mb-4">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-bold">
                        A. Reyes - Footer Socials Mirror
                      </span>
                      <div className="flex space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#E5E5E5]"></span>
                        <span className="w-2 h-2 rounded-full bg-[#D5D5D5]"></span>
                        <span className="w-2 h-2 rounded-full bg-[#A5A5A5]"></span>
                      </div>
                    </div>

                    {/* Miniature Footer Preview */}
                    <div className="flex-1 flex flex-col justify-center items-center my-auto space-y-6">
                      <div className="w-full p-6 border border-[#E5E5E5] bg-neutral-50 rounded-[4px] text-center">
                        <p className="font-mono text-[9px] text-[#6B6B6B] uppercase tracking-wider mb-4 border-b border-neutral-200 pb-2">
                          Footer Socials Live Mirror
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-4 py-2">
                          {tempSocialLinks.filter(s => s.isEnabled).map((link) => (
                            <span 
                              key={link.id} 
                              className="font-sans text-xs font-normal text-[#6B6B6B] hover:text-[#0A0A0A] underline decoration-neutral-300"
                            >
                              {link.name}
                            </span>
                          ))}
                          {tempSocialLinks.filter(s => s.isEnabled).length === 0 && (
                            <span className="font-mono text-[9px] text-neutral-400 uppercase italic">
                              [No active channels]
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Sandbox CTA Footer */}
                    <div className="pt-6 border-t border-neutral-100 text-[10px] font-mono text-[#6B6B6B] flex justify-between items-center mt-4">
                      <span>ENABLED SOCIALS: {tempSocialLinks.filter(s => s.isEnabled).length}</span>
                      <span className="text-emerald-600 font-semibold animate-pulse block">● FOOTER LIVE</span>
                    </div>
                  </div>
                )}

                {/* Back Link block info */}
                <button
                  onClick={onBackToSite}
                  className="w-full flex items-center justify-center space-x-2 bg-transparent hover:bg-neutral-100 border border-[#E5E5E5] text-[#0A0A0A] font-sans font-medium text-xs uppercase tracking-widest py-4 transition-all duration-200 cursor-pointer"
                  style={{ minHeight: "44px" }}
                  id="btn-return-big"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Exit Arena / Exit to Site</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corporate Base Information bar */}
      <footer className="bg-white border-t border-[#E5E5E5] py-6 shrink-0" id="cms-footer">
        <div className="max-w-[1240px] w-full mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-[#6B6B6B] gap-4">
          <span>Geraldy Yobel v1 // @geraldyyobel</span>
          <span>AUTHORIZED USE ONLY</span>
          <span>ONLY FOR GERALDY YOBEL! IF YOU ARE NOT YOBEL, DO NOT CHANGE ANYTHING!</span>
        </div>
      </footer>
    </div>
  );
}
