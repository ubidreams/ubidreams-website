import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'

/**
 * zone de texte associée à une image et un bouton (optionnel)
 * config (données sous la forme d'un tableau d'objet (title, description, image, aos-delay))
 * displayDirection (position des blocs > image au dessus ou à gauche)
 */
const StepContainer = ({ namespace = '', displayDirection }) => {
  const { t } = useTranslation(namespace)
  const features = t('stepContainer', {}, { returnObjects: true })

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
        <div className='mb-3 d-flex gx-0 align-items-center'>
          <div>
            <div className='btn btn-sm btn-rounded-circle bg-dark-grey text-white fs-4 disabled opacity-1'>
              <span>{item.step}</span>
            </div>
          </div>
          {index !== 2 && (
            <div className='w-100'>
              <hr className='d-none d-md-block me-n7'></hr>
            </div>
          )}
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
          <Link href={item.showButton.path}>
            <a className='btn btn-primary-soft'>{item.showButton.name}</a>
          </Link>
        )}
      </div>
    )
  })
}

export default StepContainer
