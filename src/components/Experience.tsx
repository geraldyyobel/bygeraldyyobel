import { ExperienceItem } from "../types";
import { motion } from "motion/react";

export interface ExperienceProps {
  experiences: ExperienceItem[];
}

export default function Experience({ experiences }: ExperienceProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
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
    <section 
      id="experience" 
      className="py-24 border-t border-[#E5E5E5] bg-[#FFFFFF]"
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex flex-col md:flex-row md:items-baseline md:justify-between gap-4"
        >
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#6B6B6B] block mb-2 font-semibold">
              03 // BACKGROUND RETROSPECTIVE
            </span>
            <h2 className="font-sans font-bold text-[#0A0A0A] tracking-tighter text-4xl m-0">
              Work Experience
            </h2>
          </div>
        </motion.div>

        {/* Experience List */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-0" 
          id="experience-list"
        >
          {experiences.filter(exp => exp.isVisible !== false).map((exp) => (
            <motion.div 
              key={exp.id} 
              variants={itemVariants}
              whileHover={{ x: 4, backgroundColor: "rgba(245, 245, 245, 0.6)" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-[#E5E5E5] py-8 flex flex-col md:grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-12 items-start md:items-center px-4 -mx-4 cursor-default"
              id={`experience-item-${exp.id}`}
            >
              {/* Left Column = logo */}
              <div 
                className="w-12 h-12 bg-[#F5F5F5] border border-neutral-100 text-[#0A0A0A] font-medium flex items-center justify-center font-mono text-xs rounded-[4px] shadow-xs shrink-0 uppercase tracking-widest overflow-hidden hover:border-[#0A0A0A] transition-all duration-300"
                aria-hidden="true"
              >
                {exp.logoUrl ? (
                  <img 
                    src={exp.logoUrl} 
                    alt={`${exp.company} Logo`} 
                    className="w-full h-full object-cover block" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerText = exp.company.substring(0, 2);
                      }
                    }}
                  />
                ) : (
                  exp.company.substring(0, 2)
                )}
              </div>

              {/* Middle Column = role + company */}
              <div className="flex-1 space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
                  <h3 className="font-sans font-bold text-lg text-[#0A0A0A] m-0">
                    {exp.role}
                  </h3>
                  <span className="font-sans font-light text-[#6B6B6B] text-sm">
                    at {exp.company}
                  </span>
                </div>
                {exp.desc && (
                  <p className="font-sans font-light text-sm text-[#6B6B6B] max-w-[650px] leading-relaxed">
                    {exp.desc}
                  </p>
                )}
              </div>

              {/* Right Column = year range */}
              <div className="font-mono text-sm text-[#0A0A0A] font-medium self-start md:self-auto pt-1 md:pt-0">
                {exp.years}
              </div>
            </motion.div>
          ))}
          {/* Closing bottom border */}
          <div className="border-t border-[#E5E5E5] w-full"></div>
        </motion.div>
      </div>
    </section>
  );
}
