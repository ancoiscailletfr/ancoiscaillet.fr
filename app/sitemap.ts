import type { MetadataRoute } from 'next';
import { languages, paths } from '../content/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return languages.flatMap((lang) =>
    paths[lang].map((path) => {
      // Match the canonical URLs, which have no trailing slash on the home page.
      return { url: `https://ancoiscaillet.fr${path === '/' ? '' : path}` };
    }),
  );
}
