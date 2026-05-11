import { motion } from "framer-motion";
import { TrendingUp, Network, Briefcase, GraduationCap, LineChart, Compass } from "lucide-react";

const features = [
  { icon: Network, title: "Semantic mapping", desc: "Concepts in your syllabus → skills in the market. Every connection scored." },
  { icon: Briefcase, title: "Role matching", desc: "See exactly which job titles your curriculum prepares you for." },
  { icon: TrendingUp, title: "Live market data", desc: "Demand trends, salary ranges, and growth signals — refreshed daily." },
  { icon: GraduationCap, title: "Skill gap analysis", desc: "What's missing? Get a ranked list of skills to learn next." },
  { icon: LineChart, title: "Career trajectory", desc: "Visualize 1, 3, and 5-year paths from your current course load." },
  { icon: Compass, title: "Learning roadmap", desc: "Curated courses, projects and certifications to close every gap." },
];

export function Features() {
  return (
    <section id="features" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-sm text-primary tracking-widest uppercase mb-3">Capabilities</div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Built like a <span className="text-gradient">career consultant</span></h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="group relative bg-card-glass rounded-2xl p-6 overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary grid place-items-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
