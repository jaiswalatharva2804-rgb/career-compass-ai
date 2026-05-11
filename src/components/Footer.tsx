import { Brain } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary/20 grid place-items-center">
            <Brain className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="font-semibold text-sm">Syllabus<span className="text-primary">.</span>AI</span>
        </div>
        <div className="text-xs text-muted-foreground">© 2026 — Bridging classrooms and careers.</div>
      </div>
    </footer>
  );
}
