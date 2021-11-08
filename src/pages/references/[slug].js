import { getAllReferencesSlugs, getOneReferencesBySlug, getLastReferences } from '../../lib/api'
import { useRouter } from 'next/router'

import DefineMetatagsSEO from '../../helpers/defineMetatagsSEO'

import ReferenceTemplate from '../../components/template/reference-template'

const Project = ({ project, lastProject }) => {
  const router = useRouter()
  if (router.isFallback) return null

  return (
    <>
      <DefineMetatagsSEO seo={project} router={router} image={project.coverImage.responsiveImage.src} />
      <ReferenceTemplate project={project} locale={router.locale} lastProject={lastProject} router={router} />
    </>
  )
}
export default Project

export async function getStaticProps({ preview = false, locale, params }) {
  const project = await getOneReferencesBySlug(preview, locale, params?.slug)
  const lastProject = (await getLastReferences(preview, locale)) || []

  if (!project) {
    return {
      notFound: true
    }
  }
  return {
    props: { project, lastProject }
  }
}

export async function getStaticPaths() {
  //https://mariestarck.com/how-to-localize-your-next-js-application-with-next-translate/

  const paths = []

  const englishReferences = await getAllReferencesSlugs('en')
  const frenchReferences = await getAllReferencesSlugs('fr')

  const fillPaths = (array) => {
    array.forEach((posts) => {
      posts.forEach(({ slug }) => {
        paths.push({
          params: {
            slug
          }
        })
      })
    })
  }
  fillPaths([englishReferences, frenchReferences])

  return { paths, fallback: true }
}
