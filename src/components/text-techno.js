import Link from 'next/link'

/**
 * Zone de texte pour les technos, solutions, méthodes, option : titre, sous titre, description
 * @param config (données sous la forme d'un objet (title, subtitle, description))
 * @param alignText: aligne le text en fonction de la props passée
 */
const TextTechno = ({ config }) => {
  const { title, content, textLink, buttonDetails } = config

  return (
    <>
      <h4 className='fw-bold'>
        {title && title + ' '}
        {textLink && textLink && <a href='#'>{textLink}</a>}
      </h4>

      {content && <p className='text-muted mb-0'>{content}</p>}

      {buttonDetails && (
        <Link href={buttonDetails.path}>
          <a className={`btn btn-sm ${buttonDetails.class} me-md-2 mt-2`}>{buttonDetails.name}</a>
        </Link>
      )}
    </>
  )
}

export default TextTechno
