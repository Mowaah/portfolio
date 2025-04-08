"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md py-2 shadow-md" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="#home">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="flex items-center">
              <div className="relative h-10 w-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-emerald-500 rounded-lg rotate-45 transform -translate-x-1 translate-y-1"></div>
                <div className="absolute inset-0 border-2 border-white rounded-lg rotate-45"></div>
                <span className="relative text-white font-bold text-xl z-10">M</span>
              </div>
              <div className="ml-1 relative h-10 w-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-emerald-500/30 rounded-lg rotate-45 transform translate-x-1 -translate-y-1"></div>
                <div className="absolute inset-0 border-2 border-emerald-500 rounded-lg rotate-45"></div>
                <span className="relative text-white font-bold text-xl z-10">B</span>
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
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={item.href} className="text-gray-300 hover:text-emerald-400 transition-colors">
                {item.name}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: navItems.length * 0.1 }}
          >
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Hire Me</Button>
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:bg-emerald-900/20"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
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
                  className="text-gray-300 hover:text-emerald-400 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">Hire Me</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

