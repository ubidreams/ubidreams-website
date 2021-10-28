import '../../public/css/theme.bundle.css'
import '../../public/css/libs.bundle.css'
import 'rc-pagination/assets/index.css'
import '../styles/custom.scss'

import appWithI18n from 'next-translate/appWithI18n'
import i18nConfig from '../../i18n'
import Layout from '../components/layout/layout'

import { CookiesProvider } from '../helpers/cookiesContext'

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CookiesProvider>
  )
}

export default appWithI18n(MyApp, {
  ...i18nConfig
})
