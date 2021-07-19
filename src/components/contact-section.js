import Image from 'next/image'
import { Contact } from '../config/StaticImagesExport'

const config = {
  img: {
    ...Contact,
    alt: "Photo d'un groupe de discussion"
  },
  content: 'Une question, un projet ? \n Nous vous aidons définir votre projet.'
}

const ContactSection = () => {
  return (
    <div className='card card-row shadow-light-lg mb-6'>
      <div className='d-md-flex gx-0'>
        <>
          <div className='w-md-50'>
            <div className='card-img-start w-100 h-100 bg-cover' style={{ backgroundImage: `url(${config.img.src})` }}>
              <Image src={config.img} alt={config.img.alt} className='img-fluid d-md-none invisible' />
              <div className='shape shape-end shape-fluid-y text-white d-none d-md-block'>
                <svg viewBox='0 0 112 690' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M116 0H51v172C76 384 0 517 0 517v173h116V0z' fill='currentColor' />
                </svg>
              </div>
            </div>
          </div>
        </>
        <div className='w-md-50 w-100 position-md-static'>
          <div className='card-body'>
            <blockquote className='blockquote text-center mb-0'>
              <p className='mb-5 mb-md-7' style={{ whiteSpace: 'pre-line' }}>
                {config.content}
              </p>
              <footer className='blockquote-footer'>
                <button className='btn btn-blue'>Contactez-nous</button>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactSection
