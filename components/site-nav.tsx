'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { type Lang, languages, type Page, publicPath, routeKey } from '../content/site';
import { type MessageKey, t } from '../lib/i18n';
import { Logo } from './logo';

export function SiteNav({ lang }: { lang: Lang }) {
  const pathname = usePathname().replace(/\/$/, '') || '/';
  const barRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<{
    activate(href: string | undefined): void;
    hover(link: Element | null): void;
    focus(link: Element | null): void;
  } | null>(null);
  // Prerendering sees the internal /fr/... path; the browser sees the public one.
  const key = routeKey(lang, pathname.replace(new RegExp(`^/${lang}(?=/|$)`), '').slice(1));
  useEffect(() => {
    const bar = barRef.current,
      canvas = canvasRef.current;
    if (!bar || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let active = bar.querySelector('.nav-links a[aria-current="page"]');
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let W = 0,
      H = 0,
      target = 0,
      width = 0,
      frame = 0,
      light = false,
      visible = true;
    let f: number | undefined;
    let s: number | undefined;
    let hovered: Element | null = null;
    let focused: Element | null = null;
    let colors: string[] = [];
    function aim(el: Element | null) {
      if (!bar) return;
      const box = bar.getBoundingClientRect(),
        r = el?.getBoundingClientRect();
      target = r ? r.left - box.left + r.width / 2 : W / 2;
      width = r ? r.width / 2 : 0;
      if (motion.matches) {
        f = target;
        s = width;
        draw(0);
      }
    }
    function size() {
      if (!canvas || !ctx) return;
      const d = devicePixelRatio || 1;
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * d;
      canvas.height = H * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
      aim(focused || hovered || active);
      f ??= target;
      s ??= width;
      if (motion.matches) draw(0);
    }
    function theme() {
      const css = getComputedStyle(document.documentElement);
      colors = ['--accent', '--orange', '--lavender'].map((v) => css.getPropertyValue(v).trim());
      light = document.documentElement.dataset.theme === 'light';
      if (motion.matches && ctx) draw(0);
    }
    function draw(ms: number) {
      if (!W || !ctx || !bar || f === undefined || s === undefined) return;
      const t = ms / 1000;
      f += (target - f) * 0.08;
      s += (width - s) * 0.08;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = light ? 'source-over' : 'lighter';
      const waves = [
        [0.09, 3, 0],
        [0.13, -2.4, 2],
        [0.06, 1.7, 4],
      ] as const;
      waves.forEach(([k, v, ph], i) => {
        if (!ctx || f === undefined || s === undefined) return;
        const col = colors[i];
        if (col === undefined) return;
        const g = ctx.createLinearGradient(0, 0, W, 0),
          fw = Math.min(0.97, f / W),
          sw = (s + 30) / W;
        g.addColorStop(0, `${col}00`);
        g.addColorStop(Math.max(0, fw - sw * 2.5), col + (light ? '55' : '1a'));
        g.addColorStop(fw, col);
        g.addColorStop(Math.min(1, fw + sw * 2.5), col + (light ? '55' : '1a'));
        g.addColorStop(1, `${col}00`);
        ctx.beginPath();
        for (let x = 0; x <= W; x += 2) {
          const e = active || focused || hovered ? Math.exp(-(((x - f) / (s + 10)) ** 2)) : 0;
          const y =
            H / 2 +
            (0.4 + 7 * e) * Math.sin(k * x + v * t + ph) * (0.8 + 0.2 * Math.sin(t * 3 + x * 0.02));
          x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.2;
        ctx.shadowColor = col;
        ctx.shadowBlur = light ? 2 : 6;
        ctx.stroke();
      });
      bar.classList.add('signal-ready');
      if (!motion.matches && !document.hidden && visible) frame = requestAnimationFrame(draw);
    }
    function restart() {
      cancelAnimationFrame(frame);
      if (ctx && !document.hidden && visible) {
        if (motion.matches) {
          f = target;
          s = width;
        }
        draw(0);
      }
    }
    animationRef.current = {
      activate(href) {
        active = href ? bar.querySelector(`.nav-links a[href="${href}"]`) : null;
        aim(focused || hovered || active);
      },
      hover(link) {
        hovered = link;
        aim(focused || hovered || active);
      },
      focus(link) {
        focused = link;
        aim(focused || hovered || active);
      },
    };
    const resizeObserver = new ResizeObserver(size);
    resizeObserver.observe(bar);
    const intersectionObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      visible = entry.isIntersecting;
      restart();
    });
    intersectionObserver.observe(bar);
    const themeObserver = new MutationObserver(() => {
      theme();
      if (motion.matches) restart();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    motion.addEventListener('change', restart);
    document.addEventListener('visibilitychange', restart);
    theme();
    size();
    restart();

    return () => {
      cancelAnimationFrame(frame);
      animationRef.current = null;
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      motion.removeEventListener('change', restart);
      document.removeEventListener('visibilitychange', restart);
    };
  }, []);
  useEffect(() => {
    animationRef.current?.activate(key ? publicPath(lang, key) : undefined);
  }, [key, lang]);
  return (
    <header className="shell pt-4" style={{ viewTransitionName: 'site-header' }}>
      <nav ref={barRef} className="nav" aria-label={t(lang, 'navLabel')}>
        <Logo lang={lang} />
        <div className="nav-links">
          {(
            [
              ['home', 'navHome'],
              ['about', 'navAbout'],
              ['work', 'navWork'],
              ['contact', 'navContact'],
            ] as const satisfies ReadonlyArray<readonly [Page, MessageKey]>
          ).map(([page, message]) => (
            <Link
              key={page}
              href={publicPath(lang, page)}
              aria-current={key === page ? 'page' : undefined}
              onPointerEnter={(event) => animationRef.current?.hover(event.currentTarget)}
              onPointerLeave={() => animationRef.current?.hover(null)}
              onFocus={(event) => animationRef.current?.focus(event.currentTarget)}
              onBlur={() => animationRef.current?.focus(null)}
            >
              <span className="nav-prefix" aria-hidden="true">
                ./
              </span>
              {t(lang, message).toLowerCase()}
            </Link>
          ))}
        </div>
        <div className="settings">
          <div className="languages">
            <span className="lang-prefix" aria-hidden="true">
              --lang=
            </span>
            {languages.map((code, n) => (
              <span className="lang-item" key={code}>
                {n > 0 && (
                  <span className="lang-pipe" aria-hidden="true">
                    |
                  </span>
                )}
                {code === lang ? (
                  <span aria-current="true">{code}</span>
                ) : (
                  <a
                    href={publicPath(code, key || 'home')}
                    hrefLang={code}
                    lang={code}
                    aria-label={t(lang, 'languageLabel')}
                  >
                    {code}
                  </a>
                )}
              </span>
            ))}
          </div>
        </div>
        {/* biome-ignore lint/a11y/noAriaHiddenOnFocusable: This decorative canvas is not keyboard focusable. */}
        <canvas ref={canvasRef} className="signal" aria-hidden="true" />
      </nav>
    </header>
  );
}
