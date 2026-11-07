'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { paths, publicPath, routes } from '../content/site';
import { t } from '../lib/i18n';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';

export function SiteNav({ lang }) {
  const pathname = usePathname().replace(/\/$/, '') || '/';
  const canvasRef = useRef(null);
  const key = Object.keys(routes).find((key) => publicPath(lang, key) === pathname);
  const i = paths[lang].indexOf(pathname),
    other = lang === 'fr' ? 'en' : 'fr';
  useEffect(() => {
    let bar, canvas, ctx, active, resizeObserver, intersectionObserver;
    let listeners = new AbortController();
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let W,
      H,
      f,
      s,
      target,
      width,
      hovered,
      focused,
      frame,
      colors,
      light,
      visible = true;
    function aim(el) {
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
    function draw(ms) {
      if (!W || !colors) return;
      const t = ms / 1000;
      f += (target - f) * 0.08;
      s += (width - s) * 0.08;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = light ? 'source-over' : 'lighter';
      [
        [0.09, 3, 0],
        [0.13, -2.4, 2],
        [0.06, 1.7, 4],
      ].forEach(([k, v, ph], i) => {
        const col = colors[i],
          g = ctx.createLinearGradient(0, 0, W, 0),
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
    function sync() {
      const next = canvasRef.current?.parentElement;
      const nextActive = next?.querySelector('.nav-links a[aria-current="page"]');
      if (next === bar && nextActive === active) return;
      cancelAnimationFrame(frame);
      if (next !== bar) {
        listeners.abort();
        listeners = new AbortController();
        resizeObserver?.disconnect();
        intersectionObserver?.disconnect();
        bar = next;
        canvas = bar?.querySelector('.signal');
        ctx = canvas?.getContext('2d');
        hovered = focused = null;
        if (!ctx) return;
        bar.querySelectorAll('.nav-links a').forEach((link) => {
          const options = { signal: listeners.signal };
          link.addEventListener(
            'pointerenter',
            () => {
              hovered = link;
              aim(focused || hovered);
            },
            options,
          );
          link.addEventListener(
            'pointerleave',
            () => {
              hovered = null;
              aim(focused || active);
            },
            options,
          );
          link.addEventListener(
            'focus',
            () => {
              focused = link;
              aim(link);
            },
            options,
          );
          link.addEventListener(
            'blur',
            () => {
              focused = null;
              aim(hovered || active);
            },
            options,
          );
        });
        resizeObserver = new ResizeObserver(size);
        resizeObserver.observe(bar);
        intersectionObserver = new IntersectionObserver((entries) => {
          visible = entries[0].isIntersecting;
          restart();
        });
        intersectionObserver.observe(bar);
      }
      active = nextActive;
      if (ctx) {
        size();
        restart();
      }
    }
    const navObserver = new MutationObserver(sync);
    navObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['aria-current'],
    });
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
    sync();

    return () => {
      cancelAnimationFrame(frame);
      listeners.abort();
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      navObserver.disconnect();
      themeObserver.disconnect();
      motion.removeEventListener('change', restart);
      document.removeEventListener('visibilitychange', restart);
    };
  }, []);
  return (
    <header className="shell pt-4" style={{ viewTransitionName: 'site-header' }}>
      <nav className="nav" aria-label={t(lang, 'navLabel')}>
        <Logo lang={lang} />
        <div className="nav-links">
          {t(lang, 'nav').map((label, n) => (
            <Link key={label} href={paths[lang][n]} aria-current={i === n ? 'page' : undefined}>
              <span className="nav-prefix" aria-hidden="true">
                ./
              </span>
              {label.toLowerCase()}
            </Link>
          ))}
        </div>
        <div className="settings">
          <div className="languages">
            <span className="lang-prefix" aria-hidden="true">
              --lang=
            </span>
            {['fr', 'en'].map((code, n) => (
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
                    href={publicPath(other, key || 'home')}
                    hrefLang={other}
                    lang={other}
                    aria-label={t(lang, 'languageLabel')}
                  >
                    {code}
                  </a>
                )}
              </span>
            ))}
          </div>
          <ThemeToggle lang={lang} />
        </div>
        {/* biome-ignore lint/a11y/noAriaHiddenOnFocusable: This decorative canvas is not keyboard focusable. */}
        <canvas ref={canvasRef} className="signal" aria-hidden="true" />
      </nav>
    </header>
  );
}
