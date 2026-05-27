import { Service } from "../types";
import { motion } from "motion/react";

export interface ServicesProps {
  services: Service[];
}

export default function Services({ services }: ServicesProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const serviceVariants = {
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

  return (
    <section 
      id="services" 
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
              02 // SPECIAL FEES & CAPABILITIES
            </span>
            <h2 className="font-sans font-bold text-[#0A0A0A] tracking-tighter text-4xl m-0">
              Services & Scope
            </h2>
          </div>
        </motion.div>

        {/* Services Grid with staggered fade */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          id="services-grid"
        >
          {services.filter(s => s.isVisible !== false).map((service) => (
            <motion.div 
              key={service.id}
              variants={serviceVariants}
              whileHover={{ y: -4, borderColor: "#0A0A0A" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="border border-[#E5E5E5] p-8 md:p-10 flex flex-col justify-between hover:shadow-sm rounded-[2px] group"
              id={`service-card-${service.id}`}
            >
              <div>
                {/* Icon Circle */}
                <div className="text-3xl mb-8 flex items-center justify-start h-12 w-12 bg-neutral-100 rounded-full pl-2 transition-colors duration-300 group-hover:bg-neutral-200">
                  {service.icon}
                </div>

                {/* Service Name */}
                <h3 className="font-sans font-bold text-lg text-[#0A0A0A] mb-2">
                  {service.name}
                </h3>

                {/* Technical Alignment */}
                <p className="font-mono text-xs text-[#6B6B6B] uppercase mb-6 tracking-wider font-semibold">
                  {service.tech}
                </p>

                {/* Description */}
                <p className="font-sans font-light text-[#6B6B6B] text-sm leading-relaxed mb-8">
                  {service.description}
                </p>
              </div>

              {/* Scope Duration Meta info */}
              <div className="pt-6 border-t border-[#E5E5E5] flex justify-between items-center text-xs">
                <span className="font-mono text-[#6B6B6B] uppercase font-bold">TYPICAL SPEED</span>
                <span className="font-sans font-medium text-[#0A0A0A]">{service.duration}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
