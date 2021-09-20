import Head from 'next/head'

import Header from './header'
import Footer from './footer'

export default function Layout({ preview, children, bgColor = '' }) {
  return (
    <>
      <Head>
        <script async type='text/javascript' src='../../js/theme.bundle.js' />
        <script async type='text/javascript' src='../../js/vendor.bundle.js' />
        <title>Ubidreams</title>
        <meta name='description' content="Site web d'Ubidreams" />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main className={bgColor}>{children}</main>
        <Footer />
      </div>
    </>
  )
}
