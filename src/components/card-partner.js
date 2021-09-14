import { Image } from 'react-datocms'
import ReactHtmlParser from 'react-html-parser'

const CardPartner = ({ config = {}, reverse, showShadows = false, textJustify = '' }) => {
  return config.map((partner, index) => {
    return (
      <div
        key={index}
        className={`p-3 mb-3 mw-md-50
        ${showShadows ? 'shadow-light-lg' : ''}
        `}
      >
        <div
          className={`d-md-flex flex-md-row  align-items-center card h-100 ${
            index % 2 == 1 ? 'flex-md-row-reverse' : ''
          }`}
        >
          <div className='w-md-50 start-3 p-4 text-center position-relative' style={{ maxWidth: '12em' }}>
            <Image data={partner.image.responsiveImage} alt='' />
          </div>
          <div
            className={`w-100 h-100 w-md-75 d-flex flex-column p-5 text-left 
          ${textJustify}`}
          >
            <h4 className='fw-bold'>{ReactHtmlParser(partner.name)}</h4>

            <div className='text-muted mb-0'>{ReactHtmlParser(partner.content)}</div>
          </div>
        </div>
      </div>
    )
  })
}

export default CardPartner
