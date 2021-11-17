import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { useContext, useEffect, useState } from 'react'
import { Img, Ubidreams } from '../../../config/StaticImagesExport.js'
import { CookiesContext } from '../../../helpers/cookiesContext'
import { getAllLegalPages, getCoordonnees } from '../../../lib/api.js'

const Footer = () => {
  const cookies = useContext(CookiesContext)
  const { t, lang } = useTranslation('common')
  const [legalPages, setLegalPages] = useState([])
  const [coordonnees, setCoordonnees] = useState({})

  useEffect(() => {
    getAllLegalPages(lang).then((data) => setLegalPages(data))
    getCoordonnees(lang).then((data) => setCoordonnees(data))
  }, [lang])

  const MenuLink = ({ href, name }) => {
    return (
      <li className='mb-3'>
        <Link href={'/' + href}>
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
              <p className='mb-2'>{t('footer.slogan')}</p>

              {/* <!-- Social --> */}
              <ul className='list-unstyled list-inline list-social mb-6 mb-md-0'>
                {t('footer.social', {}, { returnObjects: true }).map((socialMedia, index) => {
                  return (
                    <li key={index} className='list-inline-item list-social-item me-4 position-relative'>
                      {cookies[socialMedia.cookieDesignation] ? (
                        <a
                          href={socialMedia.path}
                          className='text-decoration-none'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <Image src={Img[socialMedia.img.key]} alt={socialMedia.img.alt} width={25} height={25} />
                        </a>
                      ) : (
                        <>
                          <div className='popover pop-footer bg-gray-200'>{t('common:cookie.noAccept')}</div>
                          <div style={{ opacity: '0.6' }}>
                            <Image src={Img[socialMedia.img.key]} alt={socialMedia.img.alt} width={25} height={25} />
                          </div>
                        </>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
            {/* Location */}
            <div className='col-12 col-md-4 col-lg-4'>
              {/* <!-- Heading --> */}
              <h6 className='fw-bold text-uppercase'>{t('footer.location.title')}</h6>

              {/* <!-- List --> */}
              <div className='text-muted mb-6 mb-md-8 mb-lg-0' style={{ whiteSpace: 'pre-line' }}>
                {coordonnees?.telephone}
                <br />
                {coordonnees?.email}
                <br />
                <div>{coordonnees?.adresse + ','}</div>
                <div>{coordonnees?.ville + ','}</div>
                <div>{coordonnees?.pays}</div>
              </div>
            </div>
            {/* link mentions */}
            <div className='col-12 col-md-4 col-lg-4'>
              {/* <!-- Heading --> */}
              <h6 className='fw-bold text-uppercase'>{t('footer.legal.title')}</h6>

              {/* <!-- List --> */}
              <ul className='list-unstyled text-muted mb-0'>
                {legalPages &&
                  legalPages.map((link, index) => {
                    return <MenuLink key={index} href={link.slug} name={link.title} />
                  })}
              </ul>
            </div>
          </div>
        </div>
        <Script src='../../js/axeptio.js' strategy='beforeInteractive' />
      </footer>
    </div>
  )
}

export default Footer
