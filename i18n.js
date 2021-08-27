module.exports = {
  locales: ['en', 'fr'],
  defaultLocale: 'fr',
  loader: false,
  pages: {
    '*': ['common'],
    '/': ['home'],
    '/expertises': ['expertises'],
    '/agency': ['agency']
  },
  interpolation: {
    prefix: '${',
    suffix: '}'
  },
  loadLocaleFrom: (lang, ns) => import(`./locales/${lang}/${ns}.json`).then((m) => m.default)
}
