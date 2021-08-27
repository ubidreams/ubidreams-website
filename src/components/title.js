const Title = ({ title = '', subtitle = '' }) => {
  return (
    <div className='text-center'>
      <h1 className='display-1 fw-bold' style={{ whiteSpace: 'pre-line' }}>
        <strong>{title}</strong>
      </h1>
      <h2 className='fs-lg lead text-muted mb-0'>{subtitle}</h2>
    </div>
  )
}

export default Title
