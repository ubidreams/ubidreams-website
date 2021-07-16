/**
 * Zone de texte générale, option : titre, sous titre, description
 * @param config (données sous la forme d'un objet (title, subtitle, description))
 * @param alignText: propriété basée sur l'alignement du texte
 * @param customStyle appliqué sur la div globale
 */
const TextContainer = ({ config, alignText, className = '' }) => {
  const { title, subtitle, content, footer } = config

  return (
    <div className={`${className} text-${alignText}`}>
      {title && <h2 className='fw-bold'>{title}</h2>}

      {subtitle && <p className='text-muted mb-6 mb-md-8'>{subtitle}</p>}

      {content && (
        <p className='text-gray-700' style={{ whiteSpace: 'pre-line' }}>
          {content}
        </p>
      )}

      {footer && (
        <footer className='blockquote-footer mt-3'>
          <span className='h6 text-uppercase' style={{ whiteSpace: 'pre-line' }}>{footer}</span>
        </footer>
      )}
    </div>
  )
}

export default TextContainer
