import type { Metadata } from "next";
import Hero from "@/components/hero";
import About from "@/components/about";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Contact from "@/components/contact";
import Navbar from "@/components/navbar";
import CustomCursor from "@/components/custom-cursor";
import StarfieldBackground from "@/components/starfield-background";

export const metadata: Metadata = {
  title: "Mohamed Bahaa | Frontend Developer",
  description:
    "Portfolio of Mohamed Bahaa, a frontend developer specializing in React, Next.js, and TypeScript",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <StarfieldBackground />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}
