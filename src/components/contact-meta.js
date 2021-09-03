export const ContactMeta = ({ title = '', content = '' }) => {
  return (
    <div className='text-center border-end-md border-gray-800'>
      <h6 className='text-uppercase text-gray-700 mb-1'>{title}</h6>

      <div className='mb-5 mb-md-0'>
        <p className='h4'>{content}</p>
      </div>
    </div>
  )
}

export default ContactMeta
