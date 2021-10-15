const path = require('path')
const withSass = require('@zeit/next-sass')
const nextTranslate = require('next-translate')
const allRedirection = require('./redirection')

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
  reactStrictMode: false,
  /* Add Your Scss File Folder Path Here */
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  async redirects() {
    return allRedirection
  }
}
