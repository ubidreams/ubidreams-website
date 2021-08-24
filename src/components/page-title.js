import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { Img } from '../config/StaticImagesExport'

/**
 * @param config (données sous la forme d'un objet (title, description, image, showButton))
 * @param displayDirection (position des blocs > image à droite ou à gauche)
 * @param alignText
 */
const PageTitle = ({ namespace = '', displayImage = '', classText = '', classImg = '', showButton = false }) => {
  const { t } = useTranslation(namespace)
  const buttons = t('hero.buttonDetails', {}, { returnObjects: true, fallback: '' })

  return (
    <div
      style={{ minHeight: '90vh' }}
      className={`px-md-10 d-md-flex d-lg-flex flex-row${
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
          <p className='fs-lg text-muted mb-0' data-aos='fade-left' data-aos-delay='100'>
            {t('hero.description')}
          </p>
        )}
        {showButton && (
          <div className='mt-5' data-aos='fade-left' data-aos-delay='150'>
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
