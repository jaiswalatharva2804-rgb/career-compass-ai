import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  return (
    <section ref={ref} className="relative min-h-screen bg-hero grid-bg overflow-hidden noise pt-16">
      {/* floating orbs */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        className="absolute top-32 left-10 w-72 h-72 rounded-full bg-primary/30 blur-3xl animate-pulse-glow"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
        className="absolute top-60 right-20 w-96 h-96 rounded-full bg-accent/20 blur-3xl animate-pulse-glow"
      />

      <motion.div style={{ y, opacity, scale }} className="relative max-w-6xl mx-auto px-6 pt-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card-glass text-sm text-muted-foreground mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          AI-powered career intelligence
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95]"
        >
          Turn your syllabus
          <br />
          into a <span className="text-gradient">career map</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Upload any academic syllabus. Our semantic engine maps every module to real industry roles, in-demand skills, and the gaps you need to close.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#upload" className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium glow hover:scale-105 transition">
            Analyze my syllabus
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </a>
          <a href="#how" className="px-6 py-3 rounded-xl bg-card-glass text-foreground font-medium hover:bg-secondary transition">
            See how it works
          </a>
        </motion.div>

        {/* stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-24 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { v: "12k+", l: "Roles indexed" },
            { v: "98%", l: "Match accuracy" },
            { v: "<30s", l: "To insights" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient">{s.v}</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.2, y: { repeat: Infinity, duration: 2 } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground tracking-widest"
      >
        SCROLL ↓
      </motion.div>
    </section>
  );
}
