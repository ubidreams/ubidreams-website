// External Librairies
import Image from 'next/image'
import { StructuredText } from 'react-datocms'

// Components
import { LinkBeautify } from './link-beautify'

/**
  CARD CONSULTING : card de présentation d'un service consulting
  Permet d'afficher un ensemble de données sous le format de carte avec une ICON et texte ...
    @param config tableau d'objet contenant les données à afficher dans le composant
*/
export const CardConsulting = ({ config = [] }) => {
  // définition des couleurs utilisable pour les cards
  const colors = ['dark-grey', 'green', 'blue', 'orange', 'grey-blue', 'grey', 'dark-green']

  return config.map((item, index) => {
    return (
      <div key={index}>
        <div
          className={`card card-consulting card-border border-top border-${colors[index]} shadow-lg mb-6 mb-md-8 lift lift-lg`}
        >
          {/* Lien vers la page de service*/}
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
                {/* Contenu du texte, les liens ne sont pas possibles dans le contenu puisque la card elle-même est un lien */}
                <StructuredText data={item?.description} renderLinkToRecord={() => null} />
              </div>
            </div>
          </LinkBeautify>
        </div>
      </div>
    )
  })
}

export default CardConsulting
