# ancoiscaillet.fr

Site de présentation de François Caillet.

- `pnpm install` : installer les dépendances.
- `pnpm dev` : lancer le site en local.
- `pnpm build` : générer le site statique dans `out/`.

Déployé sur Vercel.

## Où modifier quoi

- Textes et contenus : `content/` (MDX par langue et messages JSON).
- Postes (titres, dates, liens, badges) : `content/jobs.ts`.
- Titres et descriptions SEO : `content/seo.ts`.
- Liens et disponibilité : `content/site.ts`.
- Apparence : `components/` et `app/globals.css`.
- Vérifier le code : `pnpm check`.
