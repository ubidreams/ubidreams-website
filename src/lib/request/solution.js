import { fetchAPI } from '../api'
import { expertFragment, responsiveImageFragment, tagSeoFragment } from '../fragment'

export async function getOneSolutionBySlug(preview, locale, slug) {
  const data = await fetchAPI(
    `
        {
          solution(filter: {slug: {eq: "${slug}"}}, locale: ${locale}) {
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

  return data?.solution
}

export async function getAllSolutionsSlugs(locale) {
  const data = await fetchAPI(
    `
        {
          allSolutions(locale: ${locale}) {
            slug
          }
        }
      `
  )
  return data?.allSolutions
}
