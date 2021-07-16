import Image from 'next/image'
import Link from 'next/link'
/**
 * zone de texte associée à une image et un bouton (optionnel)
 * config (données sous la forme d'un tableau d'objet (title, description, image, aos-delay))
 * displayDirection (position des blocs > image au dessus ou à gauche)
 */
const FeatureContainer = ({ config = [], displayDirection }) => {
  return config.map((item, index) => {
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
          <Image src={item.img} alt={item.img.alt} width={45} height={45} />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '30rem'
          }}
        >
          <h3>{item.title}</h3>
          <p className='text-gray-700 mb-6 mb-md-0' style={{ textAlign: 'justify' }}>
            {item.description}
          </p>
        </div>
        {item.buttonDetails && <Link href={item.showButton.path}><a className='btn btn-primary-soft'>{item.showButton.name}</a></Link>}
      </div>
    )
  })
}

export default FeatureContainer
