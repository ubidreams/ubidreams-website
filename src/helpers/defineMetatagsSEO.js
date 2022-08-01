const SITE_URL = process.env.NEXT_PUBLIC_URL_GLOBAL

// External Librairies
import { includes, map } from 'lodash'
import Head from 'next/head'

/**
 * Autocomplétion du pathname en fonction de la page affichée (catégorie/params, slug)
 * @param router objet contenant les informations de navigation, issu du next/router
 * @param categorie string avec la catégorie de la page
 * @param slug string, slug de la page
 */
const replaceParams = (router, categorie, slug) => {
  let pathname = router.pathname

  // En fonction de la construction attendue de mon pathname (router) j'affecte les données
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

/**
 * Test de la locale afin d'ajouter /en ou pas à l'url de base
 * @param locale locale actuelle de l'app
 */
const siteUrlWithLocale = (locale) => {
  let url = SITE_URL

  if (locale === 'en') {
    url = SITE_URL + '/' + locale
  }

  return url
}

/**
 * ajout de nouvelles balises méta aux Metatags déjà généré par DATOCMS
 * @param seo objet contenant les propriétés SEO issues de DATOCMS
 * @param image image pour surcharger les balises og
 * @param router objet contenant les informations de navigation, issu du next/router
 * @param categorie string avec la catégorie de la page
 */
const DefineMetatagsSEO = ({
  seo,
  image = 'https://ubidreams.fr/_next/image?url=%2F_next%2Fstatic%2Fimage%2Fpublic%2Fimg%2Flogos%2Fcropped-logo.267f958344f2047dc9307ebc1389a9af.png&w=256&q=75',
  router,
  categorie = ''
}) => {
  // Initialisation du composant
  const { _allSlugLocales = [], _seoMetaTags = [] } = seo
  let finalMetatags = _seoMetaTags

  /* Déclaration des URLs alternatives en fonction des langues */
  const defineAlternateUrl = map(_allSlugLocales, (slugByLocale) => ({
    attributes: {
      rel: 'alternate',
      href: siteUrlWithLocale(slugByLocale.locale) + replaceParams(router, categorie, slugByLocale.value),
      hrefLang: slugByLocale.locale,
      key: slugByLocale.locale
    },
    content: null,
    tag: 'link'
  }))

  finalMetatags = finalMetatags.concat(defineAlternateUrl)

  //Dans le cas ou une image est mise en header, alors je l'utilise dans la balise og:image

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

  //On ajoute la balise link de l'url canonique.
  finalMetatags = [
    ...finalMetatags,
    {
      attributes: {
        rel: 'canonical',
        href: siteUrlWithLocale(router.locale) + replaceParams(router, categorie, router.query.slug)
      },
      content: null,
      tag: 'link'
    },
    {
      attributes: {
        property: 'og:url',
        content: siteUrlWithLocale(router.locale) + replaceParams(router, categorie, router.query.slug)
      },
      content: null,
      tag: 'meta'
    }
  ]

  // On ajoute nos modifications dans la balise Head de next
  return (
    <Head>
      {finalMetatags.map(({ tag: Tag, attributes, content }, index) => {
        if (Tag === 'title') {
          return <Tag key={index}>{content}</Tag>
        } else {
          return <Tag key={index} {...attributes} />
        }
      })}
    </Head>
  )
}

export default DefineMetatagsSEO
