import { fetchAPI } from '../api'
import { responsiveImageFragment, tagSeoFragment } from '../fragment.js'

/** PAGE OBLIGATOIRES : politiques de confidentialités, mentions légales....
 * @param preview booléen afin d'indiquer si nous sommes en preview ou nom
 * @param locale locale active du site
 * @param slug string
 * */

/**
 * requête de récupération de toutes les pages de références légales (politique de confidentialité...)
 */
export async function getAllLegalPages(locale) {
  const data = await fetchAPI(
    `
        {
          allPageObligatoires(locale: ${locale}) {
            slug
            title
            id
          }
        }
      `
  )

  return data?.allPageObligatoires
}

/**
 * requête de récupération d'une page de référence légale en fonction du slug (politique de confidentialité...)
 */
export async function getLegalPageBySlug(preview, locale, slug) {
  const data = await fetchAPI(
    `
        {
          pageObligatoire(filter: {slug: {eq: "${slug}"}}, locale: ${locale}) {
            id
            _seoMetaTags {
              ...TagFragment
            }
            _allSlugLocales {
              value
              locale
            }
            title
            updatedAt
            tel
            email
            aide
            content {
              value
              blocks {
                id
                _modelApiKey
                image {
                  format
                  url
                  title
                  responsiveImage {
                    ...responsiveImageFragment
                  }
                }
              }
            }
          }
        }
        ${responsiveImageFragment}
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

  return data?.pageObligatoire
}
