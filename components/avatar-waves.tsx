'use client';

import { useEffect, useRef } from 'react';
import { type PaletteColor, startCanvasLoop } from '../lib/canvas-loop';

// Each wave has its own color, amplitude, lobe frequencies, and speeds.
const WAVES = [
  {
    color: 'accent',
    amplitude: 5,
    primary: { frequency: 3, speed: 0.9 },
    secondary: { frequency: 5, speed: -1.3 },
  },
  {
    color: 'orange',
    amplitude: 6,
    primary: { frequency: 4, speed: -0.7 },
    secondary: { frequency: 2, speed: 1.1 },
  },
  {
    color: 'lavender',
    amplitude: 3.5,
    primary: { frequency: 6, speed: 1.6 },
    secondary: { frequency: 3, speed: -0.5 },
  },
] satisfies ReadonlyArray<{
  color: PaletteColor;
  amplitude: number;
  primary: { frequency: number; speed: number };
  secondary: { frequency: number; speed: number };
}>;

function startAvatarWaves(canvas: HTMLCanvasElement) {
  const box = canvas.parentElement;
  if (!box) return;

  let canvasWidth = 0;
  let radius = 0;
  let pointerAngle = 0;
  let pull = 0;
  let targetAngle = 0;
  let targetPull = 0;

  const movePointer = (event: PointerEvent) => {
    const bounds = box.getBoundingClientRect();
    const offsetX = event.clientX - bounds.left - bounds.width / 2;
    const offsetY = event.clientY - bounds.top - bounds.height / 2;
    targetAngle = Math.atan2(offsetY, offsetX);
    targetPull = Math.min(1, 300 / Math.hypot(offsetX, offsetY));
  };

  const loop = startCanvasLoop(canvas, {
    observe: box,
    resize(width) {
      canvasWidth = width;
      radius = box.offsetWidth / 2 - 2;
    },
    draw(context, seconds, palette) {
      pointerAngle +=
        Math.atan2(Math.sin(targetAngle - pointerAngle), Math.cos(targetAngle - pointerAngle)) *
        0.05;
      pull += (targetPull - pull) * 0.05;

      context.clearRect(0, 0, canvasWidth, canvasWidth);
      context.globalCompositeOperation = palette.light ? 'multiply' : 'lighter';

      const center = canvasWidth / 2;
      const beat = 0.75 + 0.25 * Math.sin(seconds * 2.1) * Math.sin(seconds * 0.7);

      for (const wave of WAVES) {
        context.beginPath();

        for (let index = 0; index <= 120; index++) {
          const angle = (index / 120) * Math.PI * 2;
          const proximity = 1 + pull * 1.6 * Math.max(0, Math.cos(angle - pointerAngle)) ** 3;
          const waveRadius =
            radius +
            2 +
            wave.amplitude *
              beat *
              proximity *
              (Math.sin(wave.primary.frequency * angle + wave.primary.speed * seconds) * 0.6 +
                Math.sin(wave.secondary.frequency * angle + wave.secondary.speed * seconds + 1) *
                  0.4 +
                0.6);

          const x = center + Math.cos(angle) * waveRadius;
          const y = center + Math.sin(angle) * waveRadius;
          index ? context.lineTo(x, y) : context.moveTo(x, y);
        }

        context.strokeStyle = palette[wave.color];
        context.lineWidth = 2;
        context.shadowColor = palette[wave.color];
        context.shadowBlur = palette.light ? 6 : 14;
        context.globalAlpha = palette.light ? 0.65 : 0.85;
        context.stroke();
      }
    },
  });

  if (!loop) return;

  addEventListener('pointermove', movePointer);
  box.classList.add('wave-ready');

  return () => {
    loop.stop();
    removeEventListener('pointermove', movePointer);
  };
}

export function AvatarWaves() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    return startAvatarWaves(canvas);
  }, []);

  // biome-ignore lint/a11y/noAriaHiddenOnFocusable: Decorative canvas is not focusable.
  return <canvas ref={ref} aria-hidden="true" />;
}
