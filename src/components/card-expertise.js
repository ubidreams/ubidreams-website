// External Librairies
import Image from 'next/image'
import { useRouter } from 'next/router'
import { StructuredText } from 'react-datocms'

// Components
import { LinkBeautify } from './link-beautify'

/**
  CARD EXPERTISE : card de présentation d'une expertise
  Permet d'afficher une icon, un titre et un paragraphe de text.
     @param config tableau d'objet contenant les données à afficher dans le composant
 */
export const CardExpertise = ({ config = [] }) => {
  // définition des couleurs utilisable pour les cards
  const colors = ['blue', 'green', 'dark-grey', 'orange', 'grey-blue', 'grey', 'dark-green']
  const router = useRouter()

  return config.map((item, index) => {
    return (
      <div key={index}>
        <div
          className={`card card-expert card-border border-top border-${colors[index]} shadow-lg mb-6 mb-md-8 lift lift-lg`}
        >
          <div className='card-body text-center h-100'>
            {/* ICON */}
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
              {/* CONTENU DU PARAGRAPHE */}
              <StructuredText
                data={item?.description}
                renderLinkToRecord={({ record, children, transformedMeta }) => {
                  // Gestion des liens internes au paragraphe permettant d'aller sur les sous pages
                  return (
                    <LinkBeautify record={record} router={router} meta={transformedMeta}>
                      {children}
                    </LinkBeautify>
                  )
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  })
}

export default CardExpertise
