"use client";

import type React from "react";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SuccessAnimation from "./success-animation";
import { useToast } from "@/hooks/use-toast";
import { Github, Linkedin, Instagram, Mail, Phone, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Label } from "@/components/ui/label";

export default function Contact() {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    // Basic check to ensure environment variables are loaded
    if (!serviceID || !templateID || !publicKey) {
      console.error("EmailJS environment variables not configured.");
      toast({
        title: "Configuration Error",
        description:
          "The contact form is not configured correctly. Please contact the site administrator.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.sendForm(serviceID, templateID, formRef.current, publicKey);
      setShowSuccessAnimation(true);
      formRef.current.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      toast({
        title: "Uh oh! Something went wrong.",
        description:
          "There was a problem sending your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAnimationComplete = () => {
    setShowSuccessAnimation(false);
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="h-5 w-5" />,
      url: "https://github.com/Mowaah",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      url: "https://www.linkedin.com/in/mohamed-bahaa-75646127a/",
    },
    {
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      url: "https://www.instagram.com/mowax/",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2 text-white">Get In Touch</h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-300">
            Have a project in mind or want to discuss potential opportunities?
            Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="h-full border-emerald-900/50 bg-background/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6 text-white">
                  Contact Information
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                      <Mail className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Email</p>
                      <a
                        href="mailto:mohamed.bahaa5300@gmail.com"
                        className="text-gray-400 hover:text-emerald-400 transition-colors"
                      >
                        mohamed.bahaa5300@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                      <Phone className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Phone</p>
                      <a
                        href="tel:+200153726975"
                        className="text-gray-400 hover:text-emerald-400 transition-colors"
                      >
                        +20 153726975
                      </a>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4 text-white">
                  Connect With Me
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-emerald-950/50 rounded-full border border-emerald-900/50 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-colors text-white"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                      aria-label={link.name}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-emerald-900/50 bg-background/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6 text-white">
                  Send Me a Message
                </h3>
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-name">Your Name</Label>
                      <Input
                        id="contact-name"
                        name="name"
                        placeholder="e.g. John Doe"
                        required
                        className="bg-emerald-950/30 border-emerald-900/50 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-email">Your Email</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        name="user_email"
                        placeholder="e.g. john@example.com"
                        required
                        className="bg-emerald-950/30 border-emerald-900/50 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-subject">Subject</Label>
                    <Input
                      id="contact-subject"
                      name="subject"
                      placeholder="Subject"
                      required
                      className="bg-emerald-950/30 border-emerald-900/50 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-message">Your Message</Label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      placeholder="I'd like to discuss..."
                      required
                      className="min-h-[150px] bg-emerald-950/30 border-emerald-900/50 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <SuccessAnimation
        show={showSuccessAnimation}
        onComplete={handleAnimationComplete}
      />
    </section>
  );
}
