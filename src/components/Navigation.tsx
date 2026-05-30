import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SectionVisibility } from "../types";

interface NavigationProps {
  visibility?: SectionVisibility;
  brandName?: string;
  contactEmail?: string;
}

export default function Navigation({ visibility, brandName = "Geraldy Yobel", contactEmail = "geraldyyobel17@gmail.com" }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "Services", href: "#services" },
    { name: "Experience", href: "#experience" },
    { name: "FAQ", href: "#faq" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const linkKeys: Record<string, keyof SectionVisibility> = {
    "#work": "work",
    "#services": "services",
    "#experience": "experience",
    "#faq": "faq",
    "#about": "about",
    "#contact": "contact",
  };

  const activeLinks = navLinks.filter((link) => {
    if (!visibility) return true;
    const key = linkKeys[link.href];
    if (key) return visibility[key];
    return true;
  });

  return (
    <>
      <nav
        id="navbar"
        className="fixed top-0 left-0 right-0 z-50 bg-[#FFFFFF]/80 backdrop-blur-md border-b border-[#E5E5E5] h-16 transition-all duration-300"
      >
        <div className="max-w-[1100px] mx-auto h-full px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Name */}
          <a
            href="#"
            className="font-sans font-bold tracking-tight text-[#0A0A0A] text-lg hover:opacity-60 transition-opacity duration-200"
            id="nav-logo"
          >
            {brandName}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8" id="nav-desktop-links">
            {activeLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ y: -1 }}
                className="font-sans text-sm font-normal text-[#6B6B6B] hover:text-[#0A0A0A] hover:underline underline-offset-4 decoration-1 decoration-[#0A0A0A]/50 transition-all duration-200"
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* Mobile Hamburguer Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded-md text-[#0A0A0A] hover:bg-neutral-100 transition-colors duration-200 focus:outline-none"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
            style={{ minWidth: "44px", minHeight: "44px" }}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer Overlay inside AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 220 }}
            className="fixed inset-x-0 z-40 bg-[#FFFFFF] md:hidden overflow-hidden"
            style={{ top: "64px" }}
          >
            <div className="flex flex-col px-6 py-8 space-y-6">
              {activeLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="font-sans text-2xl font-medium text-[#0A0A0A] hover:opacity-60 border-b border-[#E5E5E5] pb-4 transition-all duration-200"
                >
                  {link.name}
                </motion.a>
              ))}
              <div className="pt-8">
                <p className="font-sans text-xs uppercase tracking-widest text-[#6B6B6B] mb-2 font-semibold">Available for projects</p>
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-mono text-sm text-[#0A0A0A] underline"
                >
                  {contactEmail}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
