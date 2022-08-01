import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'

/**
 * TEXT TECHNO : Zone de texte pour les technos, solutions, méthodes, option : titre, sous titre, description
 * @param config (données sous la forme d'un objet (title, subtitle, description))
 */
const TextTechno = ({ config }) => {
  // Initialisation du composant
  const { t } = useTranslation('common')
  // Affectation par décomposition
  const { title, content, textLink, buttonDetails } = config

  // Pour les textes statiques avec des mots encadrés de %color% je retire %color%
  function splitColor(string, character) {
    return string.split(character)
  }

  return (
    <>
      {/* Affichage du titre */}
      <h4 className='fw-bold'>
        {title && title + ' '}
        {textLink && textLink && <a href='#'>{textLink}</a>}
      </h4>

      {/* affichage du contenu avec des morceaux de textes dans une couleur différente */}
      {content && (
        <p className='text-muted mb-0'>
          {splitColor(content, '%color%').map((word, index) => {
            if ((index + 1) % 2 == 0) {
              return (
                <span key={index} className='text-black'>
                  {word}
                </span>
              )
            } else {
              return word
            }
          })}
        </p>
      )}
      {/* si besoin d'afficher un bouton */}
      {buttonDetails && (
        <Link href={buttonDetails.key ? t(`header.expertise.items.${buttonDetails.key}.path`) : buttonDetails.path}>
          <a className={`btn btn-sm ${buttonDetails.class} me-md-2 mt-2`}>{buttonDetails.name}</a>
        </Link>
      )}
    </>
  )
}

export default TextTechno
