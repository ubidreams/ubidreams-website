import { useCallback, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { ContactHeader } from '../config/StaticImagesExport'
import { isNil, isNull } from 'lodash'

import ContactMeta from '../components/contact-meta'
import Section from '../components/section'
import Title from '../components/title'
import { useRouter } from 'next/dist/client/router'

export const Contact = () => {
  const router = useRouter()
  const { t } = useTranslation('contact')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [messageRequest, setMessageRequest] = useState({ code: null, message: null })
  const [object, setObject] = useState(isNil(router.query) ? router.query.object : t('form.default-object'))

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      setMessageRequest({ code: null, message: null })

      let data = {
        name,
        email,
        object,
        message
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (response && response.status === 500) {
        setMessageRequest({ code: 'error', message: t('form.error') })
      } else if (response.status === 200) {
        setMessageRequest({ code: 'success', message: t('form.success') })
        setName('')
        setEmail('')
        setObject('')
        setMessage('')
      }
    },
    [email, message, name, object, t]
  )
  return (
    <main className='bg-light-grey'>
      <Section
        bgClass='overlay overlay-black overlay-60 bg-cover'
        customStyle={{ backgroundImage: `url(${ContactHeader.src})` }}
      >
        <div className='row justify-content-center'>
          <div className='col-12 col-md-10 col-lg-8 text-center'>
            <Title title={t('hero.title')} subtitle={t('hero.subtitle')} className='text-white' />
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
          <a href='#contact-form' className='btn btn-white btn-rounded-circle shadow mt-n11 mt-md-n14' data-scroll>
            <i className='fe fe-arrow-down'></i>
          </a>
        </div>
        <div className='row row-cols-1 row-cols-md-3'>
          <ContactMeta title={t('coordonnee.location-title')} content={t('common:footer.location.address')} />
          <ContactMeta title={t('coordonnee.phone-title')} content={t('common:footer.location.phone')} />
          <ContactMeta title={t('coordonnee.mail-title')} content={t('common:footer.location.mail')} />
        </div>
      </Section>
      <Section id='contact-form'>
        <Title title={t('form.title')} subtitle={t('form.subtitle')} titleH='h2' subtitleH='h4' />
        <form onSubmit={handleSubmit}>
          <div className='row row-cols-1 row-cols-md-2 mt-7'>
            <div className='form-group mb-5'>
              <label className='form-label required' htmlFor='contactName'>
                {t('form.identite')}
              </label>

              <input
                className='form-control border border-gray-300'
                id='contactName'
                type='text'
                placeholder={t('form.identite')}
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
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
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
                title={t('form.email-format')}
                required
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
                defaultValue={object}
                onChange={(e) => setObject(e.target.value)}
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
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                required
              ></textarea>
            </div>
            <div className='text-center'>
              {!isNull(messageRequest.code) && (
                <div
                  className={`border-left border-4 border-${messageRequest.code == 'error' ? 'orange' : 'green'} mb-4`}
                >
                  <p className={`p-2 bg-${messageRequest.code == 'error' ? 'orange' : 'green'}-75`}>
                    {messageRequest.code == 'error' && <span className='fe fe-alert-circle'></span>}
                    {messageRequest.message}
                  </p>
                </div>
              )}
              <button type='submit' className='btn btn-blue lift'>
                {t('form.button')}
              </button>
            </div>
          </div>
        </form>
      </Section>
    </main>
  )
}

export default Contact
