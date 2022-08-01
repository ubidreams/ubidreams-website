// External Librairies
import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'

// Helpers & Config
import { Img } from '../../config/StaticImagesExport'

const URL_UBIDREAMS = process.env.NEXT_PUBLIC_URL_GLOBAL

/**
 HELMET : surcharge des headers
 @param children Composants enfants (pages)
 @param metatags objet contenant les informations que je veux surcharger dans le head (image pour les card twitter/facebook, title...)
 @param router objet contenant les informations de navigation (next/router)
 @param classname Propriété de style nécessaire pour encadrer le contenu de la page et des "children"
 @param error booléen afin de savoir si nous sommes sur une page d'erreur
 */
export default function Helmet({ children, metatags = {}, router, className = '', error = false }) {
  // Initialisation de l'état du composant
  // Si certaines infos sont incomplètes (title, description, image) la version par défaut (issue des locales du projet) vient compléter les metatags
  const { t, lang } = useTranslation('common')
  const { title = t('seo.title'), description = t('seo.description'), img_key = t('seo.img_key') } = metatags
  let pathname = router.pathname

  // Ajout de la locale dans le pathname pour les URL en anglais
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
        <meta property='og:image' content={Img[img_key].src} />
        <meta name='google-site-verification' content='zjnd_Llaw9E8xFtU-k-uMZ6W41MpDF3kdz28xVmkGC0' />

        {/* Définition des urls canoniques pour toutes les pages sauve la page d'erreur */}
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
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:creator' content='@ubidreams' />
        <meta property='twitter:site' content='@ubidreams' />
        <meta property='twitter:title' content={title} />
        <meta property='twitter:description' content={description} />
        <meta property='twitter:image' content={Img[img_key].src} />

        <meta property='article:publisher' content='https://www.facebook.com/ubidreams/' />
      </Head>
      <main className={className}>{children}</main>
    </>
  )
}
