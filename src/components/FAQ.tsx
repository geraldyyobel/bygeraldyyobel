import { useState } from "react";
import { FAQItem } from "../types";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface FAQProps {
  faqs: FAQItem[];
}

export default function FAQ({ faqs }: FAQProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section 
      id="faq" 
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
              04 // FAQS AND POLICIES
            </span>
            <h2 className="font-sans font-bold text-[#0A0A0A] tracking-tighter text-4xl m-0">
              Questions & Answers
            </h2>
          </div>
        </motion.div>

        {/* FAQ Accordion List with initial scroll reveals */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[800px] mr-auto space-y-0" 
          id="faq-accordion-container"
        >
          {faqs.filter(faq => faq.isVisible !== false).map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id} 
                className="border-b border-[#E5E5E5]"
                id={`faq-item-${faq.id}`}
              >
                <div 
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full flex justify-between items-center py-6 cursor-pointer select-none group focus:outline-none"
                  style={{ minHeight: "44px" }}
                  role="button"
                  aria-expanded={isOpen}
                >
                  <h3 className="font-sans font-medium text-base text-[#0A0A0A] group-hover:opacity-75 transition-opacity duration-200">
                    {faq.question}
                  </h3>
                  
                  {/* Plus icon toggle on the right - rotates on open */}
                  <motion.div 
                    animate={{ rotate: isOpen ? 135 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="p-1 rounded-full text-[#0A0A0A] ml-4 shrink-0"
                  >
                    <Plus className="h-4 w-4" />
                  </motion.div>
                </div>

                {/* Animated Answer Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="font-sans font-light text-[#6B6B6B] text-sm leading-relaxed max-w-[680px] pb-6">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
