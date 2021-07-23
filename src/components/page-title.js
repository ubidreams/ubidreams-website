import Image from 'next/image'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'

import { Img } from '../config/StaticImagesExport'

/**
 * @param config (données sous la forme d'un objet (title, description, image, showButton))
 * @param displayDirection (position des blocs > image à droite ou à gauche)
 * @param alignText
 */
const PageTitle = ({ namespace = '', displayImage, alignText }) => {
  const { t } = useTranslation(namespace)
  const buttons = t('hero.buttonDetails', {}, { returnObjects: true })

  return (
    <div
      style={{ minHeight: '90vh' }}
      className={`px-md-10 d-md-flex d-lg-flex flex-row${
        '-' + displayImage
      } align-items-center text-center text-md-start justify-content-between`}
    >
      <div>
        <Image src={Img[t('hero.img.key')]} alt={t('hero.img.alt')} data-aos='fade-right' />
      </div>

      <div className={`text-${alignText}`}>
        <h1 className='display-1 fw-bold'>
          <div data-aos='fade-left'>
            <strong>{t('hero.title')}</strong>
          </div>
        </h1>

        {t('hero.description', {}, { fallback: '' }) && (
          <p className='fs-lg text-muted mb-0' data-aos='fade-left' data-aos-delay='100'>
            {t('hero.description')}
          </p>
        )}
        {buttons && (
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
