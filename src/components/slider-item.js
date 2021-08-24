import { Image } from 'react-datocms'

import TextContainer from './text-container'

const SliderItem = ({ data = {} }) => {
  return (
    <div className='d-md-flex flex-md-row card align-items-center p-3 minHeight'>
      <div className='w-md-50 start-3 p-4 text-center position-relative' style={{ maxWidth: '12em' }}>
        <Image
          alt=''
          data={{
            ...data.img.responsiveImage
          }}
        />
      </div>
      <div className='w-100 w-md-75 d-flex flex-column p-4'>
        <TextContainer config={data} alignText='left' />
      </div>
    </div>
  )
}

export default SliderItem
