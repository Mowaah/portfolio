"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Regenerate stars when resizing
      initStars();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Initialize stars
    function initStars() {
      if (!canvas) return;
      const starCount = Math.floor((canvas.width * canvas.height) / 10000); // Adjust density here
      starsRef.current = [];

      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          speed: Math.random() * 0.05 + 0.01,
          twinkleSpeed: Math.random() * 0.01 + 0.003,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    }

    // Animation loop
    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      starsRef.current.forEach((star) => {
        // Update star position (subtle drift)
        star.y += star.speed;

        // Wrap around when star goes off screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }

        // Twinkle effect
        star.twinklePhase += star.twinkleSpeed;
        const twinkleFactor = (Math.sin(star.twinklePhase) + 1) / 2;
        const currentOpacity = star.opacity * (0.5 + twinkleFactor * 0.5);

        // Draw star with green tint
        const greenIntensity = 0.7 + twinkleFactor * 0.3;

        // Create gradient for star glow
        const gradient = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          star.size * 2
        );

        gradient.addColorStop(
          0,
          `rgba(80, 250, 123, ${currentOpacity * greenIntensity})`
        );
        gradient.addColorStop(
          0.5,
          `rgba(16, 185, 129, ${currentOpacity * 0.5})`
        );
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    // Start animation
    initStars();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}
