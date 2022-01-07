import { fetchAPI } from '../api.js'
import { responsiveImageFragment, tagSeoFragment } from '../fragment.js'

/* PAGE BLOG */
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
