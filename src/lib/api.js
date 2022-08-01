const API_URL = 'https://graphql.datocms.com'
const API_TOKEN = process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN

/**
 * fonction d'envoi de demande de données à l'API
 * @param query requête graphql définit dans le repo request.
 * @param variables Les variables dynamiques à ajouter à la query
 * @param preview booléen indique si je suis en preview ou en prod
 */
export async function fetchAPI(query, { variables, preview } = {}) {
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
