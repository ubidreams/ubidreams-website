import Image from 'next/image'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'

import { Img } from '../config/StaticImagesExport'
/**
 * zone de texte associée à une image et un bouton (optionnel)
 * config (données sous la forme d'un tableau d'objet (title, description, image, aos-delay))
 * displayDirection (position des blocs > image au dessus ou à gauche)
 */
const FeatureContainer = ({ namespace = '', displayDirection }) => {
  const { t } = useTranslation(namespace)
  const features = t('featureContainer', {}, { returnObjects: true })

  return features?.map((item, index) => {
    return (
      <div
        key={index}
        data-aos='fade-up'
        data-aos-delay={item.delay}
        style={{
          display: 'flex',
          flexDirection: displayDirection,
          margin: '0.5em'
        }}
      >
        <div style={{ marginRight: '1em', minWidth: '4rem' }} className='icon mb-3'>
          <Image src={Img[item.img.key]} alt={item.img.alt} width={45} height={45} />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '30rem'
          }}
        >
          <h3>{item.title}</h3>
          <p className='text-gray-700 mb-6 mb-md-0' style={{ textAlign: 'left' }}>
            {item.description}
          </p>
        </div>
        {item.buttonDetails && (
          <Link href={item.buttonDetails.path}>
            <a className='btn btn-primary-soft'>{item.buttonDetails.name}</a>
          </Link>
        )}
      </div>
    )
  })
}

export default FeatureContainer
