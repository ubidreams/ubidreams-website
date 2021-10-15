import { getExpertisesByField, getPartenairesByField } from '../../lib/api'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import PageTitle from '../../components/page-title'
import Section from '../../components/section'
import TextContainer from '../../components/text-container'
import CardExpertise from '../../components/card-expertise'
import ContactSection from '../../components/contact-section'
import Breadcrumb from '../../components/breadcrumb'
import Card from '../../components/card'
import Helmet from '../../components/layout/helmet-seo'

export const IOT = ({ expertises = [], partners = [] }) => {
  const router = useRouter()
  const { t } = useTranslation('iot')
  const metatags = { ...t('seo', {}, { returnObjects: true }) }

  return (
    <Helmet metatags={metatags} router={router}>
      <Breadcrumb router={router} />
      <PageTitle
        namespace='iot'
        displayImage='reverse'
        classText='text-left px-4 pe-md-8'
        classImg='w-100 px-4 px-md-0'
      />

      {/* Présentation de notre expertise*/}
      <Section>
        <TextContainer namespace={{ name: 'iot', section: 'expertises' }} alignText='center' data-aos='fade-up' />
        <div className='row row-cols-1 row-cols-md-2 mt-6'>
          <CardExpertise config={expertises} />
        </div>
      </Section>

      <Section bgClass='bg-gray-300'>
        <h2 className='text-center'>{t('partenaires.title')}</h2>
        <div className='row pt-6 justify-content-center'>
          <Card config={partners} large={3} />
        </div>
      </Section>

      {/* Card de contact */}
      <Section>
        <ContactSection />
      </Section>
    </Helmet>
  )
}

export default IOT

export async function getStaticProps({ preview = false, locale }) {
  const expertises = (await getExpertisesByField(preview, locale, 'internet-of-things')) || []
  const partners = (await getPartenairesByField(preview, locale, 'iot')) || []
  return {
    props: { expertises, partners }
  }
}
