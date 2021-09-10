import Link from 'next/link'
import { replace } from 'lodash'
import useTranslation from 'next-translate/useTranslation'

export const LinkBeautify = ({ router, record, meta, children, oldSlug }) => {
  const { t } = useTranslation('common')
  let pathname = '/expertises/[expertise]/[slug]'
  let newAs

  if (oldSlug) {
    newAs = replace(router.asPath, `/${oldSlug}`, `/${record.slug}`)
  } else {
    newAs = router.asPath + `/${record.slug}`
  }
  if (!record.slug) pathname = '/404'

  return (
    <Link
      href={{
        pathname: pathname,
        query: {
          expertise: t(`header.expertise.items.${record.categorie}.key`),
          slug: record.slug
        }
      }}
      as={newAs}
    >
      <a {...meta}>{children}</a>
    </Link>
  )
}
