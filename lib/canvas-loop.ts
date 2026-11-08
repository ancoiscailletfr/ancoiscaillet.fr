export interface Palette {
  accent: string;
  orange: string;
  lavender: string;
  light: boolean;
}

export type PaletteColor = Exclude<keyof Palette, 'light'>;

export interface CanvasScene {
  /** Element whose size and visibility drive the canvas (ResizeObserver + IntersectionObserver). */
  observe: Element;
  /** Called after the canvas backing store is resized to its CSS size × devicePixelRatio. */
  resize?(width: number, height: number): void;
  /** `still` is true under prefers-reduced-motion; the scene decides how to react (site-nav snaps, avatar keeps easing). */
  draw(context: CanvasRenderingContext2D, seconds: number, palette: Palette, still: boolean): void;
}

export interface CanvasLoop {
  /** Draws once now if the loop is still (reduced motion); the running loop picks changes up on its own. */
  redraw(): void;
  stop(): void;
}

export function startCanvasLoop(
  canvas: HTMLCanvasElement,
  scene: CanvasScene,
): CanvasLoop | undefined {
  const context = canvas.getContext('2d');
  if (!context) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  let visible = true;
  let stopped = false;
  let palette = readPalette();

  function readPalette(): Palette {
    const styles = getComputedStyle(document.documentElement);
    return {
      accent: styles.getPropertyValue('--accent').trim(),
      orange: styles.getPropertyValue('--orange').trim(),
      lavender: styles.getPropertyValue('--lavender').trim(),
      light: document.documentElement.dataset.theme === 'light',
    };
  }

  const canAnimate = () => !stopped && !motion.matches && !document.hidden && visible;

  const redraw = () => {
    if (!stopped && motion.matches) scene.draw(context, 0, palette, true);
  };

  const animate = (milliseconds: number) => {
    if (!canAnimate()) return;
    scene.draw(context, milliseconds / 1000, palette, false);
    frame = requestAnimationFrame(animate);
  };

  const restart = () => {
    cancelAnimationFrame(frame);
    if (canAnimate()) frame = requestAnimationFrame(animate);
  };

  const resize = () => {
    const { width, height } = canvas.getBoundingClientRect();
    const pixelRatio = devicePixelRatio || 1;
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    scene.resize?.(width, height);
    redraw();
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(scene.observe);
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    if (!entry) return;
    visible = entry.isIntersecting;
    restart();
  });
  intersectionObserver.observe(scene.observe);
  const themeObserver = new MutationObserver(() => {
    palette = readPalette();
    redraw();
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  const changeMotion = () => {
    restart();
    redraw();
  };
  motion.addEventListener('change', changeMotion);
  document.addEventListener('visibilitychange', restart);
  resize();
  restart();

  return {
    redraw,
    stop() {
      stopped = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      motion.removeEventListener('change', changeMotion);
      document.removeEventListener('visibilitychange', restart);
    },
  };
}
