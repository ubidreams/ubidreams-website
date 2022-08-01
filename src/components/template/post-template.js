// External Librairies
import { isBlockquote, isHeading, isSpan } from 'datocms-structured-text-utils'
import { includes, isEmpty, has } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import ImageNext from 'next/image'
import { useContext } from 'react'
import { Image, renderRule, StructuredText } from 'react-datocms'
import ReactHtmlParser from 'react-html-parser'
import { Parallax } from 'react-parallax'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share'

// Helpers & Config
import { Facebook, Linkedin, Twitter } from '../../config/StaticImagesExport.js'
import { CookiesContext } from '../../helpers/cookiesContext'

// Components
import CardArticle from '../card-article'
import ContactSection from '../contact-section'
import { LinkBeautify } from '../link-beautify'
import Section from '../section'
import Video from '../video'

const URL = process.env.NEXT_PUBLIC_URL_GLOBAL
// Récupération des icons des réseaux sociaux
const iconsSocialMedia = [
  { icon: Facebook, alt: 'Facebook' },
  { icon: Twitter, alt: 'Twitter' },
  { icon: Linkedin, alt: 'Linkedin' }
]

// Rendu des sections de la page conditionné à leur existence côté DATOCMS
const renderPage = (type, post) => {
  switch (type) {
    case 'title':
      return <h1 className='display-4 text-center'>{post.title}</h1>
    case 'subtitle':
      return <h2 className='lead mb-7 text-center text-muted'>{ReactHtmlParser(post.subtitle)}</h2>
    case 'author':
      return <h6 className='text-uppercase mb-0'>{post.author.name}</h6>
    case 'etiquettes':
      // Liste des étiquettes (mots clés) sous forme de tag
      return (
        <div className='mb-4'>
          {post.etiquettes.map((etiquette, index) => {
            return (
              <span key={index} className='badge bg-secondary-soft mx-2'>
                {etiquette.name}
              </span>
            )
          })}
        </div>
      )
    case 'image':
      // Composant image de datocms compatible avec le format de données média de DATOCMS
      return (
        <div>
          <Image data={post.image.responsiveImage} alt='' className='img-page' lazyLoad={false} />
        </div>
      )
    default:
      null
  }
}

// Rendu de la popover d'information en cas de bouton non cliquable pour les réseaux sociaux
const renderPopover = (t) => {
  return <div className='popover bg-gray-200'>{t('common:cookie.noAccept')}</div>
}

// Rendu des boutons de partage des réseaux sociaux (librairie react-share) Les props pour chaque réseau ne sont pas les mêmes donc nous devons gérer tous les cas avec un switch
const renderSocialButtons = (item, router, post, cookies, t) => {
  const styleProps = {
    width: 25,
    height: 25,
    className: 'list-social-icon'
  }
  switch (item.alt) {
    case 'Facebook':
      // Ajout des hashtags en nous basant sur les étiquettes
      let hastag = ''
      post.etiquettes.forEach((etiquette) => {
        hastag = hastag.concat('#', etiquette.slug, ' ')
      })
      return (
        <>
          {/* Gestion de la popover si les cookies n'ont pas été accepté */}
          {!cookies.facebook_pixel && renderPopover(t)}
          <FacebookShareButton
            url={URL + router.asPath}
            quote={post.title}
            hashtag={hastag}
            disabled={!cookies.facebook_pixel}
          >
            <ImageNext src={item.icon} alt={item.alt} {...styleProps} />
          </FacebookShareButton>
        </>
      )
    case 'Linkedin':
      return (
        <>
          {/* Gestion de la popover si les cookies n'ont pas été accepté */}
          {!cookies.linkedin && renderPopover(t)}
          <LinkedinShareButton
            url={URL + router.asPath}
            title={post.title}
            summary={post.subtitle}
            source={URL}
            disabled={!cookies.linkedin}
          >
            <ImageNext src={item.icon} alt={item.alt} {...styleProps} />
          </LinkedinShareButton>
        </>
      )
    case 'Twitter':
      // Affichage des hastags en se basant sur les étiquettes
      let hastags = []
      post.etiquettes.forEach((etiquette) => {
        hastags.push(etiquette.slug)
      })

      return (
        <>
          {/* Gestion de la popover si les cookies n'ont pas été accepté */}
          {!cookies.twitter && renderPopover(t)}
          <TwitterShareButton
            url={URL + router.asPath}
            title={post.title}
            hashtags={hastags}
            disabled={!cookies.twitter}
          >
            <ImageNext src={item.icon} alt={item.alt} {...styleProps} />
          </TwitterShareButton>
        </>
      )
  }
}

/*
  TEMPLATE DE PAGE TYPE : article de blog
  ARBORESCENCE : accessible depuis le blog (/BASE_URL/blog/slug-article)
*/
const PostTemplate = ({ post, locale, lastPosts, router }) => {
  // Initialisation de l'état du composant
  const cookies = useContext(CookiesContext)
  const { t } = useTranslation('blog')

  // Formatage des dates en fonction de la locale.
  const dateFormatted = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric', year: 'numeric' }).format(
    new Date(post.date)
  )
  const updatedDateFormatted = new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(post.updatedAt))

  // Construction d'un objet image pour la page de couverture
  const imageCover = { src: post.heroCover.responsiveImage.src, alt: post.heroCover.responsiveImage.alt }

  return (
    <>
      <main>
        {/* Composant parallax avec l'image de couverture définie ci-dessus */}
        <Parallax
          bgImage={imageCover.src}
          bgImageAlt={imageCover.alt}
          strength={500}
          className='py-12 py-md-14'
          bgImageStyle={{ top: '-30%' }}
        ></Parallax>
        <Section>
          {/* Rendu des titres de l'entete*/}
          <div className='text-center mb-8'>
            {renderPage('title', post)}
            {post.subtitle && renderPage('subtitle', post)}
          </div>

          <div className='row align-items-center py-5 border-top border-bottom'>
            {/* DATE ET AUTEUR */}
            <div className='col ms-md-n5'>
              {renderPage('author', post)}
              <time className='fs-sm text-muted' dateTime={dateFormatted}>
                {t('post.date') + ' ' + dateFormatted}
              </time>
            </div>

            {/* PARTAGE SUR LES RESEAUX SOCIAUX */}
            <div className='col-auto d-flex align-items-center'>
              <span className='h6 text-uppercase text-muted d-none d-md-inline me-4'>{t('post.share')}:</span>
              <ul className='d-inline list-unstyled list-inline list-social m-0'>
                {iconsSocialMedia.map((item, index) => {
                  return (
                    <li key={index} className='list-inline-item list-social-item me-3 position-relative'>
                      {renderSocialButtons(item, router, post, cookies, t)}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className='my-6'>
            {/* RENDU DU CONTENU */}
            <StructuredText
              data={post.content}
              renderLinkToRecord={({ record, children, transformedMeta }) => {
                // Rendu custom des liens vers les autres pages (contraintes de réécriture des urls avec les "catégories") CF. LinkBeautify
                if (!has(record, 'categorie')) {
                  record = {
                    categorie: 'blog',
                    ...record
                  }
                }
                return (
                  <LinkBeautify record={record} meta={transformedMeta}>
                    {children}
                  </LinkBeautify>
                )
              }}
              renderBlock={({ record }) => {
                // Rendu custom de plusieurs blocks issus de DATOCMS
                switch (record._modelApiKey) {
                  case 'image':
                    return <Image data={record.image.responsiveImage} alt='' className='img-page' />
                  case 'video':
                    // affichage d'une vidéo youtube si les cookies sont acceptés.
                    return (
                      <Video
                        config={record.videoUrl}
                        cookieYoutube={cookies.youtube}
                        message={t('common:cookie.noAcceptYoutube')}
                      />
                    )
                }
              }}
              customRules={[
                // Rendu custom de texte en gras
                renderRule(isSpan, ({ node, key }) => {
                  if (node.marks && includes(node.marks, 'highlight')) {
                    return (
                      <node.type key={key} className='text-black'>
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
                // Rendu custom des titres
                renderRule(isHeading, ({ node, children, key }) => {
                  const HeadingTag = `h${node.level}`
                  return (
                    <HeadingTag key={key} className='pt-6'>
                      {children}
                    </HeadingTag>
                  )
                }),
                // Rendu custom des citations
                renderRule(isBlockquote, ({ node, children, key }) => {
                  return (
                    <div key={key} className='border-top border-bottom border-green my-7 py-7'>
                      <node.type className='blockquote'>
                        <div className='h2 mb-0 text-center text-black'>{children}</div>
                      </node.type>
                    </div>
                  )
                })
              ]}
            />
          </div>
          {/* Affichage des etiquettes */}
          <div className='text-center border-top border-gray-300 pt-6'>
            {!isEmpty(post.etiquettes) && renderPage('etiquettes', post)}
            <time className='fs-sm text-muted' dateTime={updatedDateFormatted}>
              {t('post.update') + ' ' + updatedDateFormatted}
            </time>
          </div>
        </Section>

        {/* Forme issue du template */}
        <div className='position-relative'>
          <div className='shape shape-bottom shape-fluid-x text-light'>
            <svg viewBox='0 0 2880 48' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z' fill='currentColor' />
            </svg>
          </div>
        </div>
        {/* Affichage de la section avec les derniers articles si existants */}
        {lastPosts.length != 0 && (
          <>
            <Section bgClass='bg-light'>
              <div className='row align-items-center mb-5'>
                <div className='col'>
                  <h3 className='mb-0'>{t('post.lastPost.title')}</h3>
                  <p className='mb-0 text-muted'>{t('post.lastPost.subtitle')}</p>
                </div>
                <div className='col-md-auto'>
                  <a href={t('common:header.blog.path')} className='btn btn-sm btn-outline-blue d-none d-md-inline'>
                    {t('post.lastPost.more')}
                  </a>
                </div>
              </div>
              <div className='row row-cols-md-3 mt-6'>
                <CardArticle config={lastPosts} locale={locale} />
              </div>
            </Section>
            <div className='bg-light'>
              <div className='container border-bottom border-gray-300'></div>
            </div>
          </>
        )}
        {/* Affichage du bloc de redirection vers la page contact */}
        <Section bgClass='bg-light'>
          <ContactSection />
        </Section>
      </main>
    </>
  )
}
export default PostTemplate
