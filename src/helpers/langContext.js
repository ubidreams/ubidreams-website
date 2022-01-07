import React, { useCallback, useState } from 'react'
import router, { useRouter } from 'next/router'
import { remove } from 'lodash'
import useTranslation from 'next-translate/useTranslation'

export function LangProvider({ children }) {
  const { t } = useTranslation('common')
  const { locale, locales, pathname, replace } = useRouter()
  const [lang, setLang] = useState({ activeLang: locale })
  let slugs = null

  const ChangeLanguageButton = useCallback(
    (langActive) => {
      return (
        <div id='switch-language'>
          <div className='dropdown'>
            <button
              className='btn btn-language dropdown-toggle'
              type='button'
              id='dropdownBtnLanguage'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              {t(`locale.${langActive}`)}
            </button>
            <div className='dropdown-menu dropdown-menu-end' aria-labelledby='dropdownBtnLanguage'>
              {locales.map((lg, index) => {
                if (lg != langActive) {
                  return (
                    <a
                      key={index}
                      className='dropdown-item'
                      href='!#'
                      onClick={(e) => {
                        e.preventDefault()
                        setLang((state) => ({ ...state, activeLang: lg }))

                        //si j'ai un tableau de slug alors je dois construire mon path
                        if (slugs) {
                          const nextPath = slugs?.find((slug) => slug.locale === lg)?.value

                          const splittedPath = router.asPath.split('/')
                          splittedPath.pop()

                          remove(splittedPath, (i) => i === '')
                          splittedPath.push(nextPath)

                          let newPath = ''
                          splittedPath.forEach((item) => {
                            newPath += '/' + item
                          })

                          replace(newPath, null, { locale: lg })

                          //Sinon je suis sure une page classique (même traduction anglais/français)
                        } else {
                          replace(pathname, null, { locale: lg })
                        }
                      }}
                    >
                      {t(`locale.${lg}`)}
                    </a>
                  )
                }
              })}
            </div>
          </div>
          <div id='switch-mobile'>
            {locales.map((lg, index) => {
              return (
                <button
                  key={index}
                  className={`btn btn-language ${lg == langActive ? 'active' : ''}`}
                  onClick={() => {
                    setLang((state) => ({ ...state, activeLang: lg }))

                    //si j'ai un tableau de slug alors je dois construire mon path
                    if (slugs) {
                      const nextPath = slugs?.find((slug) => slug.locale === lg)?.value

                      const splittedPath = router.asPath.split('/')
                      splittedPath.pop()

                      remove(splittedPath, (i) => i === '')
                      splittedPath.push(nextPath)

                      let newPath = ''
                      splittedPath.forEach((item) => {
                        newPath += '/' + item
                      })

                      replace(newPath, null, { locale: lg })

                      //Sinon je suis sure une page classique (même traduction anglais/français)
                    } else {
                      replace(pathname, null, { locale: lg })
                    }
                  }}
                >
                  {lg}
                </button>
              )
            })}
          </div>
        </div>
      )
    },
    [locales, pathname, replace, slugs]
  )

  return (
    <LangContext.Provider
      value={{
        activeLang: locale,
        langComponent: ChangeLanguageButton(locale),
        specialPath: null,
        handleSpecialPath: (slugsByLocales) => {
          slugs = slugsByLocales
        }
      }}
    >
      {children}
    </LangContext.Provider>
  )
}

export const LangContext = React.createContext()
