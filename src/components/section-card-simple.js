// External Librairies
import ImageStatic from 'next/image'

// Helpers & Config
import { Img } from '../config/StaticImagesExport'

// Components
import TextTechno from './text-techno'

/**
 * SECTION CARD SIMPLE : card classique avec image, texte et bouton
 * @param data objet de données
 * @param reverse booléen permet de savoir le sens d'affichage
 * @param showShadows booléen afin de savoir si on affiche des shadows autour de la card
 * @param textJustify string à concaténer dans une class pour définir le format du texte
 */
const SectionCardSimple = ({ data = {}, reverse, showShadows = false, textJustify = '' }) => {
  return (
    <div
      className={`p-3 mb-3
        mw-md-${data.col ? data.col : '50'}
        ${showShadows ? 'shadow-light-lg' : ''}
        `}
    >
      <div className={`d-md-flex flex-md-row  align-items-center card h-100 ${reverse ? 'flex-md-row-reverse' : ''}`}>
        <div className='w-md-50 start-3 p-4 text-center position-relative' style={{ maxWidth: '12em' }}>
          <ImageStatic src={Img[data.img.key]} alt={data.img.alt} />
        </div>
        <div
          className={`w-100 h-100 w-md-75 d-flex flex-column p-5 text-left 
          ${textJustify}`}
        >
          {/* Utilisation d'un composant d'affichage de texte + button*/}
          <TextTechno config={data} alignText='left' />
        </div>
      </div>
    </div>
  )
}

export default SectionCardSimple
