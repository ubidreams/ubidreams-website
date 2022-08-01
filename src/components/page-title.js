// External Librairies
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'

// Helpers & Config
import { Img } from '../config/StaticImagesExport'

/**
 * PAGE TITLE : Entête de page principale
 *  Mise en forme d'une entête de page avec image et titre, potentiellement un sous-titre et des boutons si besoin
 * @param namespace (string namespace de référence pour trouver la traduction associée)
 * @param displayImage (string position des blocs > image à droite ou à gauche)
 * @param classText (string divers class permettant de customiser l'affichage du texte)
 * @param classImg (string divers class permettant de customiser l'affichage de l'image)
 * @param showButton (Booléen indiquant la nécessité d'afficher un bouton ou non)
 */
const PageTitle = ({ namespace = '', displayImage = '', classText = '', classImg = '', showButton = false }) => {
  // Initialisation du composant
  const { t } = useTranslation(namespace)
  const buttons = t('hero.buttonDetails', {}, { returnObjects: true, fallback: '' })

  return (
    <div
      className={`hero px-md-10 d-md-flex d-lg-flex flex-row${
        '-' + displayImage
      } align-items-center text-center text-md-start justify-content-between`}
    >
      {/* Image de l'entete */}
      <div className={classImg}>
        <Image src={Img[t('hero.img.key')]} alt={t('hero.img.alt')} />
      </div>

      <div className={classText}>
        {/* Titre */}
        <h1 className='display-1 fw-bold'>
          <strong>{t('hero.title')}</strong>
        </h1>
        {t('hero.description', {}, { fallback: '' }) && (
          <p className='fs-lg text-muted mb-0'>{t('hero.description')}</p>
        )}
        {/* Espace d'affichage des boutons si showButton est true */}
        {showButton && (
          <div className='mt-5'>
            {buttons.map((btn, index) => {
              return (
                <Link key={index} href={btn.path}>
                  <a className={`btn btn-blue ${btn.class} me-md-2`}>{btn.name}</a>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default PageTitle
