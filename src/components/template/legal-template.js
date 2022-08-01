// External Librairies
import { isHeading, isListItem, isSpan } from 'datocms-structured-text-utils'
import { includes } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import ImageNext from 'next/image'
import { Image, renderRule, StructuredText } from 'react-datocms'

// Helpers & Config
import { DoneCircle } from '../../config/StaticImagesExport'

// Components
import Section from '../section'
import Title from '../title'

/*
  TEMPLATE DE PAGE TYPE : mentions légales, politique de confidentialité.
  ARBORESCENCE : accessible depuis la base du site (/BASE_URL/politique-de-confidentialite)
*/
const LegalTemplate = ({ page, locale }) => {
  // Initialisation de l'état du composant
  const { t } = useTranslation('common')

  // Formatage de la date de mise à jour en fonction de la locale.
  const dateFormatted = new Intl.DateTimeFormat(locale, {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(page.updatedAt))

  return (
    <>
      <main className='bg-light-grey'>
        <Section>
          <Title title={page.title} subtitle={t('legalPage.update') + ' ' + dateFormatted} />
          <hr className='my-6 my-md-8 text-gray-500' />
          <div className='d-flex flex-column-reverse d-md-block'>
            {/* CARD HELP */}
            <div className='float-md-end w-md-50 my-md-6 ms-md-6'>
              <div className='card shadow-light-lg'>
                <div className='card-body'>
                  <h4>{t('legalPage.help')}</h4>
                  <p className='fs-sm mb-5'>{page.aide}</p>

                  <h6 className='fw-bold text-uppercase mb-2'>{t('legalPage.call')}</h6>

                  <p className='fs-sm mb-5'>
                    <a href={`tel:${page.tel}`} className='text-reset'>
                      {page.tel}
                    </a>
                  </p>

                  <h6 className='fw-bold text-uppercase mb-2'>{t('legalPage.email')}</h6>

                  <p className='fs-sm mb-0'>
                    <a href={`mailto:${page.email}`} className='text-reset'>
                      {page.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>
            {/* CONTENU PAGE */}
            <div>
              <StructuredText
                data={page.content}
                renderBlock={({ record }) => {
                  // Rendu custom de certain block DATOCMS
                  switch (record._modelApiKey) {
                    case 'image':
                      return (
                        <div className='pt-4'>
                          <Image data={record.image.responsiveImage} alt='' className='img-page' />
                          <hr />
                        </div>
                      )
                    default:
                      return null
                  }
                }}
                customRules={[
                  // Rendu custom des spans en gras.
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
                  // Rendu custom des listes avec un icon check devant
                  renderRule(isListItem, ({ children, key }) => {
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
          </div>
        </Section>
      </main>
    </>
  )
}

export default LegalTemplate
