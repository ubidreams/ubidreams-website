import { isEmpty } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/dist/client/router'
import React, { useContext, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import ReactHtmlParser from 'react-html-parser'
//https://github.com/dozoisch/react-google-recaptcha/issues/218
//issue cookie : SameSite, n'empêche pas le focntionnement du captcha
import Swal from 'sweetalert2'
import ContactMeta from '../components/contact-meta'
import Helmet from '../components/layout/helmet-seo'
import Section from '../components/section'
import Title from '../components/title'
import { ContactHeader } from '../config/StaticImagesExport'
import { CookiesContext } from '../helpers/cookiesContext'
import { getCnilMentionForm, getCoordonnees } from '../lib/api'

const CAPTCHA_API = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export const Contact = ({ coordonnees, cnilMention }) => {
  const cookies = useContext(CookiesContext)
  const router = useRouter()
  const { t } = useTranslation('contact')
  const metatags = { ...t('seo', {}, { returnObjects: true }) }
  const [contactForm, setContactForm] = useState({
    object: !isEmpty(router.query) ? router.query.object : t('form.default-object')
  })

  const [sendingMessage, setSendingMessage] = useState(false)
  const adresse = coordonnees.adresse + ', ' + coordonnees.ville + ', ' + coordonnees.pays
  const recaptchaRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isEmpty(recaptchaRef.current.getValue())) {
      return Toast.fire({
        icon: 'error',
        title: t('form.captcha-invalid')
      })
    }

    setSendingMessage(true)

    const contact = {
      ...contactForm,
      captcha: recaptchaRef.current.getValue(),
      company: isEmpty(contactForm.company) ? 'Société non renseignée' : contactForm.company,
      name: isEmpty(contactForm.name) ? 'Anonyme' : contactForm.name
    }

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    })
    if (response) {
      setSendingMessage(false)
      if (response) {
        switch (response.status) {
          case 200:
            setContactForm({})
            recaptchaRef.current.reset()
            Toast.fire({
              icon: 'success',
              title: t('form.success')
            })
            break
          case 400:
          case 422:
          case 500:
            Toast.fire({
              icon: 'error',
              title: t('form.error')
            })
            break
        }
      }
    }
  }

  return (
    <Helmet metatags={metatags} router={router} className='bg-light-grey'>
      <Section
        bgClass='overlay overlay-black overlay-60 bg-cover'
        customStyle={{ backgroundImage: `url(${ContactHeader.src})`, backgroundPosition: '50% 38%' }}
      >
        <div className='row justify-content-center'>
          <div className='col-12 col-md-10 col-lg-8 text-center'>
            <Title title={t('hero.title')} subtitle={t('hero.subtitle')} className='text-white contact' />
          </div>
        </div>
      </Section>
      <div className='position-relative'>
        <div className='shape shape-bottom shape-fluid-x text-light-grey'>
          <svg viewBox='0 0 2880 48' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z' fill='currentColor' />
          </svg>
        </div>
      </div>
      <Section bgClass='border-gray-300 border-bottom' id='info'>
        <div className='text-center'>
          <a href='#contact-form' className='btn btn-white btn-rounded-circle shadow mt-n11 mt-md-n14'>
            <i className='fe fe-arrow-down'></i>
          </a>
        </div>
        <div className='row row-cols-1 row-cols-md-3'>
          <ContactMeta title={t('coordonnee.location-title')} content={adresse} />
          <ContactMeta title={t('coordonnee.phone-title')} content={coordonnees.telephone} />
          <ContactMeta title={t('coordonnee.mail-title')} content={coordonnees.email} />
        </div>
      </Section>
      <Section id='contact-form'>
        <Title title={t('form.title')} subtitle={t('form.subtitle')} titleH='h2' subtitleH='h4' />
        <form onSubmit={handleSubmit}>
          <div className='row row-cols-1 row-cols-md-2 mt-7'>
            <div className='form-group mb-5'>
              <label className='form-label' htmlFor='contactName'>
                {t('form.identite')}
              </label>

              <input
                className='form-control border border-gray-300'
                id='contactName'
                type='text'
                placeholder={t('form.identite')}
                onChange={(e) =>
                  setContactForm({
                    ...contactForm,
                    name: e.target.value
                  })
                }
                value={contactForm.name || ''}
              />
            </div>
            <div className='form-group mb-5'>
              <label className='form-label required' htmlFor='contactEmail'>
                {t('form.email')}
              </label>

              <input
                className='form-control border-gray-300'
                id='contactEmail'
                type='email'
                placeholder={t('form.email')}
                onChange={(e) =>
                  setContactForm({
                    ...contactForm,
                    email: e.target.value
                  })
                }
                value={contactForm.email || ''}
                pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
                title={t('form.email-format')}
                required
              />
            </div>
          </div>
          <div className='row'>
            <div className='form-group mb-5'>
              <label className='form-label' htmlFor='contactObject'>
                {t('form.company')}
              </label>

              <input
                className='form-control border-gray-300'
                id='company'
                type='text'
                placeholder={t('form.company')}
                onChange={(e) =>
                  setContactForm({
                    ...contactForm,
                    company: e.target.value
                  })
                }
                value={contactForm.company || ''}
              />
            </div>
          </div>
          <div className='row'>
            <div className='form-group mb-5'>
              <label className='form-label required' htmlFor='contactObject'>
                {t('form.object')}
              </label>
              <input
                className='form-control border-gray-300'
                id='contactObject'
                type='text'
                placeholder={t('form.object')}
                onChange={(e) =>
                  setContactForm({
                    ...contactForm,
                    object: e.target.value
                  })
                }
                value={contactForm.object || ''}
                required
              />
            </div>
            <div className='form-group mb-7 mb-md-7'>
              <label className='form-label required' htmlFor='contactMessage'>
                {t('form.message')}
              </label>

              <textarea
                className='form-control border-gray-300'
                id='contactMessage'
                rows='5'
                placeholder={t('form.message')}
                onChange={(e) =>
                  setContactForm({
                    ...contactForm,
                    message: e.target.value
                  })
                }
                value={contactForm.message || ''}
                required
              ></textarea>
            </div>
            {cookies.googlerecaptcha ? (
              <div className='d-flex flex-column text-center'>
                <div id='captcha'>
                  <ReCAPTCHA ref={recaptchaRef} sitekey={CAPTCHA_API} />
                </div>
                <div>
                  <button type='submit' className='btn btn-blue lift' disabled={sendingMessage}>
                    {sendingMessage && (
                      <span className='spinner-border spinner-border-sm me-2' role='status' aria-hidden='true' />
                    )}
                    {sendingMessage ? t('form.load') : t('form.button')}
                  </button>
                </div>
              </div>
            ) : (
              <div className='text-center'>
                <span className='fe fe-alert-circle'></span>
                <p>{t('common:cookie.noAcceptCaptcha')}</p>
              </div>
            )}
            <div>
              <hr className='my-6 my-md-8 text-gray-500' />
              <div>{ReactHtmlParser(cnilMention)}</div>
            </div>
          </div>
        </form>
      </Section>
    </Helmet>
  )
}

export default Contact

export async function getStaticProps({ locale }) {
  const coordonnees = (await getCoordonnees(locale)) || []
  const cnilMention = (await getCnilMentionForm(locale)) || []

  return {
    props: { coordonnees, cnilMention }
  }
}
