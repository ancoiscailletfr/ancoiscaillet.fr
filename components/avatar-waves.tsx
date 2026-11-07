'use client';
import { useEffect, useRef } from 'react';

function start(c: HTMLCanvasElement) {
  const box = c.parentElement,
    ctx = c.getContext('2d');
  if (!box || !ctx) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let still = motion.matches,
    raf = 0;
  let W = 0,
    R = 0,
    mouse = 0,
    pull = 0,
    target = 0,
    targetPull = 0;
  function size() {
    if (!box || !ctx) return;
    const s = c.getBoundingClientRect().width,
      d = devicePixelRatio || 1;
    c.width = c.height = s * d;
    ctx.setTransform(d, 0, 0, d, 0, 0);
    W = s;
    R = box.offsetWidth / 2 - 2;
  }
  const resizeObserver = new ResizeObserver(() => {
    size();
    if (still) frame(0);
  });
  resizeObserver.observe(box);
  const pointer = (e: PointerEvent) => {
    if (!box) return;
    const r = box.getBoundingClientRect(),
      dx = e.clientX - r.left - r.width / 2,
      dy = e.clientY - r.top - r.height / 2;
    target = Math.atan2(dy, dx);
    targetPull = Math.min(1, 300 / Math.hypot(dx, dy));
  };
  addEventListener('pointermove', pointer);
  // Chaque onde : couleur, amplitude, fréquences (lobes) et vitesses différentes
  const waves = [
    { col: 'accent', amp: 5, k: [3, 5], v: [0.9, -1.3] },
    { col: 'orange', amp: 6, k: [4, 2], v: [-0.7, 1.1] },
    { col: 'lavender', amp: 3.5, k: [6, 3], v: [1.6, -0.5] },
  ] as const;
  let colors = { accent: '', orange: '', lavender: '' },
    light = false,
    visible = true;
  const intersectionObserver = new IntersectionObserver(([e]) => {
    if (!e) return;
    visible = e.isIntersecting;
    cancelAnimationFrame(raf);
    if (visible && !still && !document.hidden) raf = requestAnimationFrame(frame);
  });
  intersectionObserver.observe(box);
  function theme() {
    const css = getComputedStyle(document.documentElement);
    colors = {
      accent: css.getPropertyValue('--accent').trim(),
      orange: css.getPropertyValue('--orange').trim(),
      lavender: css.getPropertyValue('--lavender').trim(),
    };
    light = document.documentElement.dataset.theme === 'light';
    if (still) frame(0);
  }
  const themeObserver = new MutationObserver(theme);
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  function frame(t: number) {
    if (!ctx) return;
    t /= 1000;
    mouse += Math.atan2(Math.sin(target - mouse), Math.cos(target - mouse)) * 0.05;
    pull += (targetPull - pull) * 0.05;
    ctx.clearRect(0, 0, W, W);
    ctx.globalCompositeOperation = light ? 'multiply' : 'lighter';
    const cx = W / 2,
      beat = 0.75 + 0.25 * Math.sin(t * 2.1) * Math.sin(t * 0.7);
    for (const w of waves) {
      ctx.beginPath();
      for (let i = 0; i <= 120; i++) {
        const a = (i / 120) * Math.PI * 2;
        const near = 1 + pull * 1.6 * Math.max(0, Math.cos(a - mouse)) ** 3;
        const r =
          R +
          2 +
          w.amp *
            beat *
            near *
            (Math.sin(w.k[0] * a + w.v[0] * t) * 0.6 +
              Math.sin(w.k[1] * a + w.v[1] * t + 1) * 0.4 +
              0.6);
        const x = cx + Math.cos(a) * r,
          y = cx + Math.sin(a) * r;
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.strokeStyle = colors[w.col];
      ctx.lineWidth = 2;
      ctx.shadowColor = colors[w.col];
      ctx.shadowBlur = light ? 6 : 14;
      ctx.globalAlpha = light ? 0.65 : 0.85;
      ctx.stroke();
    }
    if (!still && !document.hidden && visible) raf = requestAnimationFrame(frame);
  }
  size();
  theme();
  box.classList.add('wave-ready');
  if (!still && !document.hidden) raf = requestAnimationFrame(frame);
  const visibility = () => {
    cancelAnimationFrame(raf);
    if (!document.hidden && !still && visible) raf = requestAnimationFrame(frame);
  };
  document.addEventListener('visibilitychange', visibility);
  const change = () => {
    still = motion.matches;
    cancelAnimationFrame(raf);
    if (still) frame(0);
    else if (!document.hidden && visible) raf = requestAnimationFrame(frame);
  };
  motion.addEventListener('change', change);
  return () => {
    cancelAnimationFrame(raf);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    themeObserver.disconnect();
    removeEventListener('pointermove', pointer);
    document.removeEventListener('visibilitychange', visibility);
    motion.removeEventListener('change', change);
  };
}
export function AvatarWaves() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    return start(canvas);
  }, []);
  // biome-ignore lint/a11y/noAriaHiddenOnFocusable: Decorative canvas is not focusable.
  return <canvas ref={ref} aria-hidden="true" />;
}
