import { renderRule, StructuredText } from 'react-datocms'
import { Image } from 'react-datocms'
import { isSpan, isHeading, isBlockquote } from 'datocms-structured-text-utils'
import ReactHtmlParser from 'react-html-parser'
import { includes } from 'lodash'
import { Parallax, Background } from 'react-parallax'
import useTranslation from 'next-translate/useTranslation'
import ImageNext from 'next/image'

import Section from '../section'
import { LinkBeautify } from '../link-beautify'
import ContactSection from '../contact-section'
import Layout from '../layout/layout'

import { Facebook, Linkedin, Twitter } from '../../config/StaticImagesExport.js'
import CardArticle from '../card-article'
import TextContainer from '../text-container'

const renderPage = (type, post) => {
  switch (type) {
    case 'title':
      return <h1 className='display-4 text-center'>{post.title}</h1>
    case 'subtitle':
      return <h2 className='lead mb-7 text-center text-muted'>{ReactHtmlParser(post.subtitle)}</h2>
    case 'author':
      return <h6 className='text-uppercase mb-0'>{post.author.name}</h6>
    case 'image':
      return (
        <div>
          <Image data={post.image.responsiveImage} alt='' className='img-page' lazyLoad={false} />
        </div>
      )
    default:
      null
  }
}
const PostTemplate = ({ post, locale, lastPosts }) => {
  const { t } = useTranslation('blog')
  const dateFormatted = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric', year: 'numeric' }).format(
    new Date(post.date)
  )
  const updatedDateFormatted = new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(post.updatedAt))

  const iconsSocialMedia = [
    { icon: Facebook, alt: 'Facebook' },
    { icon: Twitter, alt: 'Twitter' },
    { icon: Linkedin, alt: 'Linkedin' }
  ]

  const imageCover = { src: post.heroCover.responsiveImage.src, alt: post.heroCover.responsiveImage.alt }

  return (
    <Layout>
      <Parallax
        bgImage={imageCover.src}
        bgImageAlt={imageCover.alt}
        strength={500}
        className='py-12 py-md-14 bg-grey-blue'
        bgImageStyle={{ top: '-30%' }}
      ></Parallax>
      <Section>
        <div className='text-center mb-8'>
          {renderPage('title', post)}
          {post.subtitle && renderPage('subtitle', post)}
        </div>
        <div className='row align-items-center py-5 border-top border-bottom'>
          <div className='col ms-n5'>
            {renderPage('author', post)}
            <time className='fs-sm text-muted' dateTime={dateFormatted}>
              {t('post.date') + ' ' + dateFormatted}
            </time>
          </div>
          <div className='col-auto d-flex align-items-center'>
            <span className='h6 text-uppercase text-muted d-none d-md-inline me-4'>{t('post.share')}:</span>

            <ul className='d-inline list-unstyled list-inline list-social m-0'>
              {iconsSocialMedia.map(({ icon, alt }, index) => {
                return (
                  <li key={index} className='list-inline-item list-social-item me-3'>
                    <a href='#!' className='text-decoration-none'>
                      <ImageNext src={icon} alt={alt} width={25} height={25} className='list-social-icon' />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className='my-6'>
          <StructuredText
            data={post.content}
            renderLinkToRecord={({ record, children, transformedMeta }) => {
              return (
                <LinkBeautify record={record} meta={transformedMeta}>
                  {children}
                </LinkBeautify>
              )
            }}
            renderBlock={({ record }) => {
              return <Image data={record.image.responsiveImage} alt='' className='img-page' />
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
              })
            ]}
          />
        </div>
        <div className='text-center border-top border-gray-300 pt-6'>
          <time className='fs-sm text-muted' dateTime={updatedDateFormatted}>
            {t('post.update') + ' ' + updatedDateFormatted}
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
            <h3 className='mb-0'>{t('post.lastPost.title')}</h3>
            <p className='mb-0 text-muted'>{t('post.lastPost.subtitle')}</p>
          </div>
          <div className='col-md-auto'>
            <a href={t('common:header.blog.path')} className='btn btn-sm btn-outline-blue d-none d-md-inline'>
              View all
            </a>
          </div>
        </div>
        <div className='row row-cols-md-3 mt-6'>
          {lastPosts.length === 0 ? (
            <p className='w-100 text-center text-muted'>{t('blog.noResult')}</p>
          ) : (
            <CardArticle config={lastPosts} locale={locale} />
          )}
        </div>
      </Section>
      <div className='container border-bottom border-gray-300'></div>
      <Section bgClass='bg-light'>
        <ContactSection />
      </Section>
    </Layout>
  )
}
export default PostTemplate
