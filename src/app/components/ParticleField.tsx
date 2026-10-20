"use client";
import { useEffect, useRef } from "react";

// Particle outline that sits in each section's art slot (an empty grid column,
// alternating sides). When the next section scrolls in, the particles scatter
// through the middle of the page and re-form in that section's slot.
// The pointer pushes them aside. Desktop + motion-allowed only.

type Point = [number, number];

// Polylines in a unit box centred on 0,0; accent strokes draw in --accent.
interface Stroke {
  pts: Point[];
  accent?: boolean;
}

export type ShapeName = "moon" | "phone" | "briefcase" | "cap" | "code";

export interface ParticleSection {
  // Section element id; its `[data-particle-slot]` child positions the shape.
  id: string;
  shape: ShapeName;
}

interface Target {
  x: number;
  y: number;
  accent: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  // Unit scatter direction used while morphing between shapes.
  sx: number;
  sy: number;
  phase: number;
}

interface SlotBox {
  x: number;
  size: number;
}

// Must match the canvas's `motion-safe:lg:block` class.
const ENABLE_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const SLOT_SELECTOR = "[data-particle-slot]";
const PARTICLE_COUNT = 700;
const MIN_SLOT = 160;
const MAX_SHAPE_SIZE = 340;
// The next section starts pulling the particles when its top passes START_LINE
// (fraction of viewport height) and they have fully re-formed by SETTLE_LINE.
const START_LINE = 0.9;
const SETTLE_LINE = 0.45;
const LINK_DIST = 14;
const MAX_LINKS = 2;
const POINTER_RADIUS = 100;
const SPRING = 0.05;
const DAMPING = 0.8;

const arc = (cx: number, cy: number, r: number, a0: number, a1: number, n = 32): Point[] =>
  Array.from({ length: n + 1 }, (_, k) => {
    const a = ((a0 + ((a1 - a0) * k) / n) * Math.PI) / 180;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  });

const circle = (cx: number, cy: number, r: number) => arc(cx, cy, r, 0, 360, 24);

const rect = (x0: number, y0: number, x1: number, y1: number): Point[] => [
  [x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0],
];

const SHAPES: Record<ShapeName, Stroke[]> = {
  moon: [
    { pts: arc(0, 0, 0.46, 0, 360, 72) },
    { pts: circle(-0.16, -0.14, 0.11), accent: true },
    { pts: circle(0.18, 0.06, 0.08) },
    { pts: circle(-0.06, 0.24, 0.07) },
    { pts: circle(0.12, -0.27, 0.05) },
    { pts: circle(-0.3, 0.12, 0.045) },
  ],
  phone: [
    { pts: rect(-0.24, -0.46, 0.24, 0.46) },
    { pts: [[-0.06, -0.39], [0.06, -0.39]], accent: true },
    { pts: [[-0.08, 0.38], [0.08, 0.38]], accent: true },
  ],
  briefcase: [
    { pts: rect(-0.44, -0.18, 0.44, 0.34) },
    { pts: [[-0.14, -0.18], [-0.14, -0.32], [0.14, -0.32], [0.14, -0.18]] },
    { pts: [[-0.44, 0.04], [0.44, 0.04]], accent: true },
  ],
  cap: [
    { pts: [[-0.46, -0.1], [0, -0.3], [0.46, -0.1], [0, 0.1], [-0.46, -0.1]] },
    { pts: [[-0.26, -0.01], [-0.26, 0.24], [0, 0.32], [0.26, 0.24], [0.26, -0.01]] },
    { pts: [[0.46, -0.1], [0.46, 0.22]], accent: true },
  ],
  code: [
    { pts: [[-0.18, -0.28], [-0.44, 0], [-0.18, 0.28]] },
    { pts: [[0.18, -0.28], [0.44, 0], [0.18, 0.28]] },
    { pts: [[0.1, -0.36], [-0.1, 0.36]], accent: true },
  ],
};

// Spreads `count` points evenly along every segment of the shape, with a little
// jitter across the stroke so the outline reads as particles, not a line.
const sampleShape = (strokes: Stroke[], count: number): Target[] => {
  const segs = strokes.flatMap((s) =>
    s.pts.slice(1).map((b, k) => ({ a: s.pts[k], b, accent: Boolean(s.accent) }))
  );
  const lens = segs.map(({ a, b }) => Math.hypot(b[0] - a[0], b[1] - a[1]));
  const total = lens.reduce((sum, l) => sum + l, 0);

  return Array.from({ length: count }, (_, i) => {
    let d = ((i + 0.5) / count) * total;
    let s = 0;
    while (s < segs.length - 1 && d > lens[s]) d -= lens[s++];
    const { a, b, accent } = segs[s];
    const len = lens[s] || 1;
    const f = d / len;
    const jitter = (Math.random() - 0.5) * 0.045;
    return {
      x: a[0] + (b[0] - a[0]) * f - ((b[1] - a[1]) / len) * jitter,
      y: a[1] + (b[1] - a[1]) * f + ((b[0] - a[0]) / len) * jitter,
      accent,
    };
  });
};

const smoothstep = (x: number) => {
  const c = Math.min(1, Math.max(0, x));
  return c * c * (3 - 2 * c);
};

export default function ParticleField({ sections }: { sections: ParticleSection[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const enableQuery = window.matchMedia(ENABLE_QUERY);
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const shapes = sections.map(({ shape }) => sampleShape(SHAPES[shape], PARTICLE_COUNT));
    const pointer = { x: -9999, y: -9999 };
    const colors = { base: "", accent: "" };
    let sectionEls: (HTMLElement | null)[] = [];
    let slotEls: (HTMLElement | null)[] = [];
    let particles: Particle[] = [];
    let raf = 0;

    const readColors = () => {
      const style = getComputedStyle(document.documentElement);
      colors.base = style.getPropertyValue("--fg-muted").trim();
      colors.accent = style.getPropertyValue("--accent").trim();
    };

    // Particles start scattered across the viewport and spring into the first shape.
    const seed = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => {
        const angle = Math.random() * Math.PI * 2;
        const r = 0.4 + Math.random() * 0.6;
        return {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: 0,
          vy: 0,
          sx: Math.cos(angle) * r,
          sy: Math.sin(angle) * r,
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    // Active section, the one taking over, and 0..1 progress of that hand-off.
    const scrollState = (vh: number) => {
      const tops = sectionEls.map((el) => (el ? el.getBoundingClientRect().top : Infinity));
      let k = 0;
      while (k < tops.length - 1 && tops[k + 1] < vh * SETTLE_LINE) k++;
      if (k === tops.length - 1) return { k, next: k, v: 0 };
      const v = smoothstep((vh * START_LINE - tops[k + 1]) / (vh * (START_LINE - SETTLE_LINE)));
      return { k, next: k + 1, v };
    };

    const slotBox = (el: HTMLElement | null, vh: number): SlotBox | null => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      if (r.width < MIN_SLOT) return null;
      return { x: r.left + r.width / 2, size: Math.min(r.width * 0.8, vh * 0.5, MAX_SHAPE_SIZE) };
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      if (canvas.width !== vw * dpr || canvas.height !== vh * dpr) {
        canvas.width = vw * dpr;
        canvas.height = vh * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, vw, vh);

      const { k, next, v } = scrollState(vh);
      const slotA = slotBox(slotEls[k], vh);
      const slotB = slotBox(slotEls[next], vh);
      if (!slotA || !slotB) return;

      const t = now / 1000;
      const headerBottom = document.querySelector("header")?.getBoundingClientRect().bottom ?? 0;
      // Slots sit on opposite sides, so the lerp carries the swarm through the middle.
      const swing = Math.sin(Math.PI * v);
      const breath = 1 + Math.sin(t * 0.6) * 0.025;
      const size = (slotA.size + (slotB.size - slotA.size) * v) * breath;
      const cx = slotA.x + (slotB.x - slotA.x) * v;
      const cy = (vh + headerBottom) / 2 - swing * vh * 0.08;
      const scatter = swing * size * 0.8;
      const from = shapes[k];
      const to = shapes[next];
      const isAccent: boolean[] = [];

      particles.forEach((p, i) => {
        const a = from[i];
        const b = to[i];
        const tx = cx + (a.x + (b.x - a.x) * v) * size + p.sx * scatter + Math.sin(t * 0.8 + p.phase) * 1.2;
        const ty = cy + (a.y + (b.y - a.y) * v) * size + p.sy * scatter + Math.cos(t * 0.6 + p.phase) * 1.2;
        p.vx += (tx - p.x) * SPRING;
        p.vy += (ty - p.y) * SPRING;
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const d = Math.hypot(dx, dy);
        if (d < POINTER_RADIUS) {
          const force = ((POINTER_RADIUS - d) / POINTER_RADIUS) * 2;
          p.vx += (dx / (d || 1)) * force;
          p.vy += (dy / (d || 1)) * force;
        }
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x += p.vx;
        p.y += p.vy;
        isAccent[i] = v < 0.5 ? a.accent : b.accent;
      });

      // Link near neighbours via a spatial hash so this stays O(n), not O(n²).
      const grid = new Map<string, number[]>();
      particles.forEach((p, i) => {
        const key = `${Math.floor(p.x / LINK_DIST)},${Math.floor(p.y / LINK_DIST)}`;
        const cell = grid.get(key);
        if (cell) cell.push(i);
        else grid.set(key, [i]);
      });
      const lines = [new Path2D(), new Path2D()];
      const dots = [new Path2D(), new Path2D()];
      particles.forEach((p, i) => {
        const color = isAccent[i] ? 1 : 0;
        dots[color].rect(p.x - 0.8, p.y - 0.8, 1.6, 1.6);
        const gx = Math.floor(p.x / LINK_DIST);
        const gy = Math.floor(p.y / LINK_DIST);
        let links = 0;
        for (let ox = -1; ox <= 1 && links < MAX_LINKS; ox++) {
          for (let oy = -1; oy <= 1 && links < MAX_LINKS; oy++) {
            for (const j of grid.get(`${gx + ox},${gy + oy}`) ?? []) {
              if (j <= i || links >= MAX_LINKS) continue;
              const o = particles[j];
              if (Math.hypot(o.x - p.x, o.y - p.y) < LINK_DIST) {
                lines[color].moveTo(p.x, p.y);
                lines[color].lineTo(o.x, o.y);
                links++;
              }
            }
          }
        }
      });

      const palette = [colors.base, colors.accent];
      ctx.lineWidth = 0.6;
      ctx.globalAlpha = 0.3;
      lines.forEach((path, c) => {
        ctx.strokeStyle = palette[c];
        ctx.stroke(path);
      });
      ctx.globalAlpha = 0.85;
      dots.forEach((path, c) => {
        ctx.fillStyle = palette[c];
        ctx.fill(path);
      });
      ctx.globalAlpha = 1;
    };

    const start = () => {
      if (raf) return;
      sectionEls = sections.map(({ id }) => document.getElementById(id));
      slotEls = sectionEls.map((el) => el?.querySelector<HTMLElement>(SLOT_SELECTOR) ?? null);
      readColors();
      seed();
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const onEnableChange = () => (enableQuery.matches ? start() : stop());
    const onPointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    // ThemeToggle flips data-theme on <html>; the OS can flip the colour scheme.
    const themeObserver = new MutationObserver(readColors);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    enableQuery.addEventListener("change", onEnableChange);
    darkQuery.addEventListener("change", readColors);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    onEnableChange();

    return () => {
      stop();
      themeObserver.disconnect();
      enableQuery.removeEventListener("change", onEnableChange);
      darkQuery.removeEventListener("change", readColors);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [sections]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 hidden h-full w-full motion-safe:lg:block"
    />
  );
}
