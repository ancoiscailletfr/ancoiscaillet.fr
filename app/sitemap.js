import { languages, publicPath, routes } from '../content/site';
export const dynamic = 'force-static';
export default function sitemap() {
  return languages.flatMap((lang) =>
    Object.keys(routes)
      .filter((key) => key !== 'legal')
      .map((key) => {
        const path = publicPath(lang, key);
        // Match the canonical URLs, which have no trailing slash on the home page.
        return { url: `https://ancoiscaillet.fr${path === '/' ? '' : path}` };
      }),
  );
}
