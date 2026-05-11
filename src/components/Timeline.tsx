import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Rocket, BookOpen, Code2, Briefcase, Trophy } from "lucide-react";

const milestones = [
  {
    icon: BookOpen,
    label: "Month 0",
    title: "Syllabus decoded",
    desc: "Upload kickstarts a full semantic scan. You get an instant map of every concept in your course.",
    skills: ["Concept extraction", "Module tagging", "Knowledge graph"],
  },
  {
    icon: Code2,
    label: "Month 1–3",
    title: "Skill foundations",
    desc: "Personalized learning sprints close the most critical gaps using curated resources and projects.",
    skills: ["Hands-on projects", "Curated courses", "Weekly check-ins"],
  },
  {
    icon: Rocket,
    label: "Month 3–6",
    title: "Portfolio launch",
    desc: "Build proof-of-skill artifacts aligned to your top role matches — reviewed by AI mentors.",
    skills: ["Project reviews", "GitHub polish", "Resume builder"],
  },
  {
    icon: Briefcase,
    label: "Month 6–9",
    title: "Market entry",
    desc: "Start applying to matched roles with tailored applications and live interview practice.",
    skills: ["Tailored applications", "Mock interviews", "Salary insights"],
  },
  {
    icon: Trophy,
    label: "Month 9+",
    title: "Career growth",
    desc: "Continuous market tracking shows you the next skill to learn and when to make your next move.",
    skills: ["Trajectory planning", "Promotion tracking", "Skill alerts"],
  },
];

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number>(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 40%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="roadmap" ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="text-sm text-primary tracking-widest uppercase mb-3">Roadmap</div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Your 9-month <span className="text-gradient">career arc</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
            Tap each milestone to expand. The journey from your first syllabus upload to your first offer.
          </p>
        </motion.div>

        <div className="relative pl-10 md:pl-16">
          {/* track */}
          <div className="absolute left-3 md:left-6 top-0 bottom-0 w-px bg-border">
            <motion.div
              style={{ height: lineHeight }}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-accent to-primary"
            />
          </div>

          <div className="space-y-5">
            {milestones.map((m, i) => {
              const isOpen = active === i;
              return (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: i * 0.08 }}
                  className="relative"
                >
                  {/* node */}
                  <motion.div
                    animate={{
                      scale: isOpen ? 1.25 : 1,
                      boxShadow: isOpen
                        ? "0 0 30px 4px oklch(0.78 0.18 200 / 0.7)"
                        : "0 0 0px 0px oklch(0.78 0.18 200 / 0)",
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 18 }}
                    className={`absolute -left-10 md:-left-[58px] top-6 w-6 h-6 rounded-full border-2 ${
                      isOpen ? "bg-primary border-primary" : "bg-background border-border"
                    } grid place-items-center`}
                  >
                    <motion.div
                      animate={{ scale: isOpen ? 1 : 0 }}
                      className="w-2 h-2 rounded-full bg-primary-foreground"
                    />
                  </motion.div>

                  {/* glow halo */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 blur-lg -z-10"
                      />
                    )}
                  </AnimatePresence>

                  <motion.button
                    layout
                    onClick={() => setActive(isOpen ? -1 : i)}
                    className={`w-full text-left rounded-2xl p-6 border transition-colors ${
                      isOpen ? "bg-card border-primary/40" : "bg-card-glass border-transparent hover:border-primary/20"
                    }`}
                  >
                    <motion.div layout className="flex items-center gap-4">
                      <motion.div
                        animate={{
                          backgroundColor: isOpen ? "oklch(0.78 0.18 200 / 0.2)" : "oklch(0.22 0.04 260)",
                          color: isOpen ? "oklch(0.78 0.18 200)" : "oklch(0.72 0.03 250)",
                        }}
                        className="w-11 h-11 rounded-xl grid place-items-center shrink-0"
                      >
                        <m.icon className="w-5 h-5" />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-muted-foreground tracking-widest">{m.label}</div>
                        <div className="font-semibold text-lg truncate">{m.title}</div>
                      </div>
                    </motion.div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ height: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.3, delay: 0.1 } }}
                          className="overflow-hidden"
                        >
                          <p className="mt-5 text-muted-foreground leading-relaxed">{m.desc}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {m.skills.map((s, si) => (
                              <motion.span
                                key={s}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 + si * 0.06 }}
                                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                              >
                                {s}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
