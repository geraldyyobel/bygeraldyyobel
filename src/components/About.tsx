import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { AboutContent } from "../types";

export interface AboutProps {
  content: AboutContent;
}

export default function About({ content }: AboutProps) {
  return (
    <section 
      id="about" 
      className="py-24 border-t border-[#E5E5E5] bg-[#FFFFFF]"
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#6B6B6B] block mb-2 font-semibold">
            {content.subtitle || "05 // BIO & CREATIVE ORIGIN"}
          </span>
          <h2 className="font-sans font-bold text-[#0A0A0A] tracking-tighter text-4xl m-0">
            {content.title || "About Alex"}
          </h2>
        </motion.div>

        {/* 2-column Layout */}
        <div 
          className="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-12 md:gap-16 items-start"
          id="about-content-grid"
        >
          {/* Left Column - Portrait Image with zoom-in reveal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-full aspect-[4/5] md:w-[400px] overflow-hidden bg-neutral-100 rounded-[4px] shadow-sm"
          >
            <motion.img 
              src={content.imageUrl || "https://picsum.photos/seed/alex-designer/800/1000?grayscale=1"} 
              alt="Alex Reyes portrait" 
              className="w-full h-full object-cover grayscale contrast-125"
              whileHover={{ scale: 1.03, filter: "grayscale(0%) contrast(110%)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              referrerPolicy="no-referrer"
              id="about-portrait-img"
            />
          </motion.div>

          {/* Right Column - Biography / Text details with slide-up reveal */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="space-y-8 flex flex-col justify-center h-full pt-2"
          >
            <p 
              className="font-sans font-light text-[#6B6B6B] leading-relaxed text-lg"
              id="about-bio-para"
            >
              {content.bioPara}
            </p>

            <div className="space-y-4">
              <h4 className="font-mono text-xs uppercase text-[#0A0A0A] tracking-wider font-semibold">
                {content.philosophyLabel || "Core Philosophy:"}
              </h4>
              <p className="font-sans font-light text-sm text-[#6B6B6B] leading-relaxed">
                {content.philosophyText}
              </p>
            </div>

            {/* Social Link Below Bio */}
            {content.xLink && (
              <div className="pt-4" id="about-social">
                <motion.a 
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  href={content.xLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1 font-sans font-medium text-sm text-[#0A0A0A] hover:opacity-60 border-b border-[#0A0A0A] pb-1"
                  id="link-find-on-x"
                  style={{ minHeight: "44px" }}
                >
                  <span>{content.xLinkLabel || "Find me on X"}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </motion.a>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
