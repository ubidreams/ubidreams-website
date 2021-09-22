import { Image } from 'react-datocms'
import ReactHtmlParser from 'react-html-parser'

const SlidItemPartner = ({ config }) => {
  const { img, nom, description } = config
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
        <h6 className='text-uppercase mb-1 text-muted'>{nom}</h6>

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
