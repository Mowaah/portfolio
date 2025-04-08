"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  Download,
  Github,
  Linkedin,
  Instagram,
  Dribbble,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [circleProps, setCircleProps] = useState<
    Array<{
      top: string;
      left: string;
      width: number;
      height: number;
      x: number;
      y: number;
    }>
  >([]);

  useEffect(() => {
    // Generate random circle properties only on the client side
    setCircleProps(
      [...Array(5)].map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: Math.random() * 300 + 100,
        height: Math.random() * 300 + 100,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
      }))
    );
  }, []);

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="h-5 w-5" />,
      url: "https://github.com/Mowaah",
      position: { top: "20%", right: "-70px" },
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      url: "https://www.linkedin.com/in/mohamed-bahaa-75646127a/",
      position: { top: "40%", right: "-80px" },
    },
    {
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      url: "https://www.instagram.com/mowax/",
      position: { top: "60%", right: "-70px" },
    },
    {
      name: "Dribbble",
      icon: <Dribbble className="h-5 w-5" />,
      url: "https://dribbble.com",
      position: { top: "80%", right: "-80px" },
    },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden pt-16"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-emerald-950/30 z-0"></div>

      {/* Animated circles */}
      <div className="absolute inset-0 z-0">
        {circleProps.map((props, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-emerald-500/5"
            initial={{
              width: props.width,
              height: props.height,
              x: props.x,
              y: props.y,
              opacity: 0.1,
            }}
            animate={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{
              top: props.top,
              left: props.left,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 z-10 flex flex-col lg:flex-row items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mb-12 lg:mb-0"
        >
          <h2 className="text-2xl md:text-3xl font-light mb-2 text-emerald-400">
            Hello! I'm
          </h2>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
            Mohamed <span className="text-emerald-500">Bahaa</span>
          </h1>
          <div className="h-1 w-40 bg-emerald-500 mb-6"></div>
          <h2 className="text-xl md:text-2xl font-light mb-6 text-gray-300">
            Frontend Developer specializing in React, Next.js, and TypeScript
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-xl">
            Crafting exceptional digital experiences with modern web
            technologies. I build responsive, user-friendly interfaces that
            deliver results.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Link href="#projects" className="flex items-center gap-2">
                View My Work
              </Link>
            </Button>
            <a href="/Mohamed_Bahaa_CV.pdf" download>
              <Button
                variant="outline"
                size="lg"
                className="border-emerald-600 text-emerald-500 hover:bg-emerald-950/50"
              >
                <Download className="mr-2 h-4 w-4" /> Download CV
              </Button>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Professional image */}
          <div className="relative w-[280px] md:w-[350px] h-[350px] md:h-[700px]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-emerald-500/20 to-transparent blur-xl"></div>
            <Image
              src="/mohamed.png"
              alt="Mohamed Bahaa"
              className="relative z-10 w-full h-full object-cover rounded-2xl"
              width={1000}
              height={1000}
              quality={100}
              priority
            />

            {/* Social icons around the image */}
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute z-20 p-3 bg-background/80 backdrop-blur-sm rounded-full border border-emerald-500/30 hover:bg-emerald-500/20 transition-all duration-300"
                style={link.position as any}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>

          {/* Decorative elements */}
          <motion.div
            className="absolute -bottom-10 -left-10 w-40 h-40 border border-emerald-500/20 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          />
          <motion.div
            className="absolute -top-10 -right-10 w-20 h-20 border border-emerald-500/20 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
      >
        <ArrowDown className="text-emerald-500 w-6 h-6" />
      </motion.div>
    </section>
  );
}
