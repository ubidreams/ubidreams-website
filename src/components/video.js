/**
 * VIDEO : Composant pour gérer l'affichage d'une vidéo
 * @param config objet des données à afficher
 * @param cookieYoutube booléen indiquant si les cookies youtube ont été accepté ou non
 * @param message si les cookies ne sont pas accepté j'affiche un message d'information
 */
const Video = ({ config, cookieYoutube, message }) => {
  // Initialisation du composant
  const { url, title, provider } = config
  let src = url

  // Gestion de l'écriture de l'url pour youtube qui n'affiche pas les mêmes paramètres d'url
  if (provider === 'youtube') {
    src = url.replace('watch?v=', 'embed/')
  }

  return (
    <div className={`video ${cookieYoutube ? '' : 'hide-video'}`}>
      <iframe
        src={src}
        title={title}
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        frameBorder='0'
        webkitallowfullscreen='true'
        mozallowfullscreen='true'
        allowFullScreen
        referrerPolicy='origin-when-cross-origin'
      />
      {!cookieYoutube && (
        <div className='display' data-aos='fade' aos-delay='1000'>
          <p>{message}</p>
        </div>
      )}
    </div>
  )
}
export default Video
