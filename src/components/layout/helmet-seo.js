import Head from 'next/head'
import useTranslation from 'next-translate/useTranslation'

import { Img } from '../../config/StaticImagesExport'

const URL_UBIDREAMS = process.env.NEXT_PUBLIC_URL_GLOBAL

export default function Helmet({ children, metatags = {}, router, className = '', error = false }) {
  //Si certaines infos sont incomplète (title, description, image) la version par défaut vient compléter
  const { t, lang } = useTranslation('common')
  const { title = t('seo.title'), description = t('seo.description'), img_key = t('seo.img_key') } = metatags
  let pathname = router.pathname

  if (lang === 'en') {
    pathname = '/en' + router.pathname
  }
  return (
    <>
      <Head>
        <title>{`${title} | Ubidreams`}</title>
        <meta name='description' content={description} />
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='Ubidreams' />
        {!error && <meta property='og:url' content={URL_UBIDREAMS + pathname} />}
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta name='og:image' content={Img[img_key].src}></meta>

        {!error && (
          <>
            {/*  URL canonique : une URL canonique est l'URL de la page considérée par Google comme la plus représentative
            de l'ensemble de pages en double sur votre site */}
            <link rel='canonical' href={URL_UBIDREAMS + pathname} />

            {/* rel=alternate indique à Google toutes les variantes linguistiques et régionales le page. */}
            <link rel='alternate' href={URL_UBIDREAMS + router.pathname} hrefLang='fr' />
            <link rel='alternate' href={URL_UBIDREAMS + '/en' + router.pathname} hrefLang='en' />
          </>
        )}

        {error && <meta name='robots' content='noindex' />}

        {/* TWITTER CARD */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:creator' content='@ubidreams' />
        <meta name='twitter:site' content='@ubidreams' />
        <meta property='twitter:title' content={title} />
        <meta property='twitter:description' content={description} />
        <meta name='twitter:image' content={Img[img_key].src}></meta>

        <meta property='article:publisher' content='https://www.facebook.com/ubidreams/' />
      </Head>
      <main className={className}>{children}</main>
    </>
  )
}
