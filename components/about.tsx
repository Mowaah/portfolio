"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { User, Code, Lightbulb, Zap } from "lucide-react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const qualities = [
    {
      icon: <User className="h-6 w-6 text-emerald-500" />,
      title: "User-Focused",
      description:
        "I create intuitive interfaces with the end-user always in mind.",
    },
    {
      icon: <Code className="h-6 w-6 text-emerald-500" />,
      title: "Clean Code",
      description:
        "I write maintainable, well-structured code following best practices.",
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-emerald-500" />,
      title: "Problem Solver",
      description:
        "I enjoy tackling complex challenges with creative solutions.",
    },
    {
      icon: <Zap className="h-6 w-6 text-emerald-500" />,
      title: "Fast Learner",
      description:
        "I quickly adapt to new technologies and development methodologies.",
    },
  ];

  return (
    <section
      id="about"
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
          <h2 className="text-3xl font-bold mb-2 text-white">About Me</h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-300">
            I'm a passionate frontend developer from Egypt with a keen eye for
            detail and a dedication to creating seamless user experiences. I
            specialize in building modern, interactive web applications,
            primarily using React, Next.js, and TypeScript to develop efficient
            and scalable solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {qualities.map((quality, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full border-emerald-900/50 bg-background/50 backdrop-blur-sm hover:bg-emerald-950/30 transition-all duration-300 hover:shadow-emerald-900/20 hover:shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 bg-emerald-500/10 rounded-full mb-4 border border-emerald-500/20">
                    {quality.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-white">
                    {quality.title}
                  </h3>
                  <p className="text-gray-300">{quality.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
