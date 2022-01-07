import { fetchAPI } from '../api'
import { responsiveImageFragment, tagSeoFragment } from '../fragment.js'

/* PAGE OBLIGATOIRES : politiques de confidentialités, mentions légales.... */
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
