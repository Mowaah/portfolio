"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles } from "lucide-react";

interface SuccessAnimationProps {
  show: boolean;
  onComplete: () => void;
}

export default function SuccessAnimation({
  show,
  onComplete,
}: SuccessAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showMessage, setShowMessage] = useState(false);

  // Fireworks animation using canvas
  useEffect(() => {
    if (!show || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle class for fireworks
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      gravity: number;
      friction: number;
      life: number;
      maxLife: number;

      constructor(
        x: number,
        y: number,
        size: number,
        color: string,
        speedFactor = 1
      ) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * size + 1;
        this.speedX = (Math.random() - 0.5) * (6 * speedFactor);
        this.speedY = (Math.random() - 0.5) * (6 * speedFactor);
        this.color = color;
        this.alpha = 1;
        this.gravity = 0.1;
        this.friction = 0.98;
        this.life = 0;
        this.maxLife = Math.random() * 80 + 50;
      }

      update() {
        this.speedY += this.gravity;
        this.speedX *= this.friction;
        this.speedY *= this.friction;
        this.x += this.speedX;
        this.y += this.speedY;
        this.life++;
        this.alpha = 1 - this.life / this.maxLife;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Firework class
    class Firework {
      x: number;
      y: number;
      targetY: number;
      speed: number;
      particles: Particle[];
      color: string;
      hasExploded: boolean;

      constructor(x: number, targetY: number) {
        this.x = x;
        this.y = canvas.height;
        this.targetY = targetY;
        this.speed = 8;
        this.particles = [];
        this.color = this.getRandomGreenColor();
        this.hasExploded = false;
      }

      getRandomGreenColor() {
        const colors = [
          "#50fa7b", // Bright green
          "#10b981", // Emerald
          "#34d399", // Green/teal
          "#059669", // Deep green
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Move firework up until it reaches target height
        if (this.y > this.targetY) {
          this.y -= this.speed;
        } else if (!this.hasExploded) {
          // Explode
          this.explode();
          this.hasExploded = true;
        }

        // Update particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
          this.particles[i].update();

          // Remove dead particles
          if (this.particles[i].alpha <= 0) {
            this.particles.splice(i, 1);
          }
        }
      }

      explode() {
        const particleCount = Math.floor(Math.random() * 50) + 50;
        for (let i = 0; i < particleCount; i++) {
          this.particles.push(new Particle(this.x, this.y, 3, this.color));
        }

        // Add some special particles with trails
        for (let i = 0; i < 10; i++) {
          const specialParticle = new Particle(
            this.x,
            this.y,
            4,
            "#ffffff",
            1.5
          );
          specialParticle.maxLife = specialParticle.maxLife * 1.5;
          this.particles.push(specialParticle);
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (!this.hasExploded) {
          // Draw rocket
          ctx.beginPath();
          ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();

          // Draw trail
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x, this.y + 10);
          ctx.strokeStyle = this.color;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Draw particles
        for (const particle of this.particles) {
          particle.draw(ctx);
        }
      }

      isFinished() {
        return this.hasExploded && this.particles.length === 0;
      }
    }

    const fireworks: Firework[] = [];
    let animationId: number;
    let lastFireworkTime = 0;
    const fireworkInterval = 300; // Launch a new firework every 300ms

    // Animation loop
    const animate = (timestamp: number) => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Launch new fireworks
      if (
        timestamp - lastFireworkTime > fireworkInterval &&
        fireworks.length < 5
      ) {
        const x = Math.random() * canvas.width;
        const targetY = Math.random() * (canvas.height * 0.6);
        fireworks.push(new Firework(x, targetY));
        lastFireworkTime = timestamp;
      }

      // Update and draw fireworks
      for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].draw(ctx);

        // Remove finished fireworks
        if (fireworks[i].isFinished()) {
          fireworks.splice(i, 1);
        }
      }

      // Continue animation if there are fireworks or if we're still showing
      if (fireworks.length > 0 || timestamp < 5000) {
        animationId = requestAnimationFrame(animate);
      } else {
        // Animation complete
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    };

    // Start animation
    animationId = requestAnimationFrame(animate);

    // Show success message after a short delay
    setTimeout(() => {
      setShowMessage(true);
    }, 500);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      setShowMessage(false);
    };
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0" />

      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="bg-background/80 backdrop-blur-md p-8 rounded-xl border border-emerald-500/30 shadow-lg shadow-emerald-500/20 text-center z-10 max-w-md"
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", bounce: 0.6, delay: 0.2 }}
              className="mb-4 flex justify-center"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                  className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center"
                >
                  <Send className="h-10 w-10 text-white" />
                </motion.div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute -top-2 -right-2"
                >
                  <Sparkles className="h-8 w-8 text-yellow-400" />
                </motion.div>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-white mb-2"
            >
              Message Sent!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-300 mb-6"
            >
              Your message has been launched into space! I'll get back to you as
              soon as it reaches my orbit.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <button
                onClick={onComplete}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors"
              >
                Continue Exploring
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
