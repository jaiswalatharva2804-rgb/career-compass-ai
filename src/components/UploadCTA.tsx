import { motion } from "framer-motion";
import { Upload, FileText } from "lucide-react";
import { useState } from "react";

export function UploadCTA() {
  const [drag, setDrag] = useState(false);
  return (
    <section id="upload" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-hero opacity-60" />
      <div className="relative max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold tracking-tight"
        >
          Ready to <span className="text-gradient">decode</span> your syllabus?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-lg text-muted-foreground"
        >
          Upload a PDF or paste your syllabus. Get your career map in seconds.
        </motion.p>

        <motion.label
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); }}
          className={`mt-12 block cursor-pointer rounded-3xl border-2 border-dashed p-12 transition-all ${drag ? "border-primary bg-primary/5 scale-[1.02]" : "border-border bg-card-glass"}`}
        >
          <input type="file" accept=".pdf,.txt" className="hidden" />
          <div className="w-16 h-16 rounded-2xl bg-primary/15 text-primary grid place-items-center mx-auto mb-4 glow">
            <Upload className="w-7 h-7" />
          </div>
          <div className="font-semibold text-lg">Drop your syllabus here</div>
          <div className="text-sm text-muted-foreground mt-1 flex items-center justify-center gap-2">
            <FileText className="w-3.5 h-3.5" /> PDF or TXT — up to 20MB
          </div>
          <div className="mt-6 inline-flex px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
            Browse files
          </div>
        </motion.label>
      </div>
    </section>
  );
}
