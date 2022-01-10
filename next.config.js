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
  swcMinify: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: true,
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'fr'
  },
  images: {
    domains: ['www.datocms-assets.com']
  },
  reactStrictMode: true,
  /* Add Your Scss File Folder Path Here */
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  async redirects() {
    return allRedirection
  },
  // https://nextjs.org/docs/api-reference/next.config.js/headers
  // https://github.com/leerob/leerob.io/blob/9adc510cbfb3da88c3b0ad15632eb876ca91b607/next.config.js#L51-L88
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // https://vercel.com/support/articles/how-to-enable-cors#enabling-cors-in-a-next.js-app
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true'
          },
          {
            key: 'SameSite',
            value: 'Secure'
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: `X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version`
          },

          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=1, stale-while-revalidate=59'
          },

          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
          // Opt-out of Google FLoC: https://amifloced.org/
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },

          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },

          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },

          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },

          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },

          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          }
        ]
      }
    ]
  }
}
