import HeroSequence from "@/components/HeroSequence";
import AboutSection from "@/components/AboutSection";
// import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen">
      <HeroSequence />
      <AboutSection />
      {/* <ProjectsSection /> */}
      <ContactSection />
    </main>
  );
}
