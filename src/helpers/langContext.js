// External Librairies
import React, { useCallback, useState } from 'react'
import router, { useRouter } from 'next/router'
import { remove } from 'lodash'
import useTranslation from 'next-translate/useTranslation'

/**
 * LangProvider : Context react mettant en place une gestion contextualisée des cookies sur l'application
 * @param children Les composants enfants qui pourront utiliser le context (tous le layout par exemple pour toute l'application)
 */
export function LangProvider({ children }) {
  // Initialisation du composant (traduction, affectation des variables, state)
  const { t } = useTranslation('common')
  const { locale, locales, pathname, replace } = useRouter()
  const [lang, setLang] = useState({ activeLang: locale })
  let slugs = null

  // Fonction permettant de gérer l'affichage du bouton de switch de langage en fonction de la locale active
  const ChangeLanguageButton = useCallback(
    (langActive) => {
      return (
        <div id='switch-language'>
          <div className='dropdown'>
            {/* Bouton avec affichage de la langue active*/}
            <button
              className='btn btn-language dropdown-toggle'
              type='button'
              id='dropdownBtnLanguage'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              {t(`locale.${langActive}`)}
            </button>
            {/* Dropdown pour sélectionner une autre langue. Je map sur les autres locales disponibles pour le site (config i18n) */}
            <div className='dropdown-menu dropdown-menu-end' aria-labelledby='dropdownBtnLanguage'>
              {locales.map((lg, index) => {
                if (lg != langActive) {
                  // LE clic sur une nouvelle langue change l'état du context et donc de toute l'application qui va être rechargée
                  return (
                    <a
                      key={index}
                      className='dropdown-item'
                      href='!#'
                      onClick={(e) => {
                        e.preventDefault()
                        setLang((state) => ({ ...state, activeLang: lg }))

                        //si j'ai un tableau de slug (cas des liens issus de dato avec une url traduite) alors je dois construire mon path
                        if (slugs) {
                          const nextPath = slugs?.find((slug) => slug.locale === lg)?.value
                          // Je transforme mon path en tableau et supprime le slug qui était écrit selon l'ancienne trad
                          const splittedPath = router.asPath.split('/')
                          splittedPath.pop()

                          // je supprime l'espace qui a été généré par le pop
                          remove(splittedPath, (i) => i === '')
                          // J'ajoute le slug qui correponds à mon slug traduit selon la nouvelle locale
                          splittedPath.push(nextPath)

                          // Je reconstruis un pat à partir des éléments de mon tableau
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
          // Les slugs avec traduction
          slugs = slugsByLocales
        }
      }}
    >
      {children}
    </LangContext.Provider>
  )
}

// Création du context
export const LangContext = React.createContext()
