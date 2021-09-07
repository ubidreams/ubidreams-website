import Image from 'next/image'
import ReactHtmlParser from 'react-html-parser'

export const CardExpertise = ({ config = [] }) => {
  const colors = ['blue', 'green', 'dark-grey', 'orange']
  return config.map((item, index) => {
    return (
      <div key={index}>
        <div
          className={`card card-expert card-border border-top border-${colors[index]} shadow-lg mb-6 mb-md-8 lift lift-lg`}
        >
          <div className='card-body text-center h-100'>
            <div className={`icon-circle bg-${colors[index]} mb-5`}>
              <Image
                src={item?.icon.url}
                alt={item?.icon.alt}
                width={item?.icon.width * 1.5}
                height={item?.icon.height * 1.5}
              />
            </div>

            <h4 className='fw-bold'>{item?.title}</h4>

            <div className='text-gray-700 mb-5'>{ReactHtmlParser(item?.description)}</div>
          </div>
        </div>
      </div>
    )
  })
}

export default CardExpertise
