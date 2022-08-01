// External Librairies
import { useContext } from 'react'
import { useRouter } from 'next/router'

// Data
import { getAllPageSlugs, getOnePageBySlug } from '../../../lib/request/expertise.js'
import { getLastRefByTech } from '../../../lib/request/reference.js'

// Components
import PageTemplate from '../../../components/template/page-template'

// Helpers & Config
import DefineMetatagsSEO from '../../../helpers/defineMetatagsSEO'
import { LangContext } from '../../../helpers/langContext'

/**
 * PAGE TEMPLATE DES EXPERTISES
 * @param page résultats de la requête : getOnePageBySlug
 * @param lastRef résultats de la requête : getLastRefByTech
 */
const SlugPage = ({ page, lastRef }) => {
  // Initialisation de la page
  const { handleSpecialPath } = useContext(LangContext)
  const router = useRouter()

  // je gère le cas où je n'ai pas de retour du router
  if (router.isFallback) return null

  // Je passe un tableau de slug de la page (en & fr) au context
  handleSpecialPath(page._allSlugLocales)

  return (
    <>
      <DefineMetatagsSEO
        seo={page}
        router={router}
        categorie={page.categorie}
        image={page.image && page.image.responsiveImage.src}
      />
      {/* Template */}
      <PageTemplate page={page} lastRef={lastRef} router={router} />
    </>
  )
}
export default SlugPage

/**
 * Fonction asynchrone Next JS => Next.js will pre-render this page at build time using the props returned by getStaticProps.
 * @param preview booléen qui permet de gérer la preview (nous gérons cela au niveau du déploiement donc nous laissons à false)
 * @param locale locale active du site
 */
export async function getStaticProps({ preview = false, locale, ...props }) {
  const page = await getOnePageBySlug(preview, locale, props.params?.slug)
  const lastRef = page?.etiquette?.id ? await getLastRefByTech(page.etiquette.id, locale) : []

  // Je n'ai pas de résultat avec la requête
  if (!page) {
    return {
      notFound: true
    }
  }
  // Nous renvoyons les données sous forme de props à la page
  return {
    props: { page, lastRef }
  }
}

/**
 * Fonction asynchrone Next JS => it needs to define a list of paths to be statically generated.
 * Next.js will statically pre-render all the paths specified by getStaticPaths.
 */
export async function getStaticPaths() {
  //https://mariestarck.com/how-to-localize-your-next-js-application-with-next-translate/

  const paths = []

  // Je récupère tous les slugs possibles pour ce type de page
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
  // fallback : true => When someone requests a page that is not generated yet, the user will see the page with a loading indicator or skeleton component. Is useful if your app has a very large number of static pages that depend on data.
  return { paths, fallback: true }
}
