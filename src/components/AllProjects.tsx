import { useState, useRef, useEffect } from "react";
import { Project } from "../types";
import { ArrowLeft, ArrowUpRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface AllProjectsProps {
  projects: Project[];
  onBackToHome: () => void;
  onSelectProject: (id: string) => void;
}

export default function AllProjects({ 
  projects, 
  onBackToHome, 
  onSelectProject 
}: AllProjectsProps) {
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

  // Get unique categories and filter projects
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  // Staggered layout variants for clean appearance
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.7, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#0A0A0A] font-sans pt-32 pb-24">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        {/* Navigation back action */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 group text-xs font-mono uppercase tracking-widest text-[#6B6B6B] hover:text-[#0A0A0A] mb-12 cursor-pointer transition-colors duration-200"
          style={{ minHeight: "44px" }}
          id="btn-all-projects-back"
        >
          <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Back to Home</span>
        </motion.button>

        {/* Header Block with Integrated Filter Dropdown */}
        <div className="border-b border-[#E5E5E5] pb-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#6B6B6B] block mb-2 font-semibold">
              01 // DESIGN & BUILDS
            </span>
            <h1 className="font-sans font-bold text-[#0A0A0A] text-4xl md:text-5xl tracking-tighter leading-none m-0">
              Selected Case Studies
            </h1>
          </div>
          
          {/* Custom Minimalist Dropdown positioned in header */}
          <div className="relative w-full sm:w-64" ref={dropdownRef}>
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
          </div>
        </div>

        {/* Fully detailed Grid showing filtered items */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory}
            variants={gridContainerVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
            id="all-projects-grid"
          >
            {filteredProjects.map((project, idx) => (
              <motion.article 
                key={project.id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group cursor-pointer flex flex-col"
                onClick={() => onSelectProject(project.id)}
                id={`idx-card-${project.id}`}
              >
                {/* Image with index number overlay */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-100 rounded-[4px] mb-4">
                  <img
                    src={project.image}
                    alt={`${project.title} Preview`}
                    className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${project.originalColor ? '' : 'grayscale group-hover:grayscale-0'}`}
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Visual hover label overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white/95 text-[#0A0A0A] text-xs font-mono py-2.5 px-5 rounded-full shadow-md flex items-center space-x-1 font-medium">
                      <span>Explore Case</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>

                  {/* Index marker block */}
                  <div className="absolute top-4 left-4 bg-white/95 px-2.5 py-1 rounded-[2px] shadow-sm">
                    <span className="font-mono text-[10px] text-[#0A0A0A] font-bold">
                      {(idx + 1).toString().padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Title, Year, Category */}
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-sans font-medium text-base text-[#0A0A0A] group-hover:opacity-75 transition-opacity duration-200">
                    {project.title}
                  </h3>
                  <span className="font-mono text-xs text-[#6B6B6B] shrink-0 ml-2">
                    {project.year}
                  </span>
                </div>
                
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#6B6B6B] block mb-2 font-bold">
                  {project.category}
                </span>

                <p className="font-sans text-xs text-[#6B6B6B] leading-relaxed line-clamp-2 mt-1">
                  {project.description}
                </p>


              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
