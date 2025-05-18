"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showHireDialog, setShowHireDialog] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHireClick = () => {
    // Close mobile menu if open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }

    // Show the hire dialog
    setShowHireDialog(true);
  };

  const scrollToContact = () => {
    // Close dialog
    setShowHireDialog(false);

    // Scroll to contact section
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md py-2 shadow-md"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="#home">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
            aria-label="Mohamed Bahaa - Frontend Developer"
          >
            <div className="flex items-center">
              <div className="relative h-10 w-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-emerald-500 rounded-lg rotate-45 transform -translate-x-1 translate-y-1"></div>
                <div className="absolute inset-0 border-2 border-white rounded-lg rotate-45"></div>
                <span className="relative text-white font-bold text-xl z-10">
                  M
                </span>
              </div>
              <div className="ml-1 relative h-10 w-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-emerald-500/30 rounded-lg rotate-45 transform translate-x-1 -translate-y-1"></div>
                <div className="absolute inset-0 border-2 border-emerald-500 rounded-lg rotate-45"></div>
                <span className="relative text-white font-bold text-xl z-10">
                  B
                </span>
              </div>
              <div className="ml-2 h-6 w-1 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full"></div>
              <div className="ml-2 text-sm font-light tracking-wider text-gray-300">
                <span className="block text-xs">FRONTEND</span>
                <span className="block text-xs">DEVELOPER</span>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className="text-gray-300 hover:text-emerald-400 transition-colors flex items-center"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: navItems.length * 0.1 }}
          >
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={handleHireClick}
            >
              Hire Me
            </Button>
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:bg-emerald-900/20"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-emerald-900/50"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-emerald-400 transition-colors py-2 flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <a href="/Mohamed_Bahaa_CV.pdf" download className="w-full">
                <Button
                  variant="outline"
                  className="border-emerald-600 text-emerald-400 hover:bg-emerald-950/50 hover:text-emerald-300 w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Download className="mr-2 h-4 w-4" /> Download CV
                </Button>
              </a>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 text-white w-full"
                onClick={handleHireClick}
              >
                Hire Me
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hire Me Dialog */}
      <Dialog open={showHireDialog} onOpenChange={setShowHireDialog}>
        <DialogContent className="bg-background border border-emerald-900/50 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Ready to Work Together?
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-center">
              I'm currently available for freelance projects and full-time
              opportunities.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="bg-emerald-950/30 p-4 rounded-lg border border-emerald-900/50">
              <h3 className="font-medium text-emerald-400 mb-2 flex items-center">
                <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                Available for:
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  Frontend Development Projects
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  React & Next.js Applications
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  Api Integration
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  Full-time Positions
                </li>
              </ul>
            </div>

            <div className="flex flex-col space-y-3">
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={scrollToContact}
              >
                Contact Me
              </Button>
              <a href="/Mohamed_Bahaa_CV.pdf" download>
                <Button
                  variant="outline"
                  className="border-emerald-600 text-emerald-400 hover:bg-emerald-950/50 w-full"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </a>
            </div>
          </div>

          <DialogFooter className="sm:justify-center">
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}
