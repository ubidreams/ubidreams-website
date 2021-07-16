import Image from 'next/image'
import Link from 'next/link'

/**
 * @param config (données sous la forme d'un objet (title, description, image, showButton))
 * @param displayDirection (position des blocs > image à droite ou à gauche)
 * @param alignText
 */
const PageTitle = ({ config, displayImage, alignText }) => {
  return (
    <div
      style={{ minHeight: '90vh' }}
      className={`px-md-10 d-md-flex d-lg-flex flex-row${
        '-' + displayImage
      } align-items-center text-center text-md-start justify-content-between`}
    >
      <div>
        <Image src={config.img} alt='...' className='img-fluid' data-aos='fade-right' />
      </div>

      <div className={`text-${alignText}`}>
        <h1 className='display-1 fw-bold'>
          <div data-aos='fade-left'>
            <strong>{config.title}</strong>
          </div>
        </h1>

        {config.description && (
          <p className='fs-lg text-muted mb-0' data-aos='fade-left' data-aos-delay='100'>
            {config.description}
          </p>
        )}
        {config.buttonDetails && (
          <div className='mt-5' data-aos='fade-left' data-aos-delay='150'>
            {config.buttonDetails.map((btn, index) => {
              return (
                <Link key={index} href={btn.path}>
                  <a className={`btn btn-blue ${btn.class} me-md-2`}>{btn.name}</a>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default PageTitle
