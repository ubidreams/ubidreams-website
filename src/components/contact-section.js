// External Librairies
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { isEmpty } from 'lodash'

// Helpers & Config
import { Contact } from '../config/StaticImagesExport'

/**
 CONTACT SECTION : composant permettant la redirection directe vers la page contact
 Permet d'afficher une image sur la gauche (rogner par une forme), avec un petit texte et un bouton pour rejoindre la page contact
 @param mailObject string phrase contenant l'intitulé de l'objet du mail en fonction de la page sur laquelle nous sommes
 */
const ContactSection = ({ mailObject = '' }) => {
  // Initialisation du composant
  const { t } = useTranslation('common')
  const query = isEmpty(mailObject) ? {} : { object: mailObject }

  // Construction de l'objet contenant les données (intitulé des champs)
  const config = {
    img: {
      ...Contact,
      alt: t('contact.img.alt')
    },
    content: t('contact.content'),
    buttonLabel: t('contact.button')
  }

  return (
    <div className='card card-row shadow-light-lg mb-6' id='contact'>
      <div className='d-md-flex gx-0'>
        <>
          {/* Image et forme du template */}
          <div className='w-md-50'>
            <div className='card-img-start w-100 h-100 bg-cover' style={{ backgroundImage: `url(${config.img.src})` }}>
              <Image src={config.img} alt={config.img.alt} className='img-fluid d-md-none invisible' />
              <div className='shape shape-end shape-fluid-y text-white d-none d-md-block'>
                <svg viewBox='0 0 112 690' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M116 0H51v172C76 384 0 517 0 517v173h116V0z' fill='currentColor' />
                </svg>
              </div>
            </div>
          </div>
        </>
        <div className='w-md-50 w-100 position-md-static'>
          {/* Affichage du texte et du bouton */}
          <div className='card-body'>
            <blockquote className='blockquote text-center mb-0'>
              <p className='mb-5 mb-md-7' style={{ whiteSpace: 'pre-line' }}>
                {config.content}
              </p>
              <footer className='blockquote-footer'>
                <Link href={{ pathname: '/contact', query }} as='/contact'>
                  <a className='btn btn-blue'>{config.buttonLabel}</a>
                </Link>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactSection
