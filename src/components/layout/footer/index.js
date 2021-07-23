import Link from 'next/link'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'

import { Ubidreams, Facebook, Linkedin, Twitter } from '../../../config/StaticImagesExport.js'

const Footer = () => {
  const { t } = useTranslation('common')

  const MenuLink = ({ href, name }) => {
    return (
      <li className='mb-3'>
        <Link href={href}>
          <a className='text-reset'>{name}</a>
        </Link>
      </li>
    )
  }

  return (
    <div style={{ marginTop: 'auto' }}>
      <div className='position-relative'>
        <div className='shape shape-bottom shape-fluid-x svg-shim text-gray-300'>
          <svg viewBox='0 0 2880 48' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z' fill='currentColor' />
          </svg>
        </div>
      </div>
      <footer className='py-8 py-md-11 bg-gray-300'>
        <div className='container'>
          <div className='row'>
            {/* Logo + reseaux sociaux */}
            <div className='col-12 col-md-4 col-lg-4'>
              {/* <!-- Brand --> */}
              <Image src={Ubidreams} alt='Logo Ubidreams' width={150} height={43} />

              {/* <!-- Text --> */}
              <p className='text-gray-700 mb-2'>{t('footer.slogan')}</p>

              {/* <!-- Social --> */}
              <ul className='list-unstyled list-inline list-social mb-6 mb-md-0'>
                <li className='list-inline-item list-social-item me-4'>
                  <a href='#!' className='text-decoration-none'>
                    <Image src={Facebook} alt='Facebook' width={25} height={25} />
                  </a>
                </li>
                <li className='list-inline-item list-social-item me-4'>
                  <a href='#!' className='text-decoration-none'>
                    <Image src={Twitter} alt='Twitter' width={25} height={25} />
                  </a>
                </li>
                <li className='list-inline-item list-social-item me-4'>
                  <a href='#!' className='text-decoration-none'>
                    <Image src={Linkedin} alt='Linkedin' width={25} height={25} />
                  </a>
                </li>
              </ul>
            </div>
            {/* Location */}
            <div className='col-6 col-md-4 col-lg-4'>
              {/* <!-- Heading --> */}
              <h6 className='fw-bold text-uppercase text-gray-700'>{t('footer.location.title')}</h6>

              {/* <!-- List --> */}
              <p className='text-muted mb-6 mb-md-8 mb-lg-0' style={{ whiteSpace: 'pre-line' }}>
                {t('footer.location.address')}
                <br />
                {t('footer.location.phone')}
              </p>
            </div>
            {/* link mentions */}
            <div className='col-6 col-md-4 col-lg-4'>
              {/* <!-- Heading --> */}
              <h6 className='fw-bold text-uppercase text-gray-700'>{t('footer.legal.title')}</h6>

              {/* <!-- List --> */}
              <ul className='list-unstyled text-muted mb-0'>
                {t('footer.legal.links', {}, { returnObjects: true }).map((link, index) => {
                  return <MenuLink key={index} href={link.path} name={link.name} />
                })}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
