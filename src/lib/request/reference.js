import { fetchAPI } from '../api.js'
import { responsiveImageFragment, referenceFragment, tagSeoFragment } from '../fragment.js'

export async function getLastReferences(preview, locale) {
  const data = await fetchAPI(
    `
        {
          allReferences(locale: ${locale}, first: "3") {
            ...ReferenceRecordFragment
          }
        }
        ${referenceFragment}
        ${responsiveImageFragment}
      `,
    { preview }
  )
  return data?.allReferences
}

export async function getAllReferences(preview, locale) {
  const data = await fetchAPI(
    `
        {
          allReferences(locale: ${locale}) {
            ...ReferenceRecordFragment
          }
        }
        ${referenceFragment}
        ${responsiveImageFragment}
      `,
    { preview }
  )
  return data?.allReferences
}

export async function getAllRegies(preview, locale) {
  const data = await fetchAPI(
    `
        {
          allRegies(locale: ${locale}, orderBy: _createdAt_ASC) {
            id
            description
            nom
            mandataire
            img {
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
  return data?.allRegies
}

export async function getAllReferencesSlugs(locale) {
  const data = await fetchAPI(
    `
        {
          allReferences(locale: ${locale}) {
            slug
          }
        }
      `
  )
  return data?.allReferences
}

export async function getOneReferencesBySlug(preview, locale, slug) {
  const data = await fetchAPI(
    `
        {
          reference(locale: ${locale},filter: {slug: {eq: "${slug}"}}) {
            _seoMetaTags {
              ...TagFragment
            }
            _allSlugLocales {
              value
              locale
            }
            title
            subtitle
            slug
            id
            outils
            updatedAt
            etiquettes {
              name
              id
              slug
            }
            coverImage {
              responsiveImage {
                ...responsiveImageFragment
              }
            }
            content {
              blocks {
                ... on ReferenceGalerieRecord {
                  id
                  _modelApiKey
                  galleryColumn1 {
                    responsiveImage {
                      ...responsiveImageFragment
                    }
                  }
                  galleryColumn2 {
                    responsiveImage {
                      ...responsiveImageFragment
                    }
                  }
                }
                ... on ImageRecord {
                  id
                  _modelApiKey
                  image {
                    responsiveImage {
                      ...responsiveImageFragment
                    }
                  }
                }
              }
              value
              links {
                id
                slug
                title
                categorie
              }
            }
          }
        }
    
        ${responsiveImageFragment}
        ${tagSeoFragment}
      `,
    { preview }
  )
  return data?.reference
}

export async function getLastRefByTech(id_etiquette, locale) {
  const data = await fetchAPI(
    `
      {
        allReferences(filter: {etiquettes: {allIn: "${id_etiquette}"}}, first: "3", locale: ${locale}) {
          ...ReferenceRecordFragment
        }
      }
      ${referenceFragment}
      ${responsiveImageFragment}
    `
  )
  return data?.allReferences
}
