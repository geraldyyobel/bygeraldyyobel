import { useState, useEffect } from "react";
import { Project } from "../types";
import { ArrowLeft, ArrowUpRight, Globe, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  allProjects: Project[];
  onNavigateToProject: (id: string) => void;
}

export default function ProjectDetail({ 
  project, 
  onBack, 
  allProjects, 
  onNavigateToProject 
}: ProjectDetailProps) {
  // Find neighboring projects to allow seamless modernist navigation at footer
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const nextProject = currentIndex !== -1 && currentIndex < allProjects.length - 1 
    ? allProjects[currentIndex + 1] 
    : allProjects[0];

  const [activeImage, setActiveImage] = useState<string | null>(null);

  const getDemoHost = (urlStr?: string) => {
    if (!urlStr) return "DEMO-SANDBOX.STELVIO";
    try {
      const formatted = urlStr.includes("://") ? urlStr : `https://${urlStr}`;
      return new URL(formatted).hostname || "DEMO-SANDBOX.STELVIO";
    } catch {
      return "DEMO-SANDBOX.STELVIO";
    }
  };

  // Close with escape key
  useEffect(() => {
    if (!activeImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImage]);

  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#0A0A0A] font-sans pt-32 pb-24">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        {/* Animated navigation back action */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={onBack}
          className="inline-flex items-center gap-2 group text-xs font-mono uppercase tracking-widest text-[#6B6B6B] hover:text-[#0A0A0A] mb-12 cursor-pointer transition-colors duration-200"
          style={{ minHeight: "44px" }}
          id="btn-detail-back"
        >
          <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Back to Grid</span>
        </motion.button>

        {/* Dynamic Entry Header */}
        <div className="border-b border-[#E5E5E5] pb-12 mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white bg-[#0A0A0A] px-2.5 py-1 font-bold rounded-[2px]">
              {project.category}
            </span>
            <span className="font-mono text-xs text-[#6B6B6B] font-medium border border-neutral-200 px-2 py-0.5 rounded-[2px]">
              RELEASED // {project.year}
            </span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-bold text-[#0A0A0A] text-4xl md:text-6xl tracking-tighter leading-none max-w-4xl"
            id="detail-title"
          >
            {project.title}
          </motion.h1>
        </div>

        {/* Big Hero Visual */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative w-full aspect-[21/9] bg-neutral-100 rounded-[4px] overflow-hidden mb-16 border border-neutral-100 group shadow-sm cursor-zoom-in"
          onClick={() => setActiveImage(project.image)}
        >
          <img 
            src={project.image} 
            alt={`${project.title} Banner`}
            className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${project.originalColor ? "" : "grayscale hover:grayscale-0"}`}
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Two Column Layout splitting Insight & Narrative vs Metadata Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-b border-[#E5E5E5] pb-16 mb-16">
          {/* Left Block - Story and narrative details (Core focus) */}
          <div className="lg:col-span-8 space-y-10">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#6B6B6B] block mb-3 font-semibold">
                [01] // BRIEF OVERVIEW
              </span>
              <p className="font-sans text-lg md:text-xl text-[#0A0A0A] font-light leading-relaxed select-text" id="detail-desc">
                {project.description}
              </p>
            </div>

            <div className="border-t border-neutral-100 pt-8">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#6B6B6B] block mb-4 font-semibold">
                [02] // DESIGN STORY & CASE STUDY
              </span>
              <div 
                className="font-sans text-sm text-[#4A4A4A] leading-relaxed space-y-4 font-light select-text" 
                id="detail-story"
              >
                {project.story ? (
                  project.story.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))
                ) : (
                  <p>
                    This layout adopts a modular swiss ratio hierarchy, with precise font size scales, fixed grid lines, and crisp interaction limits designed for ultimate visual honesty. Every segment lines up back to the root container framework perfectly.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Block - Metadata, Parameters, and Live Link cta */}
          <div className="lg:col-span-4 lg:border-l lg:border-[#E5E5E5] lg:pl-12 space-y-8">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#6B6B6B] block mb-4 font-semibold">
                [03] // SPECIFICATIONS
              </span>
              
              <div className="space-y-4 text-xs font-mono">
                <div className="flex justify-between py-2 border-b border-neutral-100">
                  <span className="text-[#6B6B6B] uppercase">LOCATION</span>
                  <span className="text-[#0A0A0A] font-bold">{project.location || "ZURICH, CH"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-100">
                  <span className="text-[#6B6B6B] uppercase">LAUNCHED</span>
                  <span className="text-[#0A0A0A] font-bold">{project.year}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-100">
                  <span className="text-[#6B6B6B] uppercase">ROLE</span>
                  <span className="text-[#0A0A0A] font-bold">{project.role || "VISUAL ENGINE"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-100">
                  <span className="text-[#6B6B6B] uppercase">DISCIPLINE</span>
                  <span className="text-[#0A0A0A] font-bold truncate max-w-[150px]" title={project.category}>
                    {project.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Launch Project CTA button */}
            <div className="pt-4">
              <a 
                href={project.demoUrl || "https://example.com"}
                target="_blank"
                rel="noreferrer"
                id="btn-detail-demo-url"
                className="w-full bg-[#0A0A0A] text-white flex items-center justify-between px-6 py-4 rounded-[2px] text-xs font-mono uppercase tracking-widest font-extrabold hover:bg-neutral-800 transition-colors duration-200"
                style={{ minHeight: "44px" }}
              >
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>Launch Live Demo</span>
                </div>
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <span className="font-mono text-[9px] text-[#6B6B6B] block mt-2 text-center">
                HOST AT // {getDemoHost(project.demoUrl)}
              </span>
            </div>
          </div>
        </div>

        {/* [04] // PROJECT GALLERY SHOWCASE */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="border-b border-[#E5E5E5] pb-16 mb-16">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#6B6B6B] block mb-8 font-semibold">
              [04] // VISUAL GALLERY ARCHIVE
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="project-detail-gallery">
              {project.gallery.map((imgUrl, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative aspect-[4/3] bg-neutral-100 rounded-[4px] overflow-hidden border border-neutral-100 shadow-xs cursor-zoom-in"
                  onClick={() => setActiveImage(imgUrl)}
                >
                  <img 
                    src={imgUrl} 
                    alt={`${project.title} Gallery visual ${index + 1}`} 
                    className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${project.originalColor ? "" : "grayscale hover:grayscale-0"}`}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 px-2 py-0.5 rounded-[2px]">
                    <span className="font-mono text-[9px] text-black font-semibold">
                      PLATE #{(index + 1).toString().padStart(2, "0")}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Navigation for Next Project Carousel Link */}
        {nextProject && (
          <div className="pt-16 text-center">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#6B6B6B] block mb-4 font-semibold">
              NEXT UP IN CASE HIGHLIGHTS
            </span>
            <button
              onClick={() => onNavigateToProject(nextProject.id)}
              className="group inline-block text-left max-w-xl pb-1.5 cursor-pointer transition-opacity duration-200 hover:opacity-80"
              id="btn-detail-next-project"
            >
              <h2 className="font-sans font-bold text-[#0A0A0A] text-3xl md:text-4xl tracking-tighter leading-none mb-2">
                {nextProject.title}
              </h2>
              <span className="font-mono text-xs text-[#6B6B6B] uppercase tracking-widest flex items-center justify-center gap-1.5 font-bold">
                <span>View Next Project</span>
                <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Lightbox / Preview Modal with elegant animations */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#0A0A0A]/95 z-[9999] flex flex-col items-center justify-center p-4 md:p-8 backdrop-blur-xs select-none"
            onClick={() => setActiveImage(null)}
            id="gallery-preview-lightbox"
          >
            {/* Close button with high feedback */}
            <button
              type="button"
              className="absolute top-6 right-6 p-3 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setActiveImage(null);
              }}
              aria-label="Close image preview"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Centered Preview Container */}
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-5xl max-h-[80vh] bg-neutral-900 rounded-[4px] overflow-hidden border border-neutral-800 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeImage}
                alt="Expanded preview"
                className="max-w-full max-h-[80vh] object-contain block"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Modern minimalist tip */}
            <span className="font-mono text-[9px] text-[#6B6B6B] uppercase tracking-widest mt-4">
              Click backdrop or press ESC to dismiss preview
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
