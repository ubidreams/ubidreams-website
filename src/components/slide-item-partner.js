import { Image } from 'react-datocms'
import ReactHtmlParser from 'react-html-parser'
import TypedReactHook from './typed'

const SlidItemPartner = ({ config }) => {
  const { img, nom, mandataire, description, url } = config
  return (
    <div className='card mb-6 mb-xl-0 px-4'>
      <div className='card-img-top shadow-light'>
        <Image
          alt=''
          data={{
            ...img.responsiveImage
          }}
          className='img-fluid object-contain img-regies'
        />
      </div>
      <div className='card-body'>
        {url ? (
          <a href={url} target='_blank' rel='noreferrer'>
            <h5 className='text-uppercase mb-1 text-dark-grey'>{nom}</h5>
          </a>
        ) : (
          <h5 className='text-uppercase mb-2 text-dark-grey'>
            {nom + ' '} {mandataire && <TypedReactHook word={mandataire} />}
          </h5>
        )}

        {description && (
          <div className='mb-0' style={{ whiteSpace: 'pre-line', fontSize: '0.9em' }}>
            {ReactHtmlParser(description)}
          </div>
        )}
      </div>
    </div>
  )
}

export default SlidItemPartner
