// External Librairies
import { useContext } from 'react'
import { useRouter } from 'next/router'

// Data
import { getAllLegalPages, getLegalPageBySlug } from '../lib/request/legal.js'

// Helpers & Config
import DefineMetatagsSEO from '../helpers/defineMetatagsSEO'
import { LangContext } from '../helpers/langContext'

// Components
import LegalTemplate from '../components/template/legal-template'

/**
 * PAGE [SLUG] pour les pages obligatoires type : mentions légales etc.
 * @param page résultats de la requête : getLegalPageBySlug
 */
const Page = ({ page }) => {
  // Initialisation de la page
  const { handleSpecialPath, activeLang } = useContext(LangContext)
  const router = useRouter()

  // je gère le cas où je n'ai pas de retour du router
  if (router.isFallback) return null

  // Je passe un tableau de slug de la page (en & fr) au context
  handleSpecialPath(page._allSlugLocales)

  return (
    <>
      <DefineMetatagsSEO seo={page} router={router} />
      {/* Template */}
      <LegalTemplate page={page} locale={activeLang} />
    </>
  )
}
export default Page

/**
 * Fonction asynchrone Next JS => Next.js will pre-render this page at build time using the props returned by getStaticProps.
 * @param preview booléen qui permet de gérer la preview (nous gérons cela au niveau du déploiement donc nous laissons à false)
 * @param locale locale active du site
 * @param params paramètre du router afin de récupérer le slug
 */
export async function getStaticProps({ preview = false, locale, params }) {
  const page = await getLegalPageBySlug(preview, locale, params?.slug)

  // Je n'ai pas de résultat avec la requête
  if (!page) {
    return {
      notFound: true
    }
  }
  // Nous renvoyons les données sous forme de props à la page
  return {
    props: { page }
  }
}

/**
 * Fonction asynchrone Next JS => it needs to define a list of paths to be statically generated.
 * Next.js will statically pre-render all the paths specified by getStaticPaths.
 */
export async function getStaticPaths() {
  //https://mariestarck.com/how-to-localize-your-next-js-application-with-next-translate/

  const paths = []

  // Je récupère tous les slugs possibles pour cette page
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

  // fallback : true => When someone requests a page that is not generated yet, the user will see the page with a loading indicator or skeleton component. Is useful if your app has a very large number of static pages that depend on data.
  return { paths, fallback: true }
}
