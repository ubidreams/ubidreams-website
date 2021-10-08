import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { Img } from '../config/StaticImagesExport'

/**
 * @param namespace (namespace de référence pour trouver la traduction associée)
 * @param displayImage (position des blocs > image à droite ou à gauche)
 * @param classText (divers class permettant de customiser l'affichage du texte)
 * @param classImg (divers class permettant de customiser l'affichage de l'image)
 * @param showButton (Booléan indiquant la necessité d'afficher un bouton ou non)
 * @param minHeight (taille minimum du hero 90vh par defaut, mais plus petit parfois (ex: les sous-pages expertise avec l'ajout du breadcrumb))
 */
const PageTitle = ({
  namespace = '',
  displayImage = '',
  classText = '',
  classImg = '',
  showButton = false,
  minHeight = '90vh'
}) => {
  const { t } = useTranslation(namespace)
  const buttons = t('hero.buttonDetails', {}, { returnObjects: true, fallback: '' })

  return (
    <div
      className={`hero px-md-10 d-md-flex d-lg-flex flex-row${
        '-' + displayImage
      } align-items-center text-center text-md-start justify-content-between`}
    >
      <div className={classImg}>
        <Image src={Img[t('hero.img.key')]} alt={t('hero.img.alt')} />
      </div>

      <div className={classText}>
        <h1 className='display-1 fw-bold'>
          <strong>{t('hero.title')}</strong>
        </h1>
        {t('hero.description', {}, { fallback: '' }) && (
          <p className='fs-lg text-muted mb-0'>{t('hero.description')}</p>
        )}
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
