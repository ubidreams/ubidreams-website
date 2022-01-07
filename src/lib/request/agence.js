import { fetchAPI } from '../api'
import { responsiveImageFragment } from '../fragment.js'

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
