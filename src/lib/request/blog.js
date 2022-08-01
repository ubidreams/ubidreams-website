import { fetchAPI } from '../api.js'
import { responsiveImageFragment, tagSeoFragment } from '../fragment.js'

/** PAGE BLOG
 *  @param preview booléen afin d'indiquer si nous sommes en preview ou nom
 *  @param locale locale active du site
 */

/**
 * requête de récupération de tous les articles du blog
 */
export async function getBlog(preview, locale) {
  const data = await fetchAPI(
    `
        {
          allPosts(locale: ${locale}, orderBy: date_DESC) {
            date
            slug
            title
            subtitle
            author {
              name
            }
            heroCover {
              responsiveImage {
                ...responsiveImageFragment
              }
            }
            thumbnail {
              responsiveImage {
                ...responsiveImageFragment
              }
            }
            tags {
              name
              slug
              id
            }
          }
        }
    
        ${responsiveImageFragment}
      `,
    { preview }
  )
  return data
}

/**
 * requête de récupération des 3 articles les plus récents
 */
export async function getLastPosts(preview, locale, tag, current_post) {
  const data = await fetchAPI(
    `
        {
          allPosts(locale: ${locale}, orderBy: date_DESC, first: "3", filter: {tags: {eq: "${tag}"}, id: {neq: "${current_post}"}}) {
            date
            slug
            title
            subtitle
            author {
              name
            }
            heroCover {
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
  return data?.allPosts
}

/**
 * requête de récupération de tous les slugs des articles
 */
export async function getAllPostsSlugs(locale) {
  const data = await fetchAPI(
    `
        {
          allPosts(locale: ${locale}) {
            slug
          }
        }
      `
  )
  return data?.allPosts
}

/**
 * requête de récupération d'un article en fonction de son slug
 */
export async function getOnePostBySlug(preview, locale, slug) {
  const data = await fetchAPI(
    `
        {
          post(locale: ${locale}, filter: {slug: {eq: "${slug}"}}) {
            id
            _seoMetaTags {
              ...TagFragment
            }
            _allSlugLocales {
              value
              locale
            }
            slug
            title
            subtitle
            _publishedAt
            updatedAt
            author {
              name
            }
            date
            heroCover {
              responsiveImage {
                ...responsiveImageFragment
              }
            }
            content {
              value
              links {
                ... on PageRecord {
                  id
                  slug
                  categorie
                }
                ... on PostRecord {
                  id
                  slug
                }
              }
              blocks {
                ... on VideoRecord {
                  _modelApiKey
                  id
                  videoUrl {
                    provider
                    providerUid
                    thumbnailUrl
                    title
                    url
                    width
                    height
                  }
                }
                ... on ImageRecord {
                  _modelApiKey
                  id
                  image {
                    responsiveImage {
                      ...responsiveImageFragment
                    }
                  }
                }
              }
            }
            tags {
              id
              slug
            }
            etiquettes {
              slug
              name
              id
            }
          }
        }
    
        ${responsiveImageFragment}
        ${tagSeoFragment}
      `,
    { preview }
  )
  return data?.post
}
