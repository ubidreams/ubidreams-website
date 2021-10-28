import React, { useCallback, useEffect, useState } from 'react'
import { mapKeys, toLower } from 'lodash'

export function CookiesProvider({ children }) {
  const [cookies, setCookies] = useState({})

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

  useEffect(() => {
    cookiesDefined()
  }, [cookiesDefined])

  return <CookiesContext.Provider value={cookies}>{children}</CookiesContext.Provider>
}

export const CookiesContext = React.createContext()
