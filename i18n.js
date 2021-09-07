module.exports = {
  locales: ['en', 'fr'],
  defaultLocale: 'fr',
  loader: false,
  pages: {
    '*': ['common'],
    '/': ['home'],
    '/expertises': ['expertises'],
    '/agency': ['agency'],
    'rgx:^/references': ['references'],
    'rgx:^/blog': ['blog'],
    '/contact': ['contact'],
    'rgx:^(/\\S{3,}/development)': ['development'],
    'rgx:^(/\\S{3,}/design)': ['design']
  },
  interpolation: {
    prefix: '${',
    suffix: '}'
  },
  loadLocaleFrom: (lang, ns) => import(`./locales/${lang}/${ns}.json`).then((m) => m.default)
}
