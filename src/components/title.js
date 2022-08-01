/**
 * TITLE : affichage d'un titre
 * @param title string intitulé du titre
 * @param subtitle string intitulé du sous titre
 * @param className string pour les class de style du container de titre
 * @param titleH class pour l'affichage du titre
 * @param subtitleH class pour l'affichage du sous titre
 */
const Title = ({ title = '', subtitle = '', className = '', titleH = 'h1 display-1', subtitleH = 'h2' }) => {
  return (
    <div className={`text-center ${className}`}>
      <h1 className={`${titleH} fw-bold`} style={{ whiteSpace: 'pre-line' }}>
        {title}
      </h1>
      <h2 className={`${subtitleH} fs-lg text-muted mb-0`}>{subtitle}</h2>
    </div>
  )
}

export default Title
