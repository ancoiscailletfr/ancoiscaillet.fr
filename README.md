# ancoiscaillet.fr

François Caillet's personal site.

- `pnpm install`: install dependencies.
- `pnpm dev`: run the site locally.
- `pnpm build`: generate the static site in `out/`.

Deployed on Vercel.

## Where to edit what

- Copy and content: `content/` (MDX per locale and JSON messages).
- Jobs (titles, dates, links, badges): `content/jobs.ts`.
- SEO titles and descriptions: `content/seo.ts`.
- Links and availability: `content/site.ts`.
- Look and feel: `components/` and `app/globals.css`.
- Check the code: `pnpm check` and `pnpm typecheck`.
