import { useState, useRef, useEffect } from "react";
import { Project } from "../types";
import { ArrowUpRight, ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface CaseStudiesProps {
  projects: Project[];
}

export default function CaseStudies({ projects }: CaseStudiesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  // Filter projects by category
  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  // Limit home view to maximum of 6 filtered projects
  const displayedProjects = filteredProjects.slice(0, 6);
  const hasMore = filteredProjects.length > 6;

  // Staggered layout variants
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  const handleSelectProject = (id: string) => {
    window.location.hash = `#project/${id}`;
  };

  return (
    <section 
      id="work" 
      className="py-24 border-t border-[#E5E5E5] bg-[#FFFFFF]"
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        {/* Section Header with smooth viewport fade-in */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-xs uppercase tracking-widest text-[#6B6B6B] block mb-2 font-semibold">
              01 // DESIGN & BUILDS
            </span>
            <h2 className="font-sans font-bold text-[#0A0A0A] tracking-tighter text-4xl m-0">
              Selected Case Studies
            </h2>
          </motion.div>

          {/* Custom Minimalist Dropdown */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full sm:w-64 md:self-end"
            ref={dropdownRef}
          >
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-between gap-4 w-full border border-neutral-200 hover:border-[#0A0A0A] bg-white px-4 py-2 text-left font-mono text-[9px] uppercase tracking-widest text-[#0A0A0A] font-bold rounded-[2px] cursor-pointer transition-all duration-300 shadow-xs"
              style={{ minHeight: "40px" }}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
            >
              <span className="truncate">{selectedCategory === "All" ? "ALL WORKS" : selectedCategory.toUpperCase()}</span>
              <ChevronDown className={`h-3 w-3 shrink-0 text-[#6B6B6B] transition-transform duration-300 ${dropdownOpen ? 'rotate-180 text-[#0A0A0A]' : ''}`} />
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 mt-2 w-full bg-white border border-[#E5E5E5] rounded-[2px] shadow-lg py-1 text-left list-none pl-0 overflow-hidden z-50 m-0"
                  role="listbox"
                >
                  {categories.map((cat) => {
                    const isActive = selectedCategory === cat;
                    return (
                      <li key={cat} role="option" aria-selected={isActive} className="m-0 p-0">
                        <button
                          onClick={() => {
                            setSelectedCategory(cat);
                            setDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 font-mono text-[9px] uppercase tracking-widest transition-colors duration-200 cursor-pointer border-0 ${
                            isActive
                              ? "bg-[#0A0A0A] text-white font-bold"
                              : "bg-[#FFFFFF] text-[#6B6B6B] hover:text-[#0A0A0A] hover:bg-neutral-50"
                          }`}
                        >
                          {cat === "All" ? "ALL WORKS" : cat}
                        </button>
                      </li>
                    );
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Project Grid - Staggered viewport entrance */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory}
            variants={gridContainerVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
            id="project-grid"
          >
            {displayedProjects.map((project, idx) => (
              <motion.article 
                key={project.id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group cursor-pointer flex flex-col"
                onClick={() => handleSelectProject(project.id)}
                id={`project-card-${project.id}`}
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-100 rounded-[4px] mb-4">
                  <motion.img
                    src={project.image}
                    alt={`${project.title} Preview`}
                    className={`w-full h-full object-cover ${project.originalColor ? '' : 'grayscale group-hover:grayscale-0 transition-all duration-550'}`}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Micro hover overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white/95 text-[#0A0A0A] text-xs font-mono py-2.5 px-5 rounded-full shadow-md flex items-center space-x-1 font-medium">
                      <span>View Project</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>

                  {/* Index label overlay */}
                  <div className="absolute top-4 left-4 bg-white/90 px-2.5 py-1 rounded-[2px] shadow-sm">
                    <span className="font-mono text-[10px] text-[#0A0A0A] font-bold">
                      {(idx + 1).toString().padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Project Meta Information */}
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-sans font-medium text-base text-[#0A0A0A] group-hover:opacity-75 transition-opacity duration-200">
                    {project.title}
                  </h3>
                  <span className="font-mono text-xs text-[#6B6B6B]">
                    {project.year}
                  </span>
                </div>
                
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#6B6B6B] font-bold">
                  {project.category}
                </span>

                <p className="font-sans text-xs text-[#6B6B6B] leading-relaxed line-clamp-2 mt-2">
                  {project.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View More Button if we exceed 6 default elements */}
        {hasMore && (
          <div className="mt-16 text-center border-t border-neutral-100 pt-12">
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#0A0A0A", color: "#FFFFFF" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                window.location.hash = "#projects";
              }}
              className="inline-flex items-center gap-2 border border-[#0A0A0A] text-[#0A0A0A] font-sans font-semibold text-xs py-4 px-8 rounded-[2px] uppercase tracking-widest cursor-pointer transition-colors duration-200"
              style={{ minHeight: "44px" }}
              id="btn-view-more"
            >
              <span>View More Works ({filteredProjects.length - 6} additional)</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}
