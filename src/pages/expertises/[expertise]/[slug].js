import { getAllPageSlugs, getOnePageBySlug, getLastRefByTech } from '../../../lib/api'
import { useRouter } from 'next/router'
import { StructuredText } from 'react-datocms'
import { Image } from 'react-datocms'
import ReactHtmlParser from 'react-html-parser'
import { isEmpty } from 'lodash'

import Layout from '../../../components/layout/layout'
import Breadcrumb from '../../../components/breadcrumb'
import Section from '../../../components/section'
import { LinkBeautify } from '../../../components/link-beautify'
import CardReference from '../../../components/card-reference'
import TextContainer from '../../../components/text-container'
import ContactSection from '../../../components/contact-section'
import CardExpert from '../../../components/card-expert'
import CardPartner from '../../../components/card-partner'

const renderPage = (type, page) => {
  switch (type) {
    case 'subtitle':
      return <h2 className='lead fs-lg text-muted'>{ReactHtmlParser(page.subtitle)}</h2>
    case 'image':
      return (
        <div>
          <Image data={page.image.responsiveImage} alt='' className='img-page' lazyLoad={false} />
        </div>
      )
    case 'expertInterne':
      return (
        <Section>
          <TextContainer namespace={{ name: 'expertises', section: 'internalExperts' }} alignText='center' />
          <div className='row row-cols-md-3 pt-6 justify-content-center'>
            <CardExpert config={page.expertInterne} />
          </div>
        </Section>
      )
    case 'expertPartenaires':
      return (
        <Section>
          <TextContainer namespace={{ name: 'expertises', section: 'externalExperts' }} alignText='center' />
          <div className='row row-cols-md-3 pt-6 justify-content-center'>
            <CardExpert config={page.expertPartenaires} />
          </div>
        </Section>
      )
    case 'partenaires':
      return (
        <Section bgClass='bg-gray-300'>
          <TextContainer namespace={{ name: 'expertises', section: 'partners' }} alignText='center' />
          <div className='row row-cols-md-2 pt-6 justify-content-center'>
            <CardPartner config={page.partenaires} />
          </div>
        </Section>
      )
    case 'afficherContact':
      return (
        <Section>
          <ContactSection />
        </Section>
      )
    case 'lastRef':
      return (
        <Section>
          <TextContainer namespace={{ name: 'expertises', section: 'referencesLinked' }} alignText='center' />
          <div className='row row-cols-3'>
            <CardReference config={page} />
          </div>
        </Section>
      )
    default:
      null
  }
}
const Page = ({ page, lastRef }) => {
  const router = useRouter()

  if (router.isFallback) return null

  return (
    <Layout>
      <Breadcrumb router={router} lastLink={{ href: router.asPath, name: page.title }} />
      <Section>
        <div className='text-center mb-8'>
          <h1 className='display-2 fw-bold'>{page.title}</h1>
          {renderPage('subtitle', page)}
        </div>
        {renderPage('image', page)}
        <div className='my-6'>
          <StructuredText
            data={page.content}
            renderLinkToRecord={({ record, children, transformedMeta }) => {
              return (
                <LinkBeautify record={record} router={router} meta={transformedMeta} oldSlug={page.slug}>
                  {children}
                </LinkBeautify>
              )
            }}
            renderBlock={({ record }) => {
              return <Image data={record.image.responsiveImage} alt='' />
            }}
          />
        </div>
      </Section>

      {!isEmpty(page.expertInterne) && renderPage('expertInterne', page)}
      {!isEmpty(page.expertPartenaires) && renderPage('expertPartenaire', page)}
      {!isEmpty(page.partenaires) && renderPage('partenaires', page)}
      {!isEmpty(lastRef) && renderPage('lastRef', lastRef)}
      {page.afficherContact && renderPage('afficherContact', page)}
    </Layout>
  )
}
export default Page

export async function getStaticProps({ preview = false, locale, ...props }) {
  const page = await getOnePageBySlug(preview, locale, props.params?.slug)
  const lastRef = await getLastRefByTech(page.etiquette.id, locale)

  if (!page) {
    return {
      notFound: true
    }
  }
  return {
    props: { page, lastRef }
  }
}

export async function getStaticPaths({ locales }) {
  //https://mariestarck.com/how-to-localize-your-next-js-application-with-next-translate/

  const paths = []

  const en = await getAllPageSlugs('development', 'en')
  const fr = await getAllPageSlugs('development', 'fr')

  const fillPaths = (array) => {
    array.forEach(({ slug, categorie }) => {
      paths.push({
        params: {
          slug,
          expertise: categorie
        }
      })
    })
  }
  fillPaths(en)
  fillPaths(fr)

  return { paths, fallback: true }
}
