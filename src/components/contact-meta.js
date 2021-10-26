export const ContactMeta = ({ title = '', content = '' }) => {
  return (
    <div className='text-center border-end-md border-gray-800'>
      <h6 className='text-uppercase mb-1'>{title}</h6>

      <div className='mb-5 mb-md-0'>
        <div className='h4'>{content}</div>
      </div>
    </div>
  )
}

export default ContactMeta
