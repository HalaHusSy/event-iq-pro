import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  baseAngle: number;
  baseDist: number;
}

const COLORS_LIGHT = [
  "#ef4444", // red
  "#f97316", // orange
  "#eab308", // yellow
  "#3b82f6", // blue
  "#8b5cf6", // purple
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#84cc16", // lime
];

const COLORS_DARK = [
  "#fca5a5", // red-300
  "#fdba74", // orange-300
  "#fde047", // yellow-300
  "#93c5fd", // blue-300
  "#c4b5fd", // violet-300
  "#f9a8d4", // pink-300
  "#67e8f9", // cyan-300
  "#bef264", // lime-300
];

export default function ParticleBackground({ density = 120 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = theme === "dark" ? COLORS_DARK : COLORS_LIGHT;
    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      cx = width / 2;
      cy = height / 2;
    };

    const init = () => {
      particlesRef.current = [];
      const maxRadius = Math.min(width, height) * 0.55;
      for (let i = 0; i < density; i++) {
        const angle = Math.random() * Math.PI * 2;
        // distribution between 20% and 100% of max radius — biased outward
        const r = (0.2 + Math.pow(Math.random(), 0.5) * 0.8) * maxRadius;
        particlesRef.current.push({
          x: cx + Math.cos(angle) * r,
          y: cy + Math.sin(angle) * r,
          vx: 0,
          vy: 0,
          radius: 1.5 + Math.random() * 2.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          baseAngle: angle,
          baseDist: r,
        });
      }
    };

    let frame = 0;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseActive = mouseRef.current.active;

      for (const p of particlesRef.current) {
        // Slow orbital drift around center
        p.baseAngle += 0.0008;
        const targetX = cx + Math.cos(p.baseAngle) * p.baseDist;
        const targetY = cy + Math.sin(p.baseAngle) * p.baseDist;

        // Spring toward orbital target
        p.vx += (targetX - p.x) * 0.005;
        p.vy += (targetY - p.y) * 0.005;

        // Mouse repulsion (close range) + attraction (mid range)
        if (mouseActive) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist2 = dx * dx + dy * dy;
          const dist = Math.sqrt(dist2);
          if (dist < 180 && dist > 0.5) {
            const force = (180 - dist) / 180; // 0..1
            // Repel outward
            p.vx += (dx / dist) * force * 1.8;
            p.vy += (dy / dist) * force * 1.8;
          }
        }

        // Damping
        p.vx *= 0.92;
        p.vy *= 0.92;

        p.x += p.vx;
        p.y += p.vy;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = theme === "dark" ? 0.7 : 0.85;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      rafRef.current = requestAnimationFrame(animate);
    };

    resize();
    init();
    animate();

    const onResize = () => {
      resize();
      init();
    };
    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("mouseout", onLeave);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [theme, density]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
