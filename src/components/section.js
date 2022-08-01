/**
 * SECTION : Zone de contenu contenant un ou plusieurs composants enfants
 * Permet notamment de définir les margin et le background d'une zone précise de la page
 * @param bgClass string class indiquant la couleur de fond de la section
 * @param children composants enfants de la section
 * @param customStyle objet de style pour surcharger exceptionnellement certains éléments de style
 * @param display string à passer dans une className permettant de définir les margin type container par défaut ou pas de margin du tout
 */
const Section = ({ bgClass = '', children, customStyle = {}, display = 'container', ...props }) => {
  return (
    <section className={'py-8 py-md-11' + ' ' + bgClass} style={customStyle} {...props}>
      <div className={`${display}`}>{children}</div>
    </section>
  )
}

export default Section
