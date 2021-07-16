import Link from 'next/link'
import Image from 'next/image'

import { Ubidreams, Facebook, Linkedin, Twitter } from '../config/StaticImagesExport.js'

const Footer = () => {
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
              <p className='text-gray-700 mb-2'>Rêvons digital.</p>

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
              <h6 className='fw-bold text-uppercase text-gray-700'>Location</h6>

              {/* <!-- List --> */}
              <p className='text-muted mb-6 mb-md-8 mb-lg-0'>
                3 Boulevard du commandant Charcot,
                <br />
                17440 Aytré, <br />
                France
              </p>
            </div>
            {/* link mentions */}
            <div className='col-6 col-md-4 col-lg-4'>
              {/* <!-- Heading --> */}
              <h6 className='fw-bold text-uppercase text-gray-700'>Legal</h6>

              {/* <!-- List --> */}
              <ul className='list-unstyled text-muted mb-0'>
                <MenuLink href='/' name='Conditions générales de développement' />
                <MenuLink href='/' name='Politiques de cookies' />
                <MenuLink href='/' name='Mentions Légales' />
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
