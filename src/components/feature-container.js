// External Librairies
import Image from 'next/image'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { isEmpty } from 'lodash'

// Helpers & Config
import { Img } from '../config/StaticImagesExport'

/**
 FEATURE CONTAINER : zone de texte associée à une image et un bouton (optionnel)
 Permet d'afficher une icon sur la gauche ou en haut avec un titre et un sous titre complet
 @param data données sous la forme d'un objet (title, description, image, aos-delay)
 @param displayDirection (position des blocs > image au dessus ou à gauche)
 @param namespace string phrase contenant l'intitulé de l'objet du mail en fonction de la page sur laquelle nous sommes
 @param className string propriété de style à ajouter sur la div globale
 */
const FeatureContainer = ({ namespace = null, displayDirection, data = {}, className = '' }) => {
  // Initialisation du composant
  const { t } = useTranslation(namespace && namespace.name)

  // Récupération des clés de traduction à partir du namespace pasé en props
  const section = namespace.section ? namespace.section + '.featureContainer' : 'featureContainer'
  const features = isEmpty(data) ? t(`${section}`, {}, { returnObjects: true }) : data.featureContainer

  return features?.map((item, index) => {
    return (
      <div
        key={index}
        data-aos='fade-up'
        data-aos-delay={item.delay}
        className={`${className} d-flex flex-${displayDirection}`}
      >
        {/* Image */}
        <div style={{ marginRight: '1em', minWidth: '4rem' }} className='icon mb-3'>
          <Image src={Img[item.img.key]} alt={item.img.alt} width={45} height={45} />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '30rem'
          }}
        >
          {/* s'il y a une clé de traduction cela signifie que je récupère un lien que le titre est cliquable. */}
          {item.key ? (
            <Link href={t(`common:header.expertise.items.${item.key}.path`)}>
              <a>
                <h3>{item.title}</h3>
              </a>
            </Link>
          ) : (
            <h3>{item.title}</h3>
          )}
          <p className='mb-6 mb-md-0' style={{ textAlign: 'left' }}>
            {item.description}
          </p>
        </div>
        {/* S'il y a un bouton dans mes données alors j'en affiche un */}
        {item.buttonDetails && (
          <Link href={item.buttonDetails.path}>
            <a className='btn btn-primary-soft'>{item.buttonDetails.name}</a>
          </Link>
        )}
      </div>
    )
  })
}

export default FeatureContainer
