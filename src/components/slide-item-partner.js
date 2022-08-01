// External Librairies
import { Image } from 'react-datocms'
import ReactHtmlParser from 'react-html-parser'

// Components
import TypedReactHook from './typed'

/**
 * SLID ITEM PARTNER : un slide du partenaire avec animation d'écriture
 * @param config objet de données
 */
const SlidItemPartner = ({ config }) => {
  // Affectation par décomposition
  const { img, nom, mandataire, description, url } = config
  return (
    <div className='card mb-6 mb-xl-0 px-4'>
      <div className='card-img-top shadow-light'>
        {/* IMAGE */}
        <Image
          alt=''
          data={{
            ...img.responsiveImage
          }}
          className='img-fluid object-contain img-regies'
        />
      </div>
      <div className='card-body'>
        {/* S'il y a une URL alors le titre est un lien sinon titre classique*/}
        {url ? (
          <a href={url} target='_blank' rel='noopener noreferrer'>
            <h5 className='text-uppercase mb-1 text-dark-grey' style={{ fontWeight: 'unset' }}>
              {nom}
            </h5>
          </a>
        ) : (
          <h5 className='text-uppercase mb-2 text-dark-grey' style={{ fontWeight: 'unset' }}>
            {nom + ' '} {mandataire && <TypedReactHook word={mandataire} />}
          </h5>
        )}

        {/* CONTENU DU SLIDE */}
        {description && (
          <div className='mb-0' style={{ whiteSpace: 'pre-line', fontSize: '0.9em' }}>
            {ReactHtmlParser(description)}
          </div>
        )}
      </div>
    </div>
  )
}

export default SlidItemPartner
