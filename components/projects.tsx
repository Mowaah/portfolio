"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ExternalLink,
  Github,
  Smartphone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  features: string[];
  isMobile?: boolean;
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeTab, setActiveTab] = useState("all");

  const projects: Project[] = [
    {
      id: "tavearn",
      title: "Tavearn",
      description:
        "A comprehensive restaurant management software that handles stock, dishes, orders, and provides analytical dashboards.",
      images: [
        "/tavearn/tavearn-login.png",
        "/tavearn/tavearn-dashboard.png",
        "/tavearn/tavearn-staff.png",
        "/tavearn/tavearn-staff-form.png",
        "/tavearn/tavearn-reservation.png",
        "/tavearn/tavearn-reservation-form.png",
      ],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Ant-Design"],
      features: [
        "Inventory management system",
        "Menu and dish management",
        "Order processing",
        "Analytics dashboard",
        "Staff management",
      ],
    },
    {
      id: "airtick",
      title: "Airtick",
      description:
        "An instant ticket purchasing app for transportation companies. Users can scan QR codes to buy tickets, while companies can access analytics.",
      images: [
        "/airtick/airtick-login.png",
        "/airtick/airtick-dashboard.png",
        "/airtick/airtick-forms.png",
        "/airtick/airtick-form.png",
        "/airtick/airtick-ticket.png",
        "/airtick/airtick-settings.png",
      ],
      technologies: ["React", "TypeScript", "Material UI", "SASS", "shadcn/ui"],
      features: [
        "QR code scanning",
        "Instant ticket purchase",
        "Company dashboard",
        "User management",
      ],
    },
    {
      id: "subsync",
      title: "SubSync",
      description:
        "A modern mobile application designed to help users track and manage their digital subscriptions in one place, with intuitive design and user-friendly interactions.",
      images: ["/subsync/subsync1.svg", "/subsync/subsync2.svg"],
      technologies: [
        "React Native",
        "Redux",
        "React Navigation",
        "React Native Paper",
      ],
      features: [
        "Subscription tracking with detailed information",
        "Financial overview",
        "Category management ",
        "Multiple currency support",
        "Renewal reminders and notifications",
        "Detailed analytics",
      ],
      isMobile: true,
    },
  ];

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((project) => project.id === activeTab);

  return (
    <section id="projects" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2 text-white">My Projects</h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-300">
            Here are some of the projects I've worked on. Each project showcases
            different skills and technologies.
          </p>
        </motion.div>

        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="bg-emerald-950/30 border border-emerald-900/50">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                All Projects
              </TabsTrigger>
              <TabsTrigger
                value="tavearn"
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                Tavearn
              </TabsTrigger>
              <TabsTrigger
                value="airtick"
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                Airtick
              </TabsTrigger>
              <TabsTrigger
                value="subsync"
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                SubSync
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden border-emerald-900/50 bg-background/50 backdrop-blur-sm hover:shadow-emerald-900/20 hover:shadow-lg transition-all duration-300">
                    <ProjectImageCarousel
                      images={project.images}
                      projectTitle={project.title}
                      isMobile={project.isMobile}
                    />
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold mb-2 text-white">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 mb-4">
                        {project.description}
                      </p>

                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 text-emerald-400">
                          Key Features:
                        </h4>
                        <ul className="list-disc pl-5 space-y-1 text-gray-300">
                          {project.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-sm border border-emerald-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-3 mt-4">
                        {project.liveUrl && (
                          <Button
                            variant="default"
                            size="sm"
                            asChild
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                          >
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1"
                            >
                              <ExternalLink className="h-4 w-4" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="border-emerald-600 text-emerald-400 hover:bg-emerald-950/50"
                          >
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1"
                            >
                              <Github className="h-4 w-4" />
                              View Code
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

interface ProjectImageCarouselProps {
  images: string[];
  projectTitle: string;
  isMobile?: boolean;
}

function ProjectImageCarousel({
  images,
  projectTitle,
  isMobile,
}: ProjectImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative overflow-hidden aspect-video">
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/50 to-transparent z-10"></div>

      {/* Image Carousel */}
      <div className="relative w-full h-full">
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${projectTitle} - Image ${currentIndex + 1}`}
            className="absolute w-full h-full object-cover"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-300"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-300"
        aria-label="Next image"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === currentIndex
                ? "bg-emerald-500"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Mobile App Badge */}
      {isMobile && (
        <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center z-20">
          <Smartphone className="w-3 h-3 mr-1" />
          Mobile App
        </div>
      )}
    </div>
  );
}
