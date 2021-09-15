const API_URL = 'https://graphql.datocms.com'
const API_TOKEN = process.env.DATOCMS_API_TOKEN

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
  const res = await fetch(API_URL + (preview ? '/preview' : ''), {
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
    console.error(json.errors)
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
        }
      }
      ${miniaturePageFragment}
      ${responsiveImageFragment}
    `,
    { preview }
  )

  return data?.allPages.map((miniature) => {
    return {
      image: miniature.image,
      content: miniature.miniaturePage
    }
  })
}

/* PAGE REFERENCES */
export async function getAllReferences(preview, locale) {
  const data = await fetchAPI(
    `
      {
        allReferences(locale: ${locale}, orderBy: _createdAt_DESC) {
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
          mission
          nomEntreprise
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

/* PAGE BLOG */
export async function getBlog(preview, locale) {
  const data = await fetchAPI(
    `
      {
        allPosts(locale: ${locale}, orderBy: date_DESC) {
          date
          slug
          title
          content
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

/* EXPERTISES */
export async function getExpertisesByField(preview, locale, field) {
  const data = await fetchAPI(
    `
      {
        allExpertises(filter: {expertise: {matches: {pattern: "${field}"}}}, locale: ${locale}) {
          title
          id
          description {
            value
            links {
              id
              slug
            }
          }
          icon {
            ...svgFieldFragment
          }
        }
      }
  
      ${svgFragment}
    `,
    { preview }
  )
  return data?.allExpertises
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
        allReferences(filter: {etiquettes: {eq: "${id_etiquette}"}}, first: "3", orderBy: _firstPublishedAt_DESC, locale: ${locale}) {
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
                responsiveImage {
                  ...responsiveImageFragment
                }
              }
            }
          }
          afficherContact
          etiquette {
            id
          }
          expertInterne {
            ...MembreRecordFragment
          }
          expertPartenaires {
            ...MembreRecordFragment
          }
          partenaires {
            name
            content
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
