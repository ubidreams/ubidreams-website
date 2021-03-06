import { fetchAPI } from '../api.js'
import { isNull } from 'lodash'

import { responsiveImageFragment, miniaturePageFragment } from '../fragment.js'

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
