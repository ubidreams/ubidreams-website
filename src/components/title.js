const Title = ({ title = '', subtitle = '', className = '', titleH = 'h1 display-1', subtitleH = 'h2' }) => {
  return (
    <div className={`text-center ${className}`}>
      <h1 className={`${titleH} fw-bold`} style={{ whiteSpace: 'pre-line' }}>
        {title}
      </h1>
      <h2 className={`${subtitleH} fs-lg text-muted mb-0`}>{subtitle}</h2>
    </div>
  )
}

export default Title
