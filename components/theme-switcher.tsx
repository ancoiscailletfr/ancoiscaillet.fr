'use client';
import { useEffect, useState } from 'react';
import type { Lang } from '../content/site';
import { t } from '../lib/i18n';

const CHOICES = [
  { choice: 'system', label: 'themeSystem' },
  { choice: 'light', label: 'themeLight' },
  { choice: 'dark', label: 'themeDark' },
] as const;

type Choice = (typeof CHOICES)[number]['choice'];

// The active option is highlighted in CSS from <html data-theme-choice> (set by the bootstrap
// script), so there is no flash; `pref` only drives aria-pressed and the stored choice.
export function ThemeSwitcher({ lang }: { lang: Lang }) {
  const [pref, setPref] = useState<Choice | null>(null);
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem('theme');
    } catch {}
    setPref(saved === 'light' || saved === 'dark' ? saved : 'system');
  }, []);
  useEffect(() => {
    if (!pref) return;
    document.documentElement.dataset.themeChoice = pref;
    const mq = matchMedia('(prefers-color-scheme: light)');
    const apply = () => {
      const theme = pref === 'system' ? (mq.matches ? 'light' : 'dark') : pref;
      document.documentElement.dataset.theme = theme;
      for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
        if (meta instanceof HTMLMetaElement)
          meta.content = theme === 'light' ? '#fbf8f3' : '#0d0f1f';
      }
    };
    apply();
    if (pref !== 'system') return;
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [pref]);
  function choose(next: Choice) {
    try {
      if (next === 'system') localStorage.removeItem('theme');
      else localStorage.setItem('theme', next);
    } catch {}
    setPref(next);
  }
  return (
    <fieldset className="theme-switch" aria-label={t(lang, 'themeLabel')}>
      {CHOICES.map(({ choice, label }) => (
        <button
          key={choice}
          type="button"
          aria-pressed={pref === choice}
          aria-label={t(lang, label)}
          title={t(lang, label)}
          data-choice={choice}
          onClick={() => choose(choice)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {choice === 'system' && (
              <>
                <rect x="3" y="4" width="18" height="12" rx="2" />
                <path d="M8 20h8M12 16v4" />
              </>
            )}
            {choice === 'light' && (
              <>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M19 5l-1.5 1.5m-11 11L5 19" />
              </>
            )}
            {choice === 'dark' && <path d="M20 15A8 8 0 0 1 9 4a8 8 0 1 0 11 11Z" />}
          </svg>
        </button>
      ))}
    </fieldset>
  );
}
