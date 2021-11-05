const SITE_URL = process.env.NEXT_PUBLIC_URL_GLOBAL

import { includes, map } from 'lodash'

/* 
    Autocomplétion du pathname en fonction de la page affichée (catégorie/params, slug)
*/
const replaceParams = (router, categorie, slug) => {
  let pathname = router.pathname

  if (includes(pathname, '/[params]/[slug]')) {
    pathname = pathname.replace('[params]', categorie)
    pathname = pathname.replace('[slug]', slug)
  }
  if (includes(pathname, '[slug]')) {
    pathname = pathname.replace('[slug]', slug)
  }

  if (includes(pathname, '/[params]')) {
    pathname = pathname.replace('[params]', slug)
  }
  return pathname
}

/* 
    Test de la locale afin d'ajouter /en ou pas à l'url de base
*/
const siteUrlWithLocale = (locale) => {
  let url = SITE_URL

  if (locale === 'en') {
    url = SITE_URL + '/' + locale
  }

  return url
}

/* 
    ajout de nouvelles balises méta aux Metatags déjà généré par DATOCMS
*/
const defineMetatagsSEO = (seoMetaTags, router, allSlugLocales, categorie = '', image = null) => {
  /* Déclaration des URLs alternatives en fonction des langues */
  const defineAlternateUrl = map(allSlugLocales, (slugByLocale) => {
    return {
      attributes: {
        rel: 'alternate',
        href: siteUrlWithLocale(slugByLocale.locale) + replaceParams(router, categorie, slugByLocale.value),
        hrefLang: slugByLocale.locale,
        key: slugByLocale.locale
      },
      content: null,
      tag: 'link'
    }
  })

  //Déclaration de l'URL canonique.
  let finalMetatags = seoMetaTags
  finalMetatags.push({
    attributes: {
      rel: 'canonical',
      href: siteUrlWithLocale(router.locale) + replaceParams(router, categorie, router.query.slug)
    },
    content: null,
    tag: 'link'
  })

  finalMetatags = finalMetatags.concat(defineAlternateUrl)
  if (image) {
    finalMetatags = finalMetatags.map((item) => {
      return {
        ...item,
        attributes: {
          ...item.attributes,
          content: item.attributes
            ? item.attributes.property === 'og:image'
              ? image
              : item.attributes.content
            : item.attributes
        }
      }
    })
  }
  return finalMetatags
}

export default defineMetatagsSEO
