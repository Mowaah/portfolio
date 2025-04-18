"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  FileJson,
  Braces,
  Layers,
  Palette,
  Smartphone,
  GitBranch,
  Globe,
  Database,
  Navigation,
  Layout,
  SmartphoneIcon as MobileIcon,
  HardDrive,
  Workflow,
  Paintbrush,
  Box,
  Boxes,
  Newspaper,
} from "lucide-react";

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Map of skill names to their corresponding icons
  const skillIcons = {
    HTML5: <Code2 className="h-3.5 w-3.5 mr-1.5" />,
    CSS3: <Paintbrush className="h-3.5 w-3.5 mr-1.5" />,
    JavaScript: <Braces className="h-3.5 w-3.5 mr-1.5" />,
    TypeScript: <FileJson className="h-3.5 w-3.5 mr-1.5" />,
    React: <Workflow className="h-3.5 w-3.5 mr-1.5" />,
    "Next.js": <Layers className="h-3.5 w-3.5 mr-1.5" />,
    "React Native": <Smartphone className="h-3.5 w-3.5 mr-1.5" />,
    Redux: <Box className="h-3.5 w-3.5 mr-1.5" />,
    "Context API": <Boxes className="h-3.5 w-3.5 mr-1.5" />,
    "Tailwind CSS": <Palette className="h-3.5 w-3.5 mr-1.5" />,
    "SASS/SCSS": <Palette className="h-3.5 w-3.5 mr-1.5" />,
    "Material UI": <Layout className="h-3.5 w-3.5 mr-1.5" />,
    "shadcn/ui": <Layout className="h-3.5 w-3.5 mr-1.5" />,
    "React Native Paper": <Newspaper className="h-3.5 w-3.5 mr-1.5" />,
    Git: <GitBranch className="h-3.5 w-3.5 mr-1.5" />,
    "REST API": <Globe className="h-3.5 w-3.5 mr-1.5" />,
    GraphQL: <Database className="h-3.5 w-3.5 mr-1.5" />,
    "React Navigation": <Navigation className="h-3.5 w-3.5 mr-1.5" />,
    "Responsive Design": <Layout className="h-3.5 w-3.5 mr-1.5" />,
    "Mobile Development": <MobileIcon className="h-3.5 w-3.5 mr-1.5" />,
    AsyncStorage: <HardDrive className="h-3.5 w-3.5 mr-1.5" />,
  };

  const skillCategories = [
    {
      name: "Frontend Development",
      skills: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "React Native",
      ],
    },
    {
      name: "State Management & UI",
      skills: [
        "Redux",
        "Context API",
        "Tailwind CSS",
        "SASS/SCSS",
        "Material UI",
        "shadcn/ui",
        "React Native Paper",
      ],
    },
    {
      name: "Tools & Others",
      skills: [
        "Git",
        "REST API",
        "GraphQL",
        "React Navigation",
        "Responsive Design",
        "Mobile Development",
        "AsyncStorage",
      ],
    },
  ];

  // Skill levels: "Expert", "Advanced", "Intermediate"
  const skillLevels = {
    HTML5: "Expert",
    CSS3: "Expert",
    JavaScript: "Expert",
    TypeScript: "Expert",
    React: "Expert",
    "Next.js": "Expert",
    "React Native": "Advanced",
    Redux: "Expert",
    "Context API": "Expert",
    "Tailwind CSS": "Expert",
    "SASS/SCSS": "Expert",
    "Material UI": "Expert",
    "shadcn/ui": "Expert",
    "React Native Paper": "Advanced",
    Git: "Expert",
    "REST API": "Expert",
    GraphQL: "Intermediate",
    "React Navigation": "Expert",
    "Responsive Design": "Expert",
    "Mobile Development": "Advanced",
    AsyncStorage: "Intermediate",
  };

  type SkillLevel = "Expert" | "Advanced" | "Intermediate";

  const getSkillColor = (level: SkillLevel) => {
    switch (level) {
      case "Expert":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30";
      case "Advanced":
        return "bg-emerald-600/10 text-emerald-500 border-emerald-600/20 hover:bg-emerald-600/20";
      case "Intermediate":
        return "bg-emerald-700/10 text-emerald-600 border-emerald-700/20 hover:bg-emerald-700/20";
      default:
        return "bg-emerald-800/10 text-emerald-700 border-emerald-800/20 hover:bg-emerald-800/20";
    }
  };

  return (
    <section
      id="skills"
      className="py-20 bg-gradient-to-b from-background to-emerald-950/20"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2 text-white">My Skills</h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-300">
            I've worked with a variety of technologies and frameworks to create
            responsive and user-friendly web and mobile applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-background/20 backdrop-blur-sm p-6 rounded-lg border border-emerald-900/50"
            >
              <h3 className="text-xl font-bold mb-6 text-center text-white">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                      isInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.8 }
                    }
                    transition={{
                      duration: 0.4,
                      delay: categoryIndex * 0.1 + index * 0.05,
                    }}
                    whileHover={{ y: -5, scale: 1.05 }}
                  >
                    <Badge
                      variant="outline"
                      className={`px-3 py-2 text-sm font-medium border ${getSkillColor(
                        skillLevels[
                          skill as keyof typeof skillLevels
                        ] as SkillLevel
                      )} transition-all duration-300 flex items-center`}
                    >
                      {skillIcons[skill as keyof typeof skillIcons]}
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
