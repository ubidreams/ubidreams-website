import { fetchAPI } from '../api'

import { responsiveImageFragment, svgFragment, expertFragment, tagSeoFragment } from '../fragment.js'

/** PAGE EXPERTISE
 * @param preview booléen afin d'indiquer si nous sommes en preview ou nom
 * @param locale locale active du site
 * @param field catégorie (development, design, iot, consulting)
 * @param slug string
 * */

/**
 * requête de récupération des expertises par catégorie (design, iot, development, consulting)
 */
export async function getExpertisesByField(preview, locale, field) {
  const data = await fetchAPI(
    `
        {
          allExpertises(filter: {expertise: {matches: {pattern: "${field}"}}}, locale: ${locale}) {
            title
            id
            domaine
            description {
              value
              links {
                id
                slug
                categorie
              }
            }
            icon {
              ...svgFieldFragment
            }
            offre {
              slug
              categorie
            }
          }
        }
    
        ${svgFragment}
      `,
    { preview }
  )
  return data?.allExpertises
}

/**
 * requête de récupération des partenaires par catégorie (design, iot, development, consulting)
 */
export async function getPartenairesByField(preview, locale, field) {
  const data = await fetchAPI(
    `
        {
          allPartenaires(locale: ${locale}, filter: {domaine: {in: ["${field}"]}}) {
            domaine
            content {
              value
              links
            }
            image {
              responsiveImage {
                ...responsiveImageFragment
              }
            }
          }
        }
    
        ${responsiveImageFragment}
      `,
    { preview }
  )
  return data?.allPartenaires
}

/**
 * requête de récupération d'une page en fonction du slug
 */
export async function getOnePageBySlug(preview, locale, slug) {
  const data = await fetchAPI(
    `
        {
          page(filter: {slug: {eq: "${slug}"}}, locale: ${locale}) {
            _seoMetaTags {
              ...TagFragment
            }
            _allSlugLocales {
              value
              locale
            }
            id
            slug
            categorie
            title
            subtitle
            image {
              responsiveImage {
                ...responsiveImageFragment
              }
            }
            content {
              value
              links {
                id
                slug
                categorie
              }
              blocks {
                ... on FocusPointRecord {
                  id
                  liste
                  _modelApiKey
                }
                ... on ListeCustomRecord {
                  id
                  liste
                  _modelApiKey
                }
                ... on ImageRecord {
                  id
                  image {
                    url
                    title
                    format
                    responsiveImage {
                      ...responsiveImageFragment
                    }
                  }
                  _modelApiKey
                }
                ... on TextAndImageRecord {
                  id
                  image {
                    responsiveImage {
                      ...responsiveImageFragment
                    }
                  }
                  content
                  _modelApiKey
                }
              }
            }
            afficherContact
            objetMail
            etiquette {
              id
            }
            expertInterne {
              ...MembreRecordFragment
            }
            expertPartenaires {
              ...MembreRecordFragment
            }
            partenaire {
              content {
                value
                links
              }
              image {
                responsiveImage {
                  ...responsiveImageFragment
                }
              }
            }
          }
        }
        ${responsiveImageFragment}
        ${expertFragment}
        ${tagSeoFragment}
      `,
    {
      preview,
      variables: {
        locale,
        slug
      }
    }
  )

  return data?.page
}

/**
 * requête de récupération de tous les slugs des pages
 */
export async function getAllPageSlugs(categorie, locale) {
  const data = await fetchAPI(
    `
          {
            allPages(filter: {categorie: {matches: {pattern: "${categorie}"}}}, locale: ${locale}) {
              slug
              categorie
            }
          }
        `
  )
  return data?.allPages
}
