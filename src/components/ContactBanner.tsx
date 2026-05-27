import { useState } from "react";
import { Mail, Check, Copy } from "lucide-react";
import { motion } from "motion/react";
import { ContactContent } from "../types";

export interface ContactBannerProps {
  content: ContactContent;
}

export default function ContactBanner({ content }: ContactBannerProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(content.email || "hello@alexreyes.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      id="contact" 
      className="bg-[#0A0A0A] text-[#FFFFFF] py-28 relative overflow-hidden flex flex-col items-center justify-center text-center"
    >
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[800px] px-6 md:px-12 flex flex-col items-center relative z-10"
      >
        {/* Uppercase Tag */}
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#9c9c9c] mb-6 font-semibold">
          {content.label || "06 // INITIATE DIALOGUE"}
        </span>

        {/* Heading */}
        <h2 
          className="font-sans font-bold tracking-tighter leading-[1.05] mb-6 max-w-[650px] mx-auto text-white animate-fade-in"
          style={{ fontSize: "clamp(2.5rem, 5.5vw, 4rem)" }}
          id="contact-heading"
        >
          {content.heading}
        </h2>

        {/* Subtext */}
        <p 
          className="font-sans font-light text-neutral-400 leading-relaxed max-w-[500px] mx-auto mb-10 text-base"
          id="contact-subtext"
        >
          {content.subtext}
        </p>

        {/* Call-to-action Email link & copy container */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
          id="contact-actions"
        >
          {/* Email button */}
          <motion.a 
            whileHover={{ scale: 1.02, backgroundColor: "#e2e2e2" }}
            whileTap={{ scale: 0.98 }}
            href={`mailto:${content.email || "hello@alexreyes.com"}`}
            className="flex items-center justify-center space-x-2 bg-[#FFFFFF] text-[#0A0A0A] font-sans font-medium text-sm px-8 py-4 hover:bg-neutral-200 transition-colors duration-200"
            style={{ minHeight: "48px" }}
          >
            <Mail className="h-4 w-4" />
            <span>{content.emailLabel || content.email || "hello@alexreyes.com"}</span>
          </motion.a>

          {/* Micro-copy action button */}
          <motion.button
            whileHover={{ scale: 1.02, border: "1px solid #FFFFFF" }}
            whileTap={{ scale: 0.98 }}
            onClick={copyEmail}
            className="flex items-center justify-center space-x-2 bg-transparent text-[#FFFFFF] border border-neutral-700 font-sans font-medium text-sm px-6 py-4 hover:bg-neutral-900 transition-all duration-200"
            style={{ minHeight: "48px" }}
            aria-label="Copy Email address"
            id="btn-copy-email"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy Email</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Grid Pattern Accents */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <div className="w-full h-full border-t border-b border-white border-dashed my-8"></div>
      </div>
    </section>
  );
}
