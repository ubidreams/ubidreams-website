import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'

/**
 * Zone de texte pour les technos, solutions, méthodes, option : titre, sous titre, description
 * @param config (données sous la forme d'un objet (title, subtitle, description))
 * @param alignText: aligne le text en fonction de la props passée
 */
const TextTechno = ({ config }) => {
  const { t } = useTranslation('common')
  const { title, content, textLink, buttonDetails } = config

  function splitColor(string, character) {
    return string.split(character)
  }

  return (
    <>
      <h4 className='fw-bold'>
        {title && title + ' '}
        {textLink && textLink && <a href='#'>{textLink}</a>}
      </h4>

      {content && (
        <p className='text-muted mb-0'>
          {splitColor(content, '%color%').map((word, index) => {
            if ((index + 1) % 2 == 0) {
              return (
                <span key={index} className='text-green'>
                  {word}
                </span>
              )
            } else {
              return word
            }
          })}
        </p>
      )}

      {buttonDetails && (
        <Link href={buttonDetails.key ? t(`header.expertise.items.${buttonDetails.key}.path`) : buttonDetails.path}>
          <a className={`btn btn-sm ${buttonDetails.class} me-md-2 mt-2`}>{buttonDetails.name}</a>
        </Link>
      )}
    </>
  )
}

export default TextTechno
