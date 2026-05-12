import { motion } from "framer-motion";
import { Upload, FileText, Loader, AlertCircle } from "lucide-react";
import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { SyllabusAnalysis } from "@/types/syllabus";
import { ResultsDashboard } from "./ResultsDashboard";

// Helper to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function UploadCTA() {
  const [drag, setDrag] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<SyllabusAnalysis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const analyzeMutation = useMutation({
    mutationFn: async (params: { file: File; content: string }) => {
      const { file, content } = params;
      const isPDF = file.type === "application/pdf";

      // Send to server API
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          fileName: file.name,
          fileFormat: isPDF ? "pdf" : "text",
        }),
      });

      if (!response.ok) {
        throw new Error("Analysis request failed");
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Analysis failed");
      }

      return data.analysis;
    },
    onSuccess: (analysis) => {
      setAnalysisResult(analysis);
      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    },
  });

  const handleFileSelect = (file: File) => {
    if (!file) return;

    // Validate file size (20MB)
    if (file.size > 20 * 1024 * 1024) {
      alert("File is too large. Maximum size is 20MB.");
      return;
    }

    // Validate file type
    const isValidType = file.type === "application/pdf" || file.type === "text/plain";
    if (!isValidType) {
      alert("Please upload a PDF or TXT file.");
      return;
    }

    // Read file and convert to appropriate format
    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target?.result;
      if (!content) return;

      const isPDF = file.type === "application/pdf";
      let encodedContent: string;

      if (isPDF) {
        // For PDF: convert to base64
        const binary = String.fromCharCode(...new Uint8Array(content as ArrayBuffer));
        encodedContent = btoa(binary);
      } else {
        // For text: just use the string directly
        encodedContent = content as string;
      }

      // Now trigger the mutation
      analyzeMutation.mutate({
        file,
        content: encodedContent,
      });
    };

    if (file.type === "application/pdf") {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  // Show results if analysis is complete
  if (analysisResult) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        id="results"
      >
        <ResultsDashboard analysis={analysisResult} isLoading={false} />
        <div className="flex justify-center py-8">
          <Button
            onClick={() => setAnalysisResult(null)}
            variant="outline"
            className="mt-4"
          >
            Analyze Another Syllabus
          </Button>
        </div>
      </motion.div>
    );
  }

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

        {analyzeMutation.isPending && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12"
          >
            <Card className="p-8 bg-card-glass">
              <div className="flex flex-col items-center gap-4">
                <Loader className="w-8 h-8 animate-spin text-primary" />
                <div>
                  <h3 className="font-semibold mb-2">Analyzing your syllabus...</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our AI is mapping modules to skills, roles, and market trends. This usually takes 10-30 seconds.
                  </p>
                  <Progress value={65} className="h-2" />
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {analyzeMutation.isError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8"
          >
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {analyzeMutation.error instanceof Error
                  ? analyzeMutation.error.message
                  : "An error occurred during analysis. Please try again."}
              </AlertDescription>
            </Alert>
            <Button
              onClick={() => analyzeMutation.reset()}
              className="mt-4"
              variant="outline"
            >
              Try Again
            </Button>
          </motion.div>
        )}

        {!analyzeMutation.isPending && !analyzeMutation.isError && (
          <motion.label
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={handleDrop}
            className={`mt-12 block cursor-pointer rounded-3xl border-2 border-dashed p-12 transition-all ${
              drag
                ? "border-primary bg-primary/5 scale-[1.02]"
                : "border-border bg-card-glass"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.txt"
              className="hidden"
              onChange={handleInputChange}
            />
            <div className="w-16 h-16 rounded-2xl bg-primary/15 text-primary grid place-items-center mx-auto mb-4 glow">
              <Upload className="w-7 h-7" />
            </div>
            <div className="font-semibold text-lg">Drop your syllabus here</div>
            <div className="text-sm text-muted-foreground mt-1 flex items-center justify-center gap-2">
              <FileText className="w-3.5 h-3.5" /> PDF or TXT — up to 20MB
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-6 inline-flex px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Browse files
            </button>
          </motion.label>
        )}
      </div>
    </section>
  );
}
