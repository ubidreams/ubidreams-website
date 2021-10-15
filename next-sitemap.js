module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_URL_GLOBAL,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: false,
  exclude: ['/404'],
  alternateRefs: [
    {
      href: 'https://ubidreams.fr',
      hreflang: 'en'
    },
    {
      href: 'https://ubidreams.fr',
      hreflang: 'fr'
    }
  ],
  // Default transformation function
  transform: async (config, path) => {
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? []
    }
  },
  additionalPaths: async (config) => [await config.transform(config, '/additional-page')]
}
