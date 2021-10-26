import Head from 'next/head'

import Header from './header'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.png' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <script async type='text/javascript' src='../../js/theme.bundle.js' />
        <script async type='text/javascript' src='../../js/vendor.bundle.js' />

        <meta property='og:locale' content='fr_FR' />
        <meta property='og:locale:alternate' content='en_US' />

        {/* La balise Meta pour les robots permet de contrôler avec précision la manière dont chaque page doit être indexée et présentée aux utilisateurs dans les résultats de recherche Google 
            - noindex : Indique de ne pas afficher cette page dans les résultats de recherche (pas d'indexation > dev/prod)
            - follow : Autorisation de suivre les liens internes de la page (découvrir d'autre page)
            - max-snippet: nombre maximal de caractères que vous souhaitez appliquer à un extrait de texte pour ce résultat de recherche (-1 : Google détermine la longueur d'extrait adaptée)
            - max-image-preview : Définissez la taille maximale d'un aperçu d'image pour cette page (large : un aperçu d'image de grande taille)
            - max-video-preview : nombre maximal de secondes que vous souhaitez appliquer à un extrait vidéo (-1 : la durée de l'extrait vidéo est illimitée.)
        */}
        <meta name='robots' content='noindex, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' />
      </Head>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  )
}
