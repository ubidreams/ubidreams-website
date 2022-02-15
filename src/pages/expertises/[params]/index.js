import { useContext } from 'react'
import { getAllPageSlugs, getOnePageBySlug } from '../../../lib/request/expertise.js'
import { getLastRefByTech } from '../../../lib/request/reference.js'
import { useRouter } from 'next/router'

import PageTemplate from '../../../components/template/page-template'

//Helper & Context
import DefineMetatagsSEO from '../../../helpers/defineMetatagsSEO'
import { LangContext } from '../../../helpers/langContext'

const Page = ({ page, lastRef }) => {
  const { handleSpecialPath } = useContext(LangContext)
  const router = useRouter()

  if (router.isFallback) return null

  handleSpecialPath(page._allSlugLocales)

  return (
    <>
      <DefineMetatagsSEO
        seo={page}
        router={router}
        categorie={page.categorie}
        image={page.image && page.image.responsiveImage.src}
      />
      <PageTemplate page={page} lastRef={lastRef} router={router} />
    </>
  )
}
export default Page

export async function getStaticProps({ preview = false, locale, ...props }) {
  const page = await getOnePageBySlug(preview, locale, props.params?.params)
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

  const englishPages = await getAllPageSlugs('(solution)', 'en')
  const frenchPages = await getAllPageSlugs('(solution)', 'fr')

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
