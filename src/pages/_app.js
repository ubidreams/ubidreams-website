// Style
import '../../public/css/theme.bundle.css'
import '../../public/css/libs.bundle.css'
import 'rc-pagination/assets/index.css'
import '../styles/style.scss'
import Script from 'next/script'

// External Librairies
import appWithI18n from 'next-translate/appWithI18n'

// Helpers & Config
import i18nConfig from '../../i18n'
import { CookiesProvider } from '../helpers/cookiesContext'
import { LangProvider } from '../helpers/langContext'

// Components
import Layout from '../components/layout/layout'

/**
 * Page principale du site (ACCUEIL)
 * @param Component container de l'application
 * @param pageProps props à passer dans le container de l'application
 */
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script strategy='afterInteractive' src='https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX' />
      <Script
        id='google-analytics'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
    page_path: window.location.pathname,
    });`
        }}
      />
      <LangProvider>
        <CookiesProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CookiesProvider>
      </LangProvider>
    </>
  )
}
export default appWithI18n(MyApp, {
  ...i18nConfig
})
