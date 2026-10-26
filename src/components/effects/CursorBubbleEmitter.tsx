"use client";

import React, { useEffect, useRef } from "react";

interface Bubble {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  initialRadius: number;
  alpha: number;
  maxLife: number;
  currentLife: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  wobblePhase: number;
  popped: boolean;
  popRadius: number;
  popAlpha: number;
}

const POOL_SIZE = 120;

export const CursorBubbleEmitter: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check for touch device or reduced motion
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouch || prefersReducedMotion) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Enable custom cursor styles
    document.body.classList.add("custom-cursor-active");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Object pool initialization
    const pool: Bubble[] = Array.from({ length: POOL_SIZE }, () => ({
      active: false,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      radius: 10,
      initialRadius: 10,
      alpha: 1,
      maxLife: 100,
      currentLife: 0,
      wobbleSpeed: 0.03,
      wobbleAmp: 1,
      wobblePhase: 0,
      popped: false,
      popRadius: 0,
      popAlpha: 0,
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;
    let prevMouseX = mouseX;
    let prevMouseY = mouseY;
    let ringX = mouseX;
    let ringY = mouseY;
    let isHovering = false;
    let isMouseDown = false;
    let hasMoved = false;

    const spawnBubble = (originX: number, originY: number, speed: number) => {
      // Find inactive slot in pool
      const bubble = pool.find((b) => !b.active);
      if (!bubble) return;

      const angle = Math.random() * Math.PI * 2;
      const spread = Math.random() * 8;
      bubble.active = true;
      bubble.x = originX + Math.cos(angle) * spread;
      bubble.y = originY + Math.sin(angle) * spread;

      const randomRadius = Math.random() * 18 + 4; // 4px to 22px
      bubble.radius = randomRadius;
      bubble.initialRadius = randomRadius;

      // Velocity: gentle upward drift with slight velocity inheritance
      bubble.vx = (Math.random() - 0.5) * 0.9;
      bubble.vy = -(Math.random() * 1.4 + 0.6) - Math.min(speed * 0.04, 1.2);

      bubble.alpha = Math.random() * 0.35 + 0.55;
      bubble.maxLife = Math.floor(Math.random() * 60 + 55); // 55 to 115 frames
      bubble.currentLife = 0;
      bubble.wobbleSpeed = Math.random() * 0.05 + 0.02;
      bubble.wobbleAmp = Math.random() * 1.4 + 0.5;
      bubble.wobblePhase = Math.random() * Math.PI * 2;
      bubble.popped = false;
      bubble.popRadius = 0;
      bubble.popAlpha = 0;
    };

    const handleMouseMove = (e: MouseEvent) => {
      hasMoved = true;
      mouseX = e.clientX;
      mouseY = e.clientY;

      const dx = mouseX - prevMouseX;
      const dy = mouseY - prevMouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Spawn rate based on mouse velocity
      if (dist > 3) {
        const spawnCount = Math.min(3, Math.max(1, Math.floor(dist / 14)));
        for (let i = 0; i < spawnCount; i++) {
          spawnBubble(mouseX, mouseY, dist);
        }
      }

      prevMouseX = mouseX;
      prevMouseY = mouseY;

      // Check if hovering over clickable or interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          "a, button, input, textarea, select, [role='button'], .glass-card, .interactive-hover"
        );
        isHovering = !!interactive;
      }
    };

    const handleMouseDown = () => {
      isMouseDown = true;
      // Burst 4 bubbles on click
      for (let i = 0; i < 4; i++) {
        spawnBubble(mouseX, mouseY, 25);
      }
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Animate custom cursor trailing ring
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

      if (cursorDotRef.current && hasMoved) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      if (cursorRingRef.current && hasMoved) {
        const scale = isMouseDown ? 0.8 : isHovering ? 1.75 : 1;
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;
        cursorRingRef.current.style.borderColor = isHovering
          ? "rgba(0, 240, 255, 0.9)"
          : "rgba(56, 189, 248, 0.45)";
        cursorRingRef.current.style.backgroundColor = isHovering
          ? "rgba(0, 240, 255, 0.08)"
          : "transparent";
      }

      // Update and draw bubbles
      for (let i = 0; i < POOL_SIZE; i++) {
        const b = pool[i];
        if (!b.active) continue;

        b.currentLife++;
        const progress = b.currentLife / b.maxLife;

        if (!b.popped) {
          // Physics
          b.x += b.vx + Math.sin(b.currentLife * b.wobbleSpeed + b.wobblePhase) * b.wobbleAmp;
          b.y += b.vy;
          b.vy *= 0.992; // Slight air drag

          // Shrink slightly as it evaporates
          const currentRadius = Math.max(2, b.initialRadius * (1 - progress * 0.35));
          const fadeAlpha = b.alpha * (1 - Math.pow(progress, 2.5));

          // Check if ready to pop
          if (progress >= 1 || (progress > 0.82 && Math.random() < 0.04)) {
            b.popped = true;
            b.popRadius = currentRadius * 0.7;
            b.popAlpha = Math.max(fadeAlpha, 0.35);
          } else {
            // Draw glass bubble with radial gradient
            ctx.save();
            ctx.beginPath();
            ctx.arc(b.x, b.y, currentRadius, 0, Math.PI * 2);

            // Translucent glass body gradient
            const grad = ctx.createRadialGradient(
              b.x - currentRadius * 0.3,
              b.y - currentRadius * 0.3,
              currentRadius * 0.1,
              b.x,
              b.y,
              currentRadius
            );
            grad.addColorStop(0, `rgba(255, 255, 255, ${fadeAlpha * 0.85})`);
            grad.addColorStop(0.35, `rgba(186, 230, 253, ${fadeAlpha * 0.4})`);
            grad.addColorStop(0.7, `rgba(56, 189, 248, ${fadeAlpha * 0.2})`);
            grad.addColorStop(1, `rgba(0, 240, 255, ${fadeAlpha * 0.05})`);

            ctx.fillStyle = grad;
            ctx.fill();

            // Glass rim edge
            ctx.strokeStyle = `rgba(224, 242, 254, ${fadeAlpha * 0.6})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Specular crescent / highlight
            ctx.beginPath();
            ctx.arc(
              b.x - currentRadius * 0.32,
              b.y - currentRadius * 0.32,
              Math.max(1, currentRadius * 0.22),
              0,
              Math.PI * 2
            );
            ctx.fillStyle = `rgba(255, 255, 255, ${fadeAlpha * 0.95})`;
            ctx.fill();

            ctx.restore();
          }
        } else {
          // Popped animation: expanding ring burst
          b.popRadius += 1.6;
          b.popAlpha *= 0.84;

          if (b.popAlpha < 0.03 || b.popRadius > b.initialRadius * 2.2) {
            b.active = false;
          } else {
            ctx.save();
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.popRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0, 240, 255, ${b.popAlpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Little tiny droplet sparks
            for (let j = 0; j < 3; j++) {
              const sparkAngle = (Math.PI * 2 * j) / 3 + b.popRadius * 0.2;
              const sx = b.x + Math.cos(sparkAngle) * b.popRadius;
              const sy = b.y + Math.sin(sparkAngle) * b.popRadius;
              ctx.beginPath();
              ctx.arc(sx, sy, 0.8, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(186, 230, 253, ${b.popAlpha})`;
              ctx.fill();
            }
            ctx.restore();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Fullscreen particle canvas overlay */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 h-full w-full"
      />

      {/* Custom Cursor Ring & Center Dot */}
      <div
        ref={cursorDotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff] transition-opacity duration-200 hidden md:block"
        style={{ willChange: "transform" }}
      />
      <div
        ref={cursorRingRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] h-8 w-8 rounded-full border border-sky-400/50 transition-[border-color,background-color] duration-150 hidden md:block"
        style={{ willChange: "transform" }}
      />
    </>
  );
};
