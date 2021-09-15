import { getAllPageSlugs, getOnePageBySlug, getLastRefByTech } from '../../../lib/api'
import { useRouter } from 'next/router'

import PageTemplate from '../../../components/template/page-template'

const SlugPage = ({ page, lastRef }) => {
  const router = useRouter()

  if (router.isFallback) return null

  return <PageTemplate page={page} lastRef={lastRef} router={router} />
}
export default SlugPage

export async function getStaticProps({ preview = false, locale, ...props }) {
  const page = await getOnePageBySlug(preview, locale, props.params?.slug)
  const lastRef = page?.etiquette?.id ? await getLastRefByTech(page.etiquette.id, locale) : []

  if (!page) {
    return {
      notFound: true
    }
  }
  return {
    props: { page, lastRef }
  }
}

export async function getStaticPaths() {
  //https://mariestarck.com/how-to-localize-your-next-js-application-with-next-translate/

  const paths = []

  const englishPages = await getAllPageSlugs('(development|consulting|internet-of-things|design)', 'en')
  const frenchPages = await getAllPageSlugs('(development|consulting|internet-of-things|design)', 'fr')

  const fillPaths = (array) => {
    array.forEach((pages) => {
      pages.forEach(({ slug, categorie }) => {
        paths.push({
          params: {
            slug,
            params: categorie
          }
        })
      })
    })
  }
  fillPaths([englishPages, frenchPages])

  return { paths, fallback: true }
}
