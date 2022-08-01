// External Librairies
import Link from 'next/link'

/**
 LINK BEAUTIFY : composant permettant de retravailler un lien d'url issu de DATOCMS
 Les liens inclus dans le "structuredText" de DATO ne prend pas en compte les chemins complexe (expertises, solution, blog...).
 Il est nécessaire de reconstruire un pathname (next/router) en concaténant la catégorie de la page et le slug.
 @param record il s'agit de l'objet de type linkRecord de DATOCMS
 @param meta contient des propriétés à passer en props du lien (origine : DATOCMS)
 @param children élément à contenir dans le lien
 */
export const LinkBeautify = ({ record, meta = null, children }) => {
  // Initialisaton du composant
  let pathname
  let newAs
  let query = { slug: record?.slug }

  // En fonction de la catégorie je construis le pathname adéquat
  switch (record?.categorie) {
    case 'solution':
      pathname = '/expertises/[params]'
      newAs = `/expertises/${record.slug}`
      break
    case 'development':
    case 'consulting':
    case 'design':
    case 'internet-of-things':
      pathname = '/expertises/[params]/[slug]'
      newAs = `/expertises/${record.categorie}/${record.slug}`
      query = { ...query, params: record.categorie }
      break
    case 'reference':
      pathname = '/references/[params]'
      newAs = `/references/${record.slug}`
      break
    case 'blog':
      pathname = '/blog/[slug]'
      newAs = `/blog/${record.slug}`
      break
    default:
      pathname = '/'
      newAs = `/`
  }

  // Si je n'ai pas de slug alors je redirige vers la page 404
  if (!record?.slug) pathname = '/404'

  // Je retourne mon lien avec en href la bonne navigation
  return (
    <Link
      href={{
        pathname: pathname,
        query
      }}
      as={newAs}
    >
      <a {...meta} rel='noopener noreferrer'>
        {children}
      </a>
    </Link>
  )
}
