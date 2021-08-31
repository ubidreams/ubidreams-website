import { getAllReferences, getAllRegies } from '../../lib/api'
import References from '.'

export const ReferencesPage = ({ sixReferences, totalReferences, regies, page }) => {
  return <References sixReferences={sixReferences} totalReferences={totalReferences} regies={regies} page={page} />
}

export default ReferencesPage

export async function getServerSideProps({ query, locale }) {
  const page = query.page
  const references = (await getAllReferences(query.preview, locale, query.page)) || []
  const regies = (await getAllRegies(query.preview, locale)) || []
  const sixReferences = references.allReferences
  const totalReferences = references._allReferencesMeta.count

  return {
    props: { sixReferences, totalReferences, regies, page }
  }
}
