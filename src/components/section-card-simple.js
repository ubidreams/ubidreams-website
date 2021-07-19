import Image from 'next/image'
import TextContainer from './text-container'
import TextTechno from './text-techno'

const SectionCardSimple = ({ data = {}, type = '', index }) => {
  return (
    <div
      className={`d-md-flex flex-md-row card align-items-center p-3 ${
        type === 'techno' ? 'mb-3 shadow-light-lg' : 'minHeight'
      } 
        ${index % 2 === 1 && type === 'techno' ? 'flex-md-row-reverse' : 'me-md-3'}`}
    >
      <div className='w-md-50 start-3 p-4 text-center position-relative' style={{ maxWidth: '12em' }}>
        <Image src={data.img} alt={data.img.alt} />
      </div>
      <div className='w-100 w-md-75 d-flex flex-column p-4'>
        {type === 'techno' ? (
          <TextTechno config={data} alignText='left' />
        ) : (
          <TextContainer config={data} alignText='left' />
        )}
      </div>
    </div>
  )
}

export default SectionCardSimple
