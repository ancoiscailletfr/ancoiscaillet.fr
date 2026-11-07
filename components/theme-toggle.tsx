'use client';
import { useEffect, useState } from 'react';
import type { Lang } from '../content/site';
import { t } from '../lib/i18n';

type Theme = 'light' | 'dark';

export function ThemeToggle({ lang }: { lang: Lang }) {
  const [theme, setTheme] = useState<Theme>('dark');
  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === 'light' ? 'light' : 'dark');
  }, []);
  function toggle() {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {}
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta instanceof HTMLMetaElement) meta.content = next === 'light' ? '#f3f7ff' : '#0d0f1f';
    setTheme(next);
  }
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta instanceof HTMLMetaElement)
      meta.content = document.documentElement.dataset.theme === 'light' ? '#f3f7ff' : '#0d0f1f';
  }, []);
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={theme === 'light' ? t(lang, 'themeDark') : t(lang, 'themeLight')}
      onClick={toggle}
    >
      <svg className="sun" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M19 5l-1.5 1.5m-11 11L5 19" />
      </svg>
      <svg className="moon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 15A8 8 0 0 1 9 4a8 8 0 1 0 11 11Z" />
      </svg>
    </button>
  );
}
