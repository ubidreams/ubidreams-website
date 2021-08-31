import Head from 'next/head'

import Header from './header'
import Footer from './footer'

export default function Layout({ preview, children }) {
  return (
    <>
      <Head>
        <script async type='text/javascript' src='../js/theme.bundle.js' />
        <script async type='text/javascript' src='../js/vendor.bundle.js' />
        <title>Ubidreams</title>
        <meta name='description' content="Site web d'Ubidreams" />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ marginBottom: '2rem' }}>{children}</main>
        <Footer />
      </div>
    </>
  )
}
