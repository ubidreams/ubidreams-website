const Video = ({ config, cookieYoutube, message }) => {
  const { url, title, provider } = config
  let src = url

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
