import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { StarField } from "@/components/StarField";
import { MouseSpotlight } from "@/components/MouseSpotlight";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { RolesMarquee } from "@/components/RolesMarquee";
import { UploadCTA } from "@/components/UploadCTA";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Syllabus.AI — Turn your syllabus into a career map" },
      { name: "description", content: "AI-powered platform that maps academic syllabi to industry roles, in-demand skills, and personalized upskilling plans." },
    ],
  }),
});

function Index() {
  return (
    <div className="relative">
      <SmoothScroll />
      <StarField />
      <MouseSpotlight />
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Features />
        <RolesMarquee />
        <UploadCTA />
      </main>
      <Footer />
    </div>
  );
}
