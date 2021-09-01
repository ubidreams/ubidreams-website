import '../../public/css/theme.bundle.css'
import '../../public/css/libs.bundle.css'
import 'rc-pagination/assets/index.css'
import '../styles/custom.scss'
import React from 'react'
import appWithI18n from 'next-translate/appWithI18n'
import i18nConfig from '../../i18n'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default appWithI18n(MyApp, {
  ...i18nConfig
})
