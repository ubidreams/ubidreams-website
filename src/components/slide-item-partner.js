import { Image } from 'react-datocms'
import ReactHtmlParser from 'react-html-parser'

const SlidItemPartner = ({ config }) => {
  const { img, nom, description, url } = config
  return (
    <div className='card mb-6 mb-xl-0 px-4'>
      <div className='card-img-top shadow-light-lg'>
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
            <h6 className='text-uppercase mb-1 text-dark-grey'>{nom}</h6>
          </a>
        ) : (
          <h6 className='text-uppercase mb-1 text-dark-grey'>{nom}</h6>
        )}

        {description && (
          <div className='h4 mb-0' style={{ whiteSpace: 'pre-line' }}>
            {ReactHtmlParser(description)}
          </div>
        )}
      </div>
    </div>
  )
}

export default SlidItemPartner
