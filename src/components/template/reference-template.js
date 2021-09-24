import { renderRule, StructuredText } from 'react-datocms'
import { Image } from 'react-datocms'
import { isSpan, isHeading, isBlockquote, isListItem } from 'datocms-structured-text-utils'
import ReactHtmlParser from 'react-html-parser'
import { includes, isEmpty } from 'lodash'
import { Parallax } from 'react-parallax'
import useTranslation from 'next-translate/useTranslation'
import ImageNext from 'next/image'

import Section from '../section'
import { LinkBeautify } from '../link-beautify'
import ContactSection from '../contact-section'
import Layout from '../layout/layout'

import { DoneCircle } from '../../config/StaticImagesExport'
import CardReference from '../card-reference'

const renderPage = (type, project) => {
  switch (type) {
    case 'title':
      return <h1 className='display-2 text-center fw-bold'>{project.title}</h1>
    case 'subtitle':
      return <h2 className='lead text-center text-muted'>{ReactHtmlParser(project.subtitle)}</h2>
    case 'outils':
      return <h3 className='lead mb-7 text-center text-muted'>{ReactHtmlParser(project.outils)}</h3>
    case 'author':
      return <h6 className='text-uppercase mb-0'>{project.author.name}</h6>
    case 'etiquettes':
      return (
        <div className='mb-4'>
          {project.etiquettes.map((etiquette, index) => {
            return (
              <span key={index} className='badge bg-secondary-soft mx-2'>
                {etiquette.name}
              </span>
            )
          })}
        </div>
      )
    case 'image':
      return (
        <div>
          <Image data={project.image.responsiveImage} alt='' className='img-page' lazyLoad={false} />
        </div>
      )
    default:
      null
  }
}

const ReferenceTemplate = ({ project, locale, lastProject, router }) => {
  const { t } = useTranslation('references')

  const updatedDateFormatted = new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(project.updatedAt))

  const imageCover = { src: project.coverImage.responsiveImage.src, alt: project.coverImage.responsiveImage.alt }

  return (
    <Layout>
      <Parallax
        bgImage={imageCover.src}
        bgImageAlt={imageCover.alt}
        strength={500}
        className='py-12 py-md-14 bg-grey-blue'
        bgImageStyle={{ top: '-20%' }}
      ></Parallax>
      <Section>
        <div className='text-center mb-8'>
          {renderPage('title', project)}
          {project.subtitle && renderPage('subtitle', project)}
          {project.outils && renderPage('outils', project)}
          <hr />
        </div>
        <div className='my-6'>
          <StructuredText
            data={project.content}
            renderLinkToRecord={({ record, children, transformedMeta }) => {
              return (
                <LinkBeautify record={record} meta={transformedMeta}>
                  {children}
                </LinkBeautify>
              )
            }}
            renderBlock={({ record }) => {
              switch (record._modelApiKey) {
                case 'image':
                  return (
                    <div className='pt-4'>
                      <Image data={record.image.responsiveImage} alt='' className='img-page' />
                      <hr />
                    </div>
                  )
                case 'reference_galerie':
                  return (
                    <div className='row py-4'>
                      <div className='col-6 p-3'>
                        {record.galleryColumn1.map((image, index) => {
                          return (
                            <Image
                              key={index}
                              data={image.responsiveImage}
                              alt=''
                              className={` ${index == 0 ? 'mb-6' : ''}`}
                            />
                          )
                        })}
                      </div>
                      <div className='col-6 p-3'>
                        {record.galleryColumn2.map((image, index) => {
                          return (
                            <Image
                              key={index}
                              data={image.responsiveImage}
                              alt=''
                              className={` ${index == 0 ? 'mb-6' : ''}`}
                            />
                          )
                        })}
                      </div>
                    </div>
                  )
                default:
                  return null
              }
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
                  <HeadingTag key={key} className='pt-6'>
                    {children}
                  </HeadingTag>
                )
              }),
              renderRule(isBlockquote, ({ node, children, key }) => {
                return (
                  <div key={key} className='border-top border-bottom border-green my-7 py-7'>
                    <node.type className='blockquote'>
                      <div className='h2 mb-0 text-center text-green'>{children}</div>
                    </node.type>
                  </div>
                )
              }),
              renderRule(isListItem, ({ node, children, key }) => {
                return (
                  <div key={key} className='d-flex list-item-reference'>
                    <div>
                      <ImageNext src={DoneCircle} alt='icon done circle' />
                    </div>
                    {children}
                  </div>
                )
              })
            ]}
          />
        </div>
        <div className='text-center border-top border-gray-300 pt-6'>
          {!isEmpty(project.etiquettes) && renderPage('etiquettes', project)}
          <time className='fs-sm text-muted' dateTime={updatedDateFormatted}>
            {t('reference.update') + ' ' + updatedDateFormatted}
          </time>
        </div>
      </Section>
      <div className='position-relative'>
        <div className='shape shape-bottom shape-fluid-x text-light'>
          <svg viewBox='0 0 2880 48' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z' fill='currentColor' />
          </svg>
        </div>
      </div>
      <Section bgClass='bg-light'>
        <div className='row align-items-center mb-5'>
          <div className='col'>
            <h3 className='mb-0'>{t('lastReference.title')}</h3>
            <p className='mb-0 text-muted'>{t('lastReference.subtitle')}</p>
          </div>
          <div className='col-md-auto'>
            <a href={t('common:header.references.path')} className='btn btn-sm btn-outline-blue d-none d-md-inline'>
              {t('lastReference.more')}
            </a>
          </div>
        </div>
        <div className='row row-cols-md-3 mt-6'>
          <CardReference config={lastProject} />
        </div>
      </Section>
    </Layout>
  )
}
export default ReferenceTemplate
