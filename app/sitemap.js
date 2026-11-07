export const dynamic = 'force-static';
export default function sitemap() {
  return ['', '/a-propos', '/work', '/contact', '/en', '/en/about', '/en/work', '/en/contact'].map(
    (path) => ({ url: `https://ancoiscaillet.fr${path}` }),
  );
}
