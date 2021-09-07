const path = require('path')
const withSass = require('@zeit/next-sass')
const nextTranslate = require('next-translate')

module.exports = nextTranslate()
module.exports = withSass({
  /* bydefault config  option Read For More Optios
  here https://github.com/vercel/next-plugins/tree/master/packages/next-sass*/
  cssModules: true
})

module.exports = {
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'fr'
  },
  images: {
    domains: ['www.datocms-assets.com']
  },
  async rewrites() {
    return [
      {
        source: '/:lang(fr)?/agence',
        destination: '/agency'
      },
      {
        source: '/:lang(fr)?/expertises/developpement',
        destination: '/expertises/development'
      },
      {
        source: '/:lang(fr)?/expertises/conseil',
        destination: '/expertises/consulting'
      },
      {
        source: '/:lang(en)?/expertises/internet-of-things',
        destination: '/expertises/iot'
      },
      {
        source: '/:lang(fr)?/expertises/objets-connectes',
        destination: '/expertises/iot'
      }
    ]
  },
  reactStrictMode: false,
  /* Add Your Scss File Folder Path Here */
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
}
