// External Librairies
import Pagination from 'rc-pagination'

/**
 * PAGINATION : Composant de pagination pour le blog et les références
 * @param data tableau de toute la listes d'items (articles, références)
 * @param current number indiquant la page actuelle
 * @param onChange fonction trigger quand une autre page est cliquée
 */
export const PaginationComponent = ({ data = [], current = 1, onChange }) => {
  // Rendu d'un lien de page, je surcharge l'item actif et sinon je renvoie l'élément par défaut
  const itemRender = (current, type, element) => {
    if (type === 'page') {
      return (
        <a className='text-black' href={`#${current}`}>
          {current}
        </a>
      )
    }
    return element
  }

  // Le composant Pagination est issu d'une lib externe
  return (
    <Pagination
      total={data.length}
      defaultPageSize={6}
      onChange={onChange}
      itemRender={itemRender}
      showPrevNextJumpers={false}
      current={current}
      hideOnSinglePage={true}
    />
  )
}

export default PaginationComponent
