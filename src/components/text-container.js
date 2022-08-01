// External Librairies
import useTranslation from 'next-translate/useTranslation'
import ReactHtmlParser from 'react-html-parser'

//check for more informations: https://github.com/vinissimus/next-translate/issues/429
// Permet de gérer les conséquences d'un bug de la lib.
const checkIfTraductionExists = (t, config, section, field) => {
  return config && config[field] ? config[field] : t(section + `.${field}`, {}, { fallback: '' })
}

/**
 * TEXT CONTAINER : Zone de texte générale, option : titre, sous titre, description
 * @param config (données sous la forme d'un objet (title, subtitle, description))
 * @param alignText: propriété basée sur l'alignement du texte
 * @param namespace string désignant le namespace pour les clés de traduction
 * @param className classname appliqué sur la div globale
 */
const TextContainer = ({ namespace = null, config = null, alignText, className = '' }) => {
  // Initialisation du composant
  const { t } = useTranslation(namespace && namespace.name)
  const section = namespace && namespace.section

  // Vérification des données grâce à une méthode, cette méthode permet de gérer un bug lié à la lib de traduction
  const data = {
    title: checkIfTraductionExists(t, config, section, 'title'),
    subtitle: checkIfTraductionExists(t, config, section, 'subtitle'),
    content: checkIfTraductionExists(t, config, section, 'content'),
    footer: checkIfTraductionExists(t, config, section, 'footer')
  }

  return (
    <div className={`${className} text-${alignText}`}>
      {data.title && <h2 className='fw-bold'>{data.title}</h2>}

      {data.subtitle && <p className='text-muted mb-6 mb-md-8'>{data.subtitle}</p>}

      {data.content && <div style={{ whiteSpace: 'pre-line' }}>{ReactHtmlParser(data.content)}</div>}

      {data.footer && (
        <footer className='blockquote-footer mt-3'>
          <span className='h6 text-uppercase' style={{ whiteSpace: 'pre-line' }}>
            {data.footer}
          </span>
        </footer>
      )}
    </div>
  )
}

export default TextContainer
