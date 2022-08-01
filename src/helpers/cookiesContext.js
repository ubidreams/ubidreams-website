// External Librairies
import React, { useCallback, useEffect, useState } from 'react'
import { mapKeys, toLower } from 'lodash'

/**
 * CookiesProvider : Context react mettant en place une gestion contextualisée des cookies sur l'application
 * @param children Les composants enfants qui pourront utiliser le context (tous le layout par exemple pour toute l'application)
 */
export function CookiesProvider({ children }) {
  // Initialisation de l'état du composant
  const [cookies, setCookies] = useState({})

  // fonction qui me permet de récupérer via les scripts axeptio les états des cookies (validés ou non) et je les stocke dans le state de mon composant.
  const cookiesDefined = useCallback(() => {
    let cookiesFormatted = {}
    if (typeof window !== 'undefined') {
      void 0 === window._axcb && (window._axcb = [])
      window._axcb.push(function (axeptio) {
        axeptio.on('cookies:complete', function (choices) {
          cookiesFormatted = mapKeys(choices, (value, key) => {
            return toLower(key)
          })
          setCookies(cookiesFormatted)
        })
      })
    }
    return cookiesFormatted
  }, [])

  // Je mets ma fonction dans un useEffect, elle sera appelée à l'initialisation du composant et à chaque modification ou rechargement
  useEffect(() => {
    cookiesDefined()
  }, [cookiesDefined])

  return <CookiesContext.Provider value={cookies}>{children}</CookiesContext.Provider>
}

// Création du context react
export const CookiesContext = React.createContext()
