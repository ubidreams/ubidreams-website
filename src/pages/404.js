import Image from 'next/image'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'

import Section from '../components/section'
import { Recherche } from '../config/StaticImagesExport'
import Helmet from '../components/layout/helmet-seo'
import { useRouter } from 'next/router'

export default function Custom404() {
  const { t } = useTranslation('common')
  const router = useRouter()
  return (
    <Helmet router={router} error>
      <Section bgClass='section-border border-primary'>
        <div className='row align-items-center justify-content-center gx-0'>
          <div className='col-8 col-md-6 col-lg-7 offset-md-1 order-md-2 mt-auto mt-md-0 pt-8 pb-4 py-md-11'>
            <Image src={Recherche} alt='illustration error' className='img-fluid' />
          </div>
          <div className='col-12 col-md-5 col-lg-4 order-md-1 mb-auto mb-md-0 pb-8 py-md-11'>
            <h1 className='display-3 fw-bold text-center'>{t('error.404.title')}</h1>

            <p className='mb-5 text-center text-muted'>{t('error.404.content')}</p>

            <div className='text-center'>
              <Link href='/'>
                <a className='btn btn-blue'>{t('error.404.button')}</a>
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </Helmet>
  )
}
