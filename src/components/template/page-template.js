import { renderRule, StructuredText } from 'react-datocms'
import { isSpan, isHeading } from 'datocms-structured-text-utils'
import { Image } from 'react-datocms'
import ReactHtmlParser from 'react-html-parser'
import { includes, isEmpty } from 'lodash'

import Breadcrumb from '../breadcrumb'
import Section from '../section'
import { LinkBeautify } from '../link-beautify'
import CardReference from '../card-reference'
import TextContainer from '../text-container'
import ContactSection from '../contact-section'
import CardExpert from '../card-expert'
import Layout from '../layout/layout'
import Card from '../card'

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
    case 'expertPartenaire':
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
          <div className='row pt-6 justify-content-center'>
            <Card config={page.partenaires} large={3} />
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
const PageTemplate = ({ page, lastRef, router }) => {
  return (
    <Layout>
      <Breadcrumb router={router} lastLink={{ href: router.asPath, name: page.title }} />
      <Section>
        <div className='text-center mb-8'>
          <h1 className='display-2 fw-bold'>{page.title}</h1>
          {renderPage('subtitle', page)}
        </div>
        {page.image && renderPage('image', page)}
        <div className='my-6'>
          <StructuredText
            data={page.content}
            renderLinkToRecord={({ record, children, transformedMeta }) => {
              return (
                <LinkBeautify record={record} meta={transformedMeta}>
                  {children}
                </LinkBeautify>
              )
            }}
            renderBlock={({ record }) => {
              return <Image data={record.image.responsiveImage} alt='' />
            }}
            customRules={[
              renderRule(isSpan, ({ node, children, key }) => {
                if (node.marks && includes(node.marks, 'highlight')) {
                  return (
                    <node.type key={key} className='text-green'>
                      {node.value}
                    </node.type>
                  )
                }

                if (node.marks && includes(node.marks, 'strong')) {
                  return (
                    <node.type key={key}>
                      <strong>{node.value}</strong>
                    </node.type>
                  )
                }

                return <node.type key={key}>{node.value}</node.type>
              }),
              renderRule(isHeading, ({ node, children, key }) => {
                const HeadingTag = `h${node.level}`
                return (
                  <HeadingTag key={key} className='pt-4'>
                    {children}
                  </HeadingTag>
                )
              })
            ]}
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
export default PageTemplate
