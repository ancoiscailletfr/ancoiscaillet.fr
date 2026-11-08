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
