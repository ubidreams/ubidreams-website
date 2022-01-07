import { useContext } from 'react'
import { useRouter } from 'next/router'
import { getAllLegalPages, getLegalPageBySlug } from '../lib/request/legal.js'

import DefineMetatagsSEO from '../helpers/defineMetatagsSEO'
import { LangContext } from '../helpers/langContext'

import LegalTemplate from '../components/template/legal-template'

/* PAGE [SLUG] pour les pages obligatoires type : mentions légales etc. */
const Page = ({ page }) => {
  const { handleSpecialPath, activeLang } = useContext(LangContext)
  const router = useRouter()

  if (router.isFallback) return null

  handleSpecialPath(page._allSlugLocales)

  return (
    <>
      <DefineMetatagsSEO seo={page} router={router} />
      <LegalTemplate page={page} locale={activeLang} />
    </>
  )
}
export default Page

export async function getStaticProps({ preview = false, locale, params }) {
  const page = await getLegalPageBySlug(preview, locale, params?.slug)

  if (!page) {
    return {
      notFound: true
    }
  }
  return {
    props: { page }
  }
}

export async function getStaticPaths() {
  //https://mariestarck.com/how-to-localize-your-next-js-application-with-next-translate/

  const paths = []

  const englishPages = await getAllLegalPages('en')
  const frenchPages = await getAllLegalPages('fr')

  const fillPaths = (array) => {
    array.forEach((pages) => {
      pages.forEach(({ slug }) => {
        paths.push({
          params: {
            slug
          }
        })
      })
    })
  }
  fillPaths([englishPages, frenchPages])

  return { paths, fallback: true }
}
