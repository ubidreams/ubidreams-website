const API_URL = 'https://graphql.datocms.com'
const API_TOKEN = process.env.DATOCMS_API_TOKEN

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

export async function getAllTestimonialsForHome(preview) {
  const data = await fetchAPI(
    `
      {
        home {
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

export async function getLastReferences(preview) {
  const data = await fetchAPI(
    `
      {
        allReferences(orderBy: _createdAt_DESC, first: "3") {
          subtitle
          title
          slug
          id
          cardCover {
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
  return data?.allReferences
}
