"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Create refs for multiple trail elements
  for (let i = 0; i < 5; i++) {
    trailsRef.current.push(null);
  }

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorRing = cursorRingRef.current;
    const trails = trailsRef.current.filter(Boolean) as HTMLDivElement[];

    if (!cursorDot || !cursorRing || trails.length === 0) return;

    // Always set cursor to none initially
    document.body.style.cursor = "none";

    let mouseX = 0;
    let mouseY = 0;
    let prevMouseX = 0;
    let prevMouseY = 0;
    const trailPositions = trails.map(() => ({ x: 0, y: 0 }));
    let isPointer = false;

    // Track mouse position with minimal processing
    const onMouseMove = (e: MouseEvent) => {
      prevMouseX = mouseX;
      prevMouseY = mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Handle cursor state for interactive elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.getAttribute("role") === "button" ||
        target.tagName.toLowerCase() === "input" ||
        target.tagName.toLowerCase() === "select" ||
        target.tagName.toLowerCase() === "textarea" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']");

      if (isInteractive && !isPointer) {
        isPointer = true;
        cursorDot.classList.add("active");
        cursorRing.classList.add("active");
      } else if (!isInteractive && isPointer) {
        isPointer = false;
        cursorDot.classList.remove("active");
        cursorRing.classList.remove("active");
      }
    };

    // Handle click effect
    const onMouseDown = () => {
      cursorDot.classList.add("clicking");
      cursorRing.classList.add("clicking");

      // Create click burst effect
      const burstElement = document.createElement("div");
      burstElement.className = "cursor-burst";
      burstElement.style.left = `${mouseX}px`;
      burstElement.style.top = `${mouseY}px`;
      document.body.appendChild(burstElement);

      // Remove burst element after animation completes
      setTimeout(() => {
        if (document.body.contains(burstElement)) {
          document.body.removeChild(burstElement);
        }
      }, 700);
    };

    const onMouseUp = () => {
      cursorDot.classList.remove("clicking");
      cursorRing.classList.remove("clicking");
    };

    // Efficient animation loop with minimal calculations
    const animateCursor = () => {
      // Move cursor dot and ring directly to mouse position (no lag)
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      cursorRing.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

      // Calculate mouse speed for trail intensity
      const speed = Math.sqrt(
        Math.pow(mouseX - prevMouseX, 2) + Math.pow(mouseY - prevMouseY, 2)
      );

      // Update trail positions with different follow speeds
      trails.forEach((trail, index) => {
        // Different follow speeds for each trail element
        const followSpeed = 0.15 - index * 0.02;

        // Update position with easing
        trailPositions[index].x +=
          (mouseX - trailPositions[index].x) * followSpeed;
        trailPositions[index].y +=
          (mouseY - trailPositions[index].y) * followSpeed;

        // Apply position
        trail.style.transform = `translate(${trailPositions[index].x}px, ${trailPositions[index].y}px)`;

        // Adjust opacity based on mouse speed
        const baseOpacity = 0.7 - index * 0.12;
        const speedFactor = Math.min(speed / 20, 1);
        trail.style.opacity = (baseOpacity * (1 + speedFactor)).toString();

        // Adjust size based on mouse speed
        const baseSize = 30 - index * 3;
        const sizeIncrease = speedFactor * 15;
        trail.style.width = `${baseSize + sizeIncrease}px`;
        trail.style.height = `${baseSize + sizeIncrease}px`;
      });

      prevMouseX = mouseX;
      prevMouseY = mouseY;
      requestAnimationFrame(animateCursor);
    };

    // Add event listeners
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    // Start animation
    animateCursor();

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        /* Hide the native cursor everywhere */
        * {
          cursor: none !important;
        }

        .cursor-dot {
          position: fixed;
          left: 0;
          top: 0;
          width: 8px;
          height: 8px;
          background-color: rgba(16, 185, 129, 1);
          border-radius: 50%;
          pointer-events: none;
          z-index: 10000;
          transform: translate(-50%, -50%);
          transition: width 0.2s, height 0.2s, background-color 0.2s;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.8);
        }

        .cursor-ring {
          position: fixed;
          left: 0;
          top: 0;
          width: 24px;
          height: 24px;
          border: 2px solid rgba(16, 185, 129, 0.8);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: width 0.2s, height 0.2s, background-color 0.2s,
            border-color 0.2s;
        }

        .cursor-trail {
          position: fixed;
          left: 0;
          top: 0;
          width: 30px;
          height: 30px;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          filter: blur(5px);
        }

        .cursor-trail-1 {
          background: radial-gradient(
            circle,
            rgba(80, 250, 123, 0.7) 0%,
            rgba(16, 185, 129, 0) 70%
          );
        }

        .cursor-trail-2 {
          background: radial-gradient(
            circle,
            rgba(16, 185, 129, 0.6) 0%,
            rgba(16, 185, 129, 0) 70%
          );
        }

        .cursor-trail-3 {
          background: radial-gradient(
            circle,
            rgba(5, 150, 105, 0.5) 0%,
            rgba(5, 150, 105, 0) 70%
          );
        }

        .cursor-trail-4 {
          background: radial-gradient(
            circle,
            rgba(6, 95, 70, 0.4) 0%,
            rgba(6, 95, 70, 0) 70%
          );
        }

        .cursor-trail-5 {
          background: radial-gradient(
            circle,
            rgba(4, 120, 87, 0.3) 0%,
            rgba(4, 120, 87, 0) 70%
          );
        }

        .cursor-burst {
          position: fixed;
          left: 0;
          top: 0;
          width: 0;
          height: 0;
          background: radial-gradient(
            circle,
            rgba(80, 250, 123, 0.8) 0%,
            rgba(16, 185, 129, 0) 70%
          );
          border-radius: 50%;
          pointer-events: none;
          z-index: 9997;
          transform: translate(-50%, -50%);
          filter: blur(3px);
          animation: burstAnimation 0.7s forwards;
        }

        .cursor-dot.active {
          width: 12px;
          height: 12px;
          background-color: rgba(80, 250, 123, 1);
        }

        .cursor-ring.active {
          width: 36px;
          height: 36px;
          background-color: rgba(16, 185, 129, 0.2);
          border-color: rgba(80, 250, 123, 1);
        }

        .cursor-dot.clicking {
          width: 10px;
          height: 10px;
          background-color: rgba(80, 250, 123, 1);
        }

        .cursor-ring.clicking {
          width: 20px;
          height: 20px;
          border-color: rgba(80, 250, 123, 1);
          background-color: rgba(80, 250, 123, 0.3);
        }

        @keyframes burstAnimation {
          0% {
            width: 0;
            height: 0;
            opacity: 0.8;
          }
          100% {
            width: 120px;
            height: 120px;
            opacity: 0;
          }
        }

        /* Disable on mobile */
        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
          .cursor-dot,
          .cursor-ring,
          .cursor-trail,
          .cursor-burst {
            display: none;
          }
        }
      `}</style>

      <div ref={cursorDotRef} className="cursor-dot"></div>
      <div ref={cursorRingRef} className="cursor-ring"></div>

      {/* Multiple trail elements for a more pronounced fire effect */}
      <div
        ref={(el) => {
          trailsRef.current[0] = el;
        }}
        className="cursor-trail cursor-trail-1"
      ></div>
      <div
        ref={(el) => {
          trailsRef.current[1] = el;
        }}
        className="cursor-trail cursor-trail-2"
      ></div>
      <div
        ref={(el) => {
          trailsRef.current[2] = el;
        }}
        className="cursor-trail cursor-trail-3"
      ></div>
      <div
        ref={(el) => {
          trailsRef.current[3] = el;
        }}
        className="cursor-trail cursor-trail-4"
      ></div>
      <div
        ref={(el) => {
          trailsRef.current[4] = el;
        }}
        className="cursor-trail cursor-trail-5"
      ></div>
    </>
  );
}
