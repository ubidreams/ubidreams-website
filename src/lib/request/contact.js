import { fetchAPI } from '../api'

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
