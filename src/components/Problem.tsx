import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Problem() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <motion.div style={{ x: x1 }} className="whitespace-nowrap text-[12vw] font-bold tracking-tighter text-foreground/5 leading-none">
        CURRICULUM · INDUSTRY · GAP ·
      </motion.div>
      <motion.div style={{ x: x2 }} className="whitespace-nowrap text-[12vw] font-bold tracking-tighter text-foreground/5 leading-none -mt-8">
        SKILLS · ROLES · MARKET ·
      </motion.div>

      <div className="relative max-w-5xl mx-auto px-6 mt-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold tracking-tight"
        >
          Universities teach.<br />
          The market <span className="text-gradient">moves on</span>.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Static syllabi don't tell students what jobs their courses prepare them for, what skills are missing, or how to bridge the gap. We fix that — semantically.
        </motion.p>
      </div>
    </section>
  );
}
