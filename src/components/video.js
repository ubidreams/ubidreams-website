const Video = ({ config }) => {
  const { url, title, provider } = config
  let src = url

  if (provider === 'youtube') {
    src = url.replace('watch?v=', 'embed/')
  }

  return (
    <div className='video'>
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
    </div>
  )
}
export default Video
