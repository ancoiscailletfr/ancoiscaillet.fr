const toUrl = (host, page) =>
  `<url><loc>https://${host}${page}</loc></url>`

const createSitemap = (
  host,
  pages
) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages.map((page) => toUrl(host, page)).join('')}
    </urlset>`

const Sitemap = () => {}

export async function getServerSideProps ({ res, req }) {
  const pages = ['', '/blog']
  const sitemap = createSitemap(req.headers.host, pages)

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()
  return { props: {} }
}

export default Sitemap
