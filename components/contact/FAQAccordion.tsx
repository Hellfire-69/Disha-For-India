"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "Where do my donations go?",
    answer: "100% of public donations go directly towards funding our grassroots programs. Our administrative and operational costs are covered by specific corporate grants and our founding endowment."
  },
  {
    question: "Can I visit your field centers?",
    answer: "Absolutely. We encourage transparency and community involvement. Please reach out to us via the contact form to schedule a guided visit to any of our operational field centers."
  },
  {
    question: "How do I become a corporate partner?",
    answer: "We partner with corporations for CSR initiatives, employee volunteering programs, and skill-sharing workshops. Email us at partnerships@dishaforindia.org with your proposal."
  },
  {
    question: "Do you offer certificates for volunteering?",
    answer: "Yes, all registered volunteers receive a verifiable digital certificate upon completing their committed hours, which can be added to LinkedIn or academic portfolios."
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full space-y-4">
      {FAQS.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index} 
            className={`border rounded-2xl overflow-hidden transition-colors ${isOpen ? 'border-primary bg-white shadow-md' : 'border-border bg-transparent hover:bg-white/50'}`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
              aria-expanded={isOpen}
            >
              <span className="font-display font-bold text-lg text-text pr-4">{faq.question}</span>
              <ChevronDown 
                className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-5 font-body text-text-muted leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
