# ancoiscaillet.fr

Site de présentation de François Caillet.

- `pnpm install` : installer les dépendances.
- `pnpm dev` : lancer le site en local.
- `pnpm build` : générer le site statique dans `out/`.

Déployé sur Vercel.

## Où modifier quoi

- Textes et contenus : `content/` (MDX par langue et messages JSON).
- Titres et descriptions SEO : `content/seo.js`.
- Liens et disponibilité : `content/site.js`.
- Apparence : `components/` et `app/globals.css`.
- Vérifier le code et les messages : `pnpm check` et `pnpm check:messages`.
