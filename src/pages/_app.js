// Style
import '../../public/css/theme.bundle.css'
import '../../public/css/libs.bundle.css'
import 'rc-pagination/assets/index.css'
import '../styles/style.scss'

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
    <LangProvider>
      <CookiesProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CookiesProvider>
    </LangProvider>
  )
}

export default appWithI18n(MyApp, {
  ...i18nConfig
})
