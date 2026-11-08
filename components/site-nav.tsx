'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { type Lang, languages, type Page, publicPath, routeKey } from '../content/site';
import { type CanvasLoop, type PaletteColor, startCanvasLoop } from '../lib/canvas-loop';
import { type MessageKey, t } from '../lib/i18n';
import { Logo } from './logo';

interface NavSignal {
  activate(href: string | undefined): void;
  hover(link: Element | null): void;
  focus(link: Element | null): void;
}

const NAV_LINKS = [
  { page: 'home', label: 'navHome' },
  { page: 'about', label: 'navAbout' },
  { page: 'work', label: 'navWork' },
  { page: 'contact', label: 'navContact' },
] satisfies ReadonlyArray<{ page: Page; label: MessageKey }>;

const WAVES = [
  { color: 'accent', frequency: 0.09, speed: 3, phase: 0 },
  { color: 'orange', frequency: 0.13, speed: -2.4, phase: 2 },
  { color: 'lavender', frequency: 0.06, speed: 1.7, phase: 4 },
] satisfies ReadonlyArray<{
  color: PaletteColor;
  frequency: number;
  speed: number;
  phase: number;
}>;

export function SiteNav({ lang }: { lang: Lang }) {
  const pathname = usePathname().replace(/\/$/, '') || '/';
  const barRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<NavSignal | null>(null);

  // Prerendering sees the internal /fr/... path; the browser sees the public one.
  const key = routeKey(lang, pathname.replace(new RegExp(`^/${lang}(?=/|$)`), '').slice(1));

  useEffect(() => {
    const bar = barRef.current;
    const canvas = canvasRef.current;
    if (!bar || !canvas) return;

    let active = bar.querySelector('.nav-links a[aria-current="page"]');
    let canvasWidth = 0;
    let canvasHeight = 0;
    let targetCenter = 0;
    let targetHalfWidth = 0;
    let center: number | undefined;
    let halfWidth: number | undefined;
    let hovered: Element | null = null;
    let focused: Element | null = null;
    let loop: CanvasLoop | undefined;

    const aim = (link: Element | null) => {
      const barBounds = bar.getBoundingClientRect();
      const linkBounds = link?.getBoundingClientRect();

      targetCenter = linkBounds
        ? linkBounds.left - barBounds.left + linkBounds.width / 2
        : canvasWidth / 2;
      targetHalfWidth = linkBounds ? linkBounds.width / 2 : 0;
      // Undefined during the first resize inside startCanvasLoop, which redraws on its own.
      loop?.redraw();
    };
    const aimAtCurrentLink = () => aim(focused || hovered || active);

    loop = startCanvasLoop(canvas, {
      observe: bar,
      resize(width, height) {
        canvasWidth = width;
        canvasHeight = height;
        aimAtCurrentLink();
        center ??= targetCenter;
        halfWidth ??= targetHalfWidth;
      },
      draw(context, seconds, palette, still) {
        if (!canvasWidth || center === undefined || halfWidth === undefined) return;

        if (still) {
          center = targetCenter;
          halfWidth = targetHalfWidth;
        } else {
          center += (targetCenter - center) * 0.08;
          halfWidth += (targetHalfWidth - halfWidth) * 0.08;
        }

        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.globalCompositeOperation = palette.light ? 'multiply' : 'lighter';

        for (const wave of WAVES) {
          const color = palette[wave.color];
          const gradient = context.createLinearGradient(0, 0, canvasWidth, 0);
          const centerFraction = Math.min(0.97, center / canvasWidth);
          const widthFraction = (halfWidth + 30) / canvasWidth;

          gradient.addColorStop(0, `${color}00`);
          gradient.addColorStop(
            Math.max(0, centerFraction - widthFraction * 2.5),
            color + (palette.light ? '55' : '1a'),
          );
          gradient.addColorStop(centerFraction, color);
          gradient.addColorStop(
            Math.min(1, centerFraction + widthFraction * 2.5),
            color + (palette.light ? '55' : '1a'),
          );
          gradient.addColorStop(1, `${color}00`);

          context.beginPath();
          for (let x = 0; x <= canvasWidth; x += 2) {
            const envelope =
              active || focused || hovered
                ? Math.exp(-(((x - center) / (halfWidth + 10)) ** 2))
                : 0;

            const y =
              canvasHeight / 2 +
              (0.4 + 7 * envelope) *
                Math.sin(wave.frequency * x + wave.speed * seconds + wave.phase) *
                (0.8 + 0.2 * Math.sin(seconds * 3 + x * 0.02));

            x ? context.lineTo(x, y) : context.moveTo(x, y);
          }

          context.strokeStyle = gradient;
          context.lineWidth = 1.2;
          context.shadowColor = color;
          context.shadowBlur = palette.light ? 2 : 6;
          context.stroke();
        }

        bar.classList.add('signal-ready');
      },
    });

    if (!loop) return;

    animationRef.current = {
      activate(href) {
        active = href ? bar.querySelector(`.nav-links a[href="${href}"]`) : null;
        aimAtCurrentLink();
      },
      hover(link) {
        hovered = link;
        aimAtCurrentLink();
      },
      focus(link) {
        focused = link;
        aimAtCurrentLink();
      },
    };

    return () => {
      loop?.stop();
      animationRef.current = null;
    };
  }, []);

  useEffect(() => {
    animationRef.current?.activate(key ? publicPath(lang, key) : undefined);
  }, [key, lang]);

  return (
    <header className="shell pt-4" style={{ viewTransitionName: 'site-header' }}>
      <nav ref={barRef} className="nav" data-page={key} aria-label={t(lang, 'navLabel')}>
        <Logo lang={lang} />
        <div className="nav-links">
          {NAV_LINKS.map(({ page, label }) => (
            <Link
              key={page}
              href={publicPath(lang, page)}
              aria-current={key === page ? 'page' : undefined}
              onPointerEnter={(event) => animationRef.current?.hover(event.currentTarget)}
              onPointerLeave={() => animationRef.current?.hover(null)}
              // A click focuses the link too; that focus outlives a back navigation.
              onFocus={(event) =>
                animationRef.current?.focus(
                  event.currentTarget.matches(':focus-visible') ? event.currentTarget : null,
                )
              }
              onBlur={() => animationRef.current?.focus(null)}
            >
              <span className="nav-prefix" aria-hidden="true">
                ./
              </span>
              {t(lang, label).toLowerCase()}
            </Link>
          ))}
        </div>
        <div className="settings">
          <div className="languages">
            <span className="lang-prefix" aria-hidden="true">
              --lang=
            </span>
            {languages.map((code, index) => (
              <span className="lang-item" key={code}>
                {index > 0 && (
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
