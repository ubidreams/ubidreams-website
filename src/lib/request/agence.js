// Data
import { fetchAPI } from '../api'
import { responsiveImageFragment } from '../fragment.js'

/**
 *  PAGE AGENCE
 *  @param preview booléen afin d'indiquer si nous sommes en preview ou nom
 *  @param locale locale active du site
 */

/**
 * requête de récupération de tous les collaborateurs
 */
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

/**
 * requête de récupération de toutes les structures auquel Ubidreams adhère (Association..)
 */
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
