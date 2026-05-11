import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";

const items = [
  {
    q: "How does the semantic analysis actually work?",
    a: "We parse your syllabus into modules, extract concepts using transformer-based embeddings, then map them against a continuously-updated knowledge graph of 12k+ industry roles and skills.",
  },
  {
    q: "Which file formats are supported?",
    a: "Upload PDF, DOCX, or paste raw text. The parser handles scanned PDFs via OCR and preserves module-level structure for accurate mapping.",
  },
  {
    q: "Where does the market data come from?",
    a: "We aggregate live job postings, salary benchmarks, and skill demand signals from major job boards and refresh them daily. Your career map reflects today's market — not last year's.",
  },
  {
    q: "Is my syllabus data private?",
    a: "Your uploads are encrypted in transit and at rest. We never train models on your documents and you can purge your data anytime from your dashboard.",
  },
  {
    q: "Can institutions use this at scale?",
    a: "Yes — we offer institutional dashboards for departments to audit curriculum-market fit, identify outdated modules, and recommend updates backed by real demand data.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-sm text-primary tracking-widest uppercase mb-3">FAQ</div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Questions, <span className="text-gradient">answered</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="relative"
              >
                {/* glow */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/40 via-accent/30 to-primary/40 blur-md -z-10"
                    />
                  )}
                </AnimatePresence>

                <motion.button
                  layout
                  onClick={() => setOpen(isOpen ? null : i)}
                  className={`w-full text-left rounded-2xl p-6 transition-colors ${
                    isOpen ? "bg-card border border-primary/40" : "bg-card-glass hover:border-primary/20"
                  }`}
                >
                  <motion.div layout className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-base md:text-lg">{item.q}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? "oklch(0.78 0.18 200)" : "oklch(0.22 0.04 260)" }}
                      transition={{ type: "spring", stiffness: 200, damping: 18 }}
                      className="shrink-0 w-9 h-9 rounded-full grid place-items-center text-primary-foreground"
                    >
                      <Plus className="w-4 h-4" />
                    </motion.div>
                  </motion.div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.25 } }}
                        className="overflow-hidden"
                      >
                        <p className="pt-4 text-muted-foreground leading-relaxed">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
