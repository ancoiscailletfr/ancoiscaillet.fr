<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Code layout

Biome never adds blank lines, it only keeps the ones you write (and collapses runs to one). Add them yourself:

- after `'use client'` and after the imports;
- after a guard clause (`if (!x) return;`);
- between a block of declarations and the logic that uses it;
- between sibling functions, constants and types;
- before the final `return` of a function longer than a few lines.

No blank lines inside JSX or object literals.

## Code quality

- One idea per file; mechanisms go into small named helpers in `lib/`.
- Whole-word names, named `XProps` interfaces, objects with named fields over tuples and magic numbers.
- Derive types from a single source instead of repeating them.
- Guard clauses over nested conditions; comments explain why, not what.
- No casts.
- Edit code and CSS in place instead of appending override blocks.

## Stack

- Next 16 static export: no server functions. Headers, CSP, rewrites and redirects live in `vercel.json`.
- pnpm 11 with a 7-day `minimumReleaseAge`. No new dependency for what a few lines or the platform already do.
- Strict TypeScript (`noUncheckedIndexedAccess`). Missing content (route, locale, SEO title, message) must break the build: `as const satisfies` in `content/site.ts` and `content/seo.ts`, `en.json` keys checked against `fr.json`.

## Content

- French at the root, English under `/en`, a single `app/[lang]/[page]` tree driven by the route table.

## Front end

- CSS before JS: transitions, layouts and per-page variations go through CSS first.
- Animate `transform` and `opacity` to stay on the compositor.
- Always respect `prefers-reduced-motion`.
- `data-theme` is always `light` or `dark`, never "system".
- Canvases go through `lib/canvas-loop.ts` and keep only their drawing.
- `globals.css`: one block per selector and per media query, grouped by section.

## Verification

- `pnpm check`, `pnpm typecheck` and `pnpm build` pass.
- Visual change: check light and dark, desktop and mobile (320, 375 and 414 px).

## Language

- The codebase is in English: code, comments, commit messages and this file.
- Site content (MDX, `content/messages/*.json`) is in French and English.
- Pull requests are written in French.

## Git and PRs

- PRs target `develop`, never `main`: `main` only moves through the "Merge develop into main" workflow, fast-forward only.
- Short branch names in English (`fix-backward-nav`), Conventional Commits titles (`feat:`, `fix:`, `refactor:`…).
- PR description: the why and the how, briefly. "Comment tester ?" only for a manual check.
