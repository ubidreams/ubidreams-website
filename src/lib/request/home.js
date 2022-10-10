import { fetchAPI } from '../api.js'
import { isNull } from 'lodash'

import { responsiveImageFragment, miniaturePageFragment } from '../fragment.js'

/** PAGE HOME
 * @param preview booléen afin d'indiquer si nous sommes en preview ou nom
 * @param locale locale active du site
 * */

/**
 * requête de récupération des témoignages pour la page d'accueil
 */
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

/**
 * requête de récupération de toutes les images de la gallery pour la page agence
 */
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

/**
 * requête de récupération des pages favorites à afficher en page d'accueil
 */
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
