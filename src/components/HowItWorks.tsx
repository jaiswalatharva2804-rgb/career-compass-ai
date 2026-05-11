import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FileUp, Brain, Target } from "lucide-react";

const steps = [
  { icon: FileUp, title: "Upload", desc: "Drop your syllabus PDF or paste text. Any format, any field of study.", color: "primary" },
  { icon: Brain, title: "Semantic analysis", desc: "Our AI parses modules, extracts concepts, and builds a knowledge graph linking learning to skills.", color: "accent" },
  { icon: Target, title: "Career map", desc: "Get matched to live job roles, in-demand skills, salary benchmarks, and a personal upskilling plan.", color: "primary" },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section id="how" ref={ref} className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="text-sm text-primary tracking-widest uppercase mb-3">How it works</div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Three steps. <span className="text-gradient">One future.</span></h2>
        </motion.div>

        <div className="relative">
          {/* animated vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block">
            <motion.div style={{ height: lineHeight }} className="w-full bg-gradient-to-b from-primary to-accent" />
          </div>

          <div className="space-y-24">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="flex-1 bg-card-glass rounded-2xl p-8 hover:scale-[1.02] transition-transform">
                  <div className={`w-12 h-12 rounded-xl grid place-items-center mb-4 ${step.color === "primary" ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent"}`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div className="text-xs text-muted-foreground tracking-widest mb-2">STEP 0{i + 1}</div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
                <div className="hidden md:block w-12 h-12 rounded-full bg-background border-2 border-primary glow z-10" />
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
