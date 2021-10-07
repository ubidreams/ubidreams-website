import { isNull } from 'lodash'

const API_URL = 'https://graphql.datocms.com'
const API_TOKEN = process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN

/* FRAGMENTS */
const responsiveImageFragment = `
  fragment responsiveImageFragment on ResponsiveImage {
    srcSet
    webpSrcSet
    sizes
    src
    width
    height
    aspectRatio
    alt
    title
    bgColor
    base64
  }
`

const svgFragment = `
  fragment svgFieldFragment on FileField {
    alt
    filename
    url
    filename
    title
    height
    width
  }
`

const expertFragment = `
  fragment MembreRecordFragment on MembreRecord {
    title
    subtitle
    presentation
    cardCover {
      responsiveImage {
        ...responsiveImageFragment
      }
    }
  }
`

const referenceFragment = `
  fragment ReferenceRecordFragment on ReferenceRecord {
    id
    title
    subtitle
    slug
    cardCover {
      responsiveImage {
        ...responsiveImageFragment
      }
    }
  }
`

const miniaturePageFragment = `
  fragment MiniaturePageFieldFragment on PageModelMiniaturePageField {
    value
    links {
      slug
      categorie
      id
    }
  }
`

async function fetchAPI(query, { variables, preview } = {}) {
  const res = await fetch(API_URL + (preview ? '/preview' : '/'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    },
    body: JSON.stringify({
      query,
      variables
    })
  })

  const json = await res.json()
  if (json.errors) {
    throw new Error('Failed to fetch API')
  }
  return json.data
}

/* PAGE HOME */
export async function getAllTestimonialsForHome(preview, locale) {
  const data = await fetchAPI(
    `
      {
        home(locale: ${locale}) {
          temoignages {
            footer
            content
            img {
              responsiveImage {
                ...responsiveImageFragment
              }
            }
            id
          }
        }
      }  
      ${responsiveImageFragment}
    `,
    { preview }
  )
  return data?.home
}

export async function getPagesFavorites(preview, locale) {
  const data = await fetchAPI(
    `
      {
        home(locale: ${locale}) {
          pageFavorite {
            miniaturePage {
              ...MiniaturePageFieldFragment
            }
            image {
              responsiveImage {
                ...responsiveImageFragment
              }
            }
            alternativeImage {
              responsiveImage {
                ...responsiveImageFragment
              }
            }
          }
        }
      }  
      ${miniaturePageFragment}
      ${responsiveImageFragment}
    `,
    { preview }
  )

  return data?.home.pageFavorite.map((miniature) => {
    //S'il n'y a pas d'image de miniature alors l'image par défaut de la page est prise
    const image = isNull(miniature.alternativeImage) ? miniature.image : miniature.alternativeImage
    return {
      image,
      content: miniature.miniaturePage
    }
  })
}

export async function getLastReferences(preview, locale) {
  const data = await fetchAPI(
    `
      {
        allReferences(locale: ${locale}, orderBy: _createdAt_DESC, first: "3") {
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

/* PAGE EXPERTISE */
export async function getSolutions(preview, locale) {
  const data = await fetchAPI(
    `
      {
        allPages(filter: {categorie: {matches: {pattern: "solution"}}}, locale: ${locale}) {
          miniaturePage {
            ...MiniaturePageFieldFragment
          }
          image {
            responsiveImage {
              ...responsiveImageFragment
            }
          }
          alternativeImage {
            responsiveImage {
              ...responsiveImageFragment
            }
          }
        }
      }
      ${miniaturePageFragment}
      ${responsiveImageFragment}
    `,
    { preview }
  )

  return data?.allPages.map((miniature) => {
    const image = isNull(miniature.alternativeImage) ? miniature.image : miniature.alternativeImage
    return {
      image,
      content: miniature.miniaturePage
    }
  })
}

/* PAGE REFERENCES */
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
    `,
    { preview }
  )
  return data?.reference
}

/* PAGE AGENCE  */
export async function getTeamMembers(preview, locale) {
  const data = await fetchAPI(
    `
      {
        agence(locale: ${locale}){
          membres {
            id
            subtitle
            title
            citation
            cardCover {
              responsiveImage {
                ...responsiveImageFragment
              }
            }
          }
        }
      }
  
      ${responsiveImageFragment}
    `,
    { preview }
  )
  return data?.agence
}

export async function getGalleryImg(preview, locale) {
  const data = await fetchAPI(
    `
      {
        agence(locale: ${locale}){
          gallerie {
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
  return data?.agence
}

export async function getMembership(preview, locale) {
  const data = await fetchAPI(
    `
      {
        agence(locale: ${locale}){
          adhesionAssociation {
            id
            nom
            url
            img {
              responsiveImage {
                ...responsiveImageFragment
              }
            }
          }
        }
      }
  
      ${responsiveImageFragment}
    `,
    { preview }
  )
  return data?.agence
}

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
          tags {
            name
            slug
            id
          }
        },
        allTags(locale: ${locale}) {
          name
          id
          slug
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
              id
              image {
                responsiveImage {
                  ...responsiveImageFragment
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
    `,
    { preview }
  )
  return data?.post
}

/* EXPERTISES */
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

export async function getPartenairesByField(preview, locale, field) {
  const data = await fetchAPI(
    `
      {
        allPartenaires(locale: ${locale}, filter: {domaine: {in: ["${field}"]}}) {
          domaine
          content {
            value
            links {
              id
            }
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

/* PAGES SLUG */
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

export async function getLastRefByTech(id_etiquette, locale) {
  const data = await fetchAPI(
    `
      {
        allReferences(filter: {etiquettes: {allIn: "${id_etiquette}"}}, first: "3", orderBy: _firstPublishedAt_DESC, locale: ${locale}) {
          ...ReferenceRecordFragment
        }
      }
      ${referenceFragment}
      ${responsiveImageFragment}
    `
  )
  return data?.allReferences
}

export async function getOnePageBySlug(preview, locale, slug) {
  const data = await fetchAPI(
    `
      {
        page(filter: {slug: {eq: "${slug}"}}, locale: ${locale}) {
          id
          slug
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
              id
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
              links {
                slug
                categorie
                id
              }
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
          title
          updatedAt
          tel
          email
          aide
          content {
            value
            blocks {
              id
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

/* CONTACT */
export async function getCoordonnees(locale) {
  const data = await fetchAPI(
    `
      {
        contact(locale: ${locale}) {
          adresse
          ville
          pays
          email
          telephone
        }
      }
    `
  )

  return data?.contact
}

export async function getCnilMentionForm(locale) {
  const data = await fetchAPI(
    `
      {
        contact(locale: ${locale}) {
          mentionsCnil
        }
      }
    `
  )

  return data?.contact.mentionsCnil
}
