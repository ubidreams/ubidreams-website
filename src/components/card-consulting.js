import Image from 'next/image'
import { useRouter } from 'next/router'
import { StructuredText } from 'react-datocms'
import { LinkBeautify } from './link-beautify'

export const CardConsulting = ({ config = [] }) => {
  const colors = ['blue', 'green', 'dark-grey', 'orange', 'grey-blue', 'grey', 'dark-green']

  return config.map((item, index) => {
    return (
      <div key={index}>
        <div
          className={`card card-consulting card-border border-top border-${colors[index]} shadow-lg mb-6 mb-md-8 lift lift-lg`}
        >
          <LinkBeautify record={item.offre}>
            <div className='card-body text-center h-100 p-4'>
              <div className={`icon-circle bg-${colors[index]} mb-5`}>
                <Image
                  src={item?.icon.url}
                  alt={item?.icon.alt}
                  width={item?.icon.width * 1.5}
                  height={item?.icon.height * 1.5}
                />
              </div>

              <h4 className='fw-bold'>{item?.title}</h4>
              <div className='mb-5'>
                <StructuredText
                  data={item?.description}
                  renderLinkToRecord={({ record, children, transformedMeta }) => {
                    return null
                  }}
                />
              </div>
            </div>
          </LinkBeautify>
        </div>
      </div>
    )
  })
}

export default CardConsulting
