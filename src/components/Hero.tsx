import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { HeroContent } from "../types";

export interface HeroProps {
  content: HeroContent;
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

export default function Hero({ content }: HeroProps) {
  // Beautiful Swiss-style spring/bezier curves for sleek, responsive motion
  const transitionSettings = {
    duration: 0.9,
    ease: [0.16, 1, 0.3, 1] // Custom cubic-bezier (Expo-like, very smooth)
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-center items-center bg-[#FFFFFF] pt-16 overflow-hidden"
    >
      <div className="w-full max-w-[1100px] px-6 md:px-12 flex flex-col justify-center text-left">
        {/* Uppercase Small Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitionSettings, delay: 0.1 }}
          className="mb-6"
        >
          <span className="font-sans text-xs uppercase tracking-widest text-[#6B6B6B] font-semibold">
            {content.topLabel}
          </span>
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          id="hero-headline"
          key={content.headline} // Key ensures re-animation when CMS content updates
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitionSettings, delay: 0.25 }}
          className="font-sans font-bold text-[#0A0A0A] tracking-tighter leading-[0.95] mb-8 max-w-[90%] md:max-w-[80%]"
          style={{ fontSize: "clamp(2.5rem, 6.5vw, 4.8rem)" }}
        >
          {content.headline}
        </motion.h1>

        {/* Hero Description */}
        <motion.p
          id="hero-subtext"
          key={content.companyName + content.freelanceMonth + (content.bannerText || "")}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitionSettings, delay: 0.4 }}
          className="font-sans font-light text-[#6B6B6B] leading-relaxed mb-12 max-w-[600px]"
          style={{ fontSize: "clamp(1.1rem, 2vw, 1.25rem)" }}
        >
          {content.bannerText ? (
            parseBoldText(content.bannerText)
          ) : (
            <>
              Designing full-time @<strong className="text-[#0A0A0A] font-semibold">{content.companyName}</strong>. Accepting freelance opportunities for <strong className="text-[#0A0A0A] font-semibold">{content.freelanceMonth}</strong>.
            </>
          )}
        </motion.p>


        {/* Hero CTAs */}
        <motion.div
          id="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitionSettings, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
        >
          <motion.a
            href="#work"
            whileHover={{ scale: 1.01, backgroundColor: "#1e1e1e" }}
            whileTap={{ scale: 0.99 }}
            className="flex items-center justify-center bg-[#0A0A0A] text-[#FFFFFF] font-sans font-medium text-sm px-8 py-4 border border-transparent transition-colors duration-200"
            style={{ minHeight: "48px" }}
            id="btn-view-work"
          >
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.01, backgroundColor: "#0A0A0A", color: "#FFFFFF" }}
            whileTap={{ scale: 0.99 }}
            className="flex items-center justify-center bg-transparent text-[#0A0A0A] font-sans font-medium text-sm px-8 py-4 border border-[#0A0A0A] transition-all duration-200 group"
            style={{ minHeight: "48px" }}
            id="btn-work-gallery"
          >
            Contact Me
            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" />
          </motion.a>
        </motion.div>

        {/* Minimal Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitionSettings, delay: 0.8 }}
          className="absolute bottom-12 left-6 md:left-12 flex items-center space-x-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B]">
            Scroll to view
          </span>
          <motion.span
            className="w-1 h-3 bg-[#6B6B6B] block"
            animate={{ y: [0, 4, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut"
            }}
          ></motion.span>
        </motion.div>
      </div>
    </section>
  );
}
