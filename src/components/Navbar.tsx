import { motion, useScroll, useTransform } from "framer-motion";
import { Brain } from "lucide-react";

export function Navbar() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 100], ["rgba(0,0,0,0)", "rgba(10,12,20,0.7)"]);
  const blur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(14px)"]);

  return (
    <motion.nav
      style={{ backgroundColor: bg, backdropFilter: blur as unknown as string }}
      className="fixed top-0 inset-x-0 z-50 border-b border-transparent"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 grid place-items-center glow">
            <Brain className="w-4 h-4 text-primary" />
          </div>
          <span className="font-semibold tracking-tight">Syllabus<span className="text-primary">.</span>AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#how" className="hover:text-foreground transition">How it works</a>
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#roles" className="hover:text-foreground transition">Roles</a>
        </div>
        <a href="#upload" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition glow">
          Try it
        </a>
      </div>
    </motion.nav>
  );
}
