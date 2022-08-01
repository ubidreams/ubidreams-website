import { Image } from 'react-datocms'
import ReactHtmlParser from 'react-html-parser'

/**
 CARD Membre : card de présentation d'un collaborateur
 Permet d'afficher une image, nom et prénom, fonction et une courte présentation grâce à une animation en hover.
   @param config (données sous la forme d'un tableau d'objet)
 */
const CardMember = ({ config = [] }) => {
  return config.map((item, index) => {
    return (
      <div key={index} className='mb-6'>
        <div className='card shadow-light-lg mb-7 mb-md-0 m-md-2 custom-card-link h-100'>
          {/* Affichage de la photo du collaborateur, si une citation est associée alors nous gérons l'affichage avec une animation de flou */}
          <div className={item?.citation ? 'card-blur' : ''}>
            <Image
              alt=''
              data={{
                ...item.cardCover.responsiveImage
              }}
              className='card-img-top'
            />
            {item?.citation && (
              <div className='card-img-overlay citation'>
                <div className='card-text'>{ReactHtmlParser(item?.citation)}</div>
              </div>
            )}
          </div>
          {/* Affichage du nom et de la fonction */}
          <div className='card-body'>
            <div className='shape shape-bottom-100 shape-fluid-x text-white'>
              <svg viewBox='0 0 2880 48' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z' fill='currentColor' />
              </svg>
            </div>
            <h6 className='text-uppercase mb-1 text-muted'>{item.subtitle}</h6>

            <h4 className='mb-0'>{item.title}</h4>
          </div>
        </div>
      </div>
    )
  })
}

export default CardMember
