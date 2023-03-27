// External Librairies
import { isBlockquote, isHeading, isSpan } from 'datocms-structured-text-utils'
import { includes, isEmpty } from 'lodash'
import ImageNext from 'next/image'
import { Image, renderRule, StructuredText } from 'react-datocms'
import ReactHtmlParser from 'react-html-parser'

// Helpers & Config
import { Download } from '../../config/StaticImagesExport'

// Components
import Breadcrumb from '../breadcrumb'
import Card from '../card'
import CardExpert from '../card-expert'
import CardReference from '../card-reference'
import ContactSection from '../contact-section'
import { LinkBeautify } from '../link-beautify'
import Section from '../section'
import TextContainer from '../text-container'

// Rendu des sections de la page conditionné à leur existence côté DATOCMS
const renderPage = (type, page) => {
  switch (type) {
    case 'subtitle':
      return <h2 className='lead fs-lg text-muted'>{ReactHtmlParser(page.subtitle)}</h2>
    case 'image':
      // Composant image de datocms compatible avec le format de données média de DATOCMS
      return (
        <div>
          <Image data={page.image.responsiveImage} alt='' className='img-page' lazyLoad={false} />
        </div>
      )
    case 'expertInterne':
      // Affichage d'une section de présentation des profils internes correspondant à l'expertise
      return (
        <Section>
          <TextContainer namespace={{ name: 'expertises', section: 'internalExperts' }} alignText='center' />
          <div className='row row-cols-md-3 pt-6 justify-content-center'>
            <CardExpert config={page.expertInterne} />
          </div>
        </Section>
      )
    case 'expertPartenaire':
      // Affichage d'une section de présentation des profils externes partenaires d'Ubidreams et correspondant à l'expertise
      return (
        <Section>
          <TextContainer namespace={{ name: 'expertises', section: 'externalExperts' }} alignText='center' />
          <div className='row row-cols-md-3 pt-6 justify-content-center'>
            <CardExpert config={page.expertPartenaires} />
          </div>
        </Section>
      )
    case 'partenaire':
      // Affichage d'une section de présentation des entreprises externes partenaires d'Ubidreams et correspondant à l'expertise
      return (
        <Section bgClass='bg-gray-300'>
          <TextContainer namespace={{ name: 'expertises', section: 'partners' }} alignText='center' />
          <div className='row pt-6 justify-content-center'>
            <Card config={page.partenaire} large={3} />
          </div>
        </Section>
      )
    case 'afficherContact':
      // Affichage d'un bloc de redirection vers la page de contact
      return (
        <Section>
          <ContactSection mailObject={page.objetMail} />
        </Section>
      )
    case 'lastRef':
      // Affichage d'une section de présentation des références en lien avec l'expertise
      return (
        <Section>
          <TextContainer namespace={{ name: 'expertises', section: 'referencesLinked' }} alignText='center' />
          <div className='row row-cols-md-3'>
            <CardReference config={page} />
          </div>
        </Section>
      )
    default:
      null
  }
}

/*
  TEMPLATE DE PAGE TYPE : expertise en développement, Design (React JS, React Native, API), solutions (ubishield, ubitrack)...
  ARBORESCENCE : accessible depuis les expertises (/BASE_URL/expertises/react-js) OU les solutions (/BASE_URL/solutions/ubishield)
*/
const PageTemplate = ({ page, lastRef, router }) => {
  return (
    <>
      <main>
        {/* Rendu du breadcrumb pour les pages d'expertises */}
        {page.categorie !== 'solution' && (
          <Breadcrumb router={router} lastLink={{ href: router.asPath, name: page.title }} />
        )}
        <Section>
          {/* TITRE */}
          <div className='text-center mb-8'>
            <h1 className='display-2 fw-bold'>{page.title}</h1>
            {renderPage('subtitle', page)}
          </div>
          {/* IMAGE D'ENTETE */}

          {page.image && renderPage('image', page)}
          <div className='my-6'>
            {/* CONTENU DE LA PAGE */}
            <StructuredText
              data={page.content}
              renderLinkToRecord={({ record, children, transformedMeta }) => {
                // Rendu custom des liens vers les autres pages (contraintes de réécriture des urls avec les "catégories") CF. LinkBeautify
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
                    // Rendu d'une image en fonction de son format (pdf, png, jpg)
                    const { title, format, url } = record.image
                    if (format === 'pdf') {
                      return (
                        <a
                          target='_blank'
                          rel='noopener noreferrer'
                          href={url}
                          className='d-block d-md-inline-block text-center border border-gray-300 p-2 rounded me-md-2 mb-2'
                        >
                          <ImageNext src={Download} alt='icon download' width={50} height={50} />
                          <p className='mb-0'>{title}</p>
                        </a>
                      )
                    }
                    return page.title === 'Assurez votre cybersécurité avec la solution Sylink' ? (
                      <Section style={{ textAlign: '-webkit-center' }}>
                        <iframe
                          className='videoUbi'
                          src='https://www.youtube.com/embed/DSKAPIYyeuY'
                          title='YouTube video player'
                          frameBorder='0'
                          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                          allowFullScreen
                        ></iframe>
                      </Section>
                    ) : (
                      <Image data={record.image.responsiveImage} alt='' />
                    )
                  case 'focus_point':
                    // Rendu d'une liste sous le format de bloc rectangulaire prenant la largeur de la page. Mise en avant d'informations limitées
                    return <div className='focus_point'>{ReactHtmlParser(record.liste)}</div>
                  case 'liste_custom':
                    // Rendu d'une liste avec une icon check devant chaque li
                    return <div className='liste_custom'>{ReactHtmlParser(record.liste)}</div>
                  case 'text_and_image':
                    // Rendu d'une section de page avec une image et un texte associé sur fond gris
                    return (
                      <div className='d-flex row bg-light-grey px-4 py-6 my-4'>
                        {record.image && (
                          <div className='mw-md-50 align-self-center'>
                            <Image data={record.image.responsiveImage} alt='' />
                          </div>
                        )}

                        <div className={`${record.image && 'mw-md-50'} align-self-center pt-4 mt-md-0`}>
                          {ReactHtmlParser(record.content)}
                        </div>
                      </div>
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
                    <HeadingTag key={key} className='pt-4'>
                      {children}
                    </HeadingTag>
                  )
                }),
                // Rendu custom des citations
                renderRule(isBlockquote, ({ node, children, key }) => {
                  return (
                    <div key={key} className='border-top border-bottom border-green my-5 py-4'>
                      <node.type className='blockquote'>
                        <div className='h3 mb-0 text-center text-black'>{children}</div>
                      </node.type>
                    </div>
                  )
                })
              ]}
            />
          </div>
        </Section>
        {/* Fin de page avec affichage de composant en fonction de l'existence sur DATOCMS*/}
        {!isEmpty(page.expertInterne) && renderPage('expertInterne', page)}
        {!isEmpty(page.expertPartenaires) && renderPage('expertPartenaire', page)}
        {!isEmpty(page.partenaire) && renderPage('partenaire', page)}
        {!isEmpty(lastRef) && renderPage('lastRef', lastRef)}
        {page.afficherContact && renderPage('afficherContact', page)}
      </main>
    </>
  )
}
export default PageTemplate
