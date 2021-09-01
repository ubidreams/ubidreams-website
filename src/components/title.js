const Title = ({ title = '', subtitle = '', className = '' }) => {
  return (
    <div className={`text-center ${className}`}>
      <h1 className='display-1 fw-bold' style={{ whiteSpace: 'pre-line' }}>
        {title}
      </h1>
      <h2 className='fs-lg lead text-muted mb-0'>{subtitle}</h2>
    </div>
  )
}

export default Title
