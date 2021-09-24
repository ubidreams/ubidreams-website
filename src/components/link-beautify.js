import Link from 'next/link'

export const LinkBeautify = ({ record, meta, children }) => {
  let pathname
  let newAs
  let query = { slug: record.slug }

  switch (record.categorie) {
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
    default:
      pathname = '/'
      newAs = `/`
  }

  if (!record.slug) pathname = '/404'

  return (
    <Link
      href={{
        pathname: pathname,
        query
      }}
      as={newAs}
    >
      <a {...meta}>{children}</a>
    </Link>
  )
}
