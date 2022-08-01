import { fetchAPI } from '../api'

/** CONTACT
 * @param locale locale active du site
 * */

/**
 * requête de récupération des coordonnées de l'entreprise
 */
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

/**
 * requête de récupération des mention de la CNIL pour le formulaire de contact
 */
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
