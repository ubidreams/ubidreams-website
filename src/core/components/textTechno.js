/**
 * Zone de texte pour les technos, solutions, méthodes, option : titre, sous titre, description
 * @param config (données sous la forme d'un objet (title, subtitle, description))
 * @param alignText: aligne le text en fonction de la props passée
 */
const TextTechno = ({ config, alignText }) => {
  const { title, content, textLink } = config

  return (
    <div className={`text-${alignText}`}>
      {title && (
        <h4 className='fw-bold'>
          {title + ' '}
          {textLink && <a href='#'>{textLink}</a>}
        </h4>
      )}

      {content && <p className='text-muted mb-0'>{content}</p>}
    </div>
  )
}

export default TextTechno
