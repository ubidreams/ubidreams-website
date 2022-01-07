import { getExpertisesByField } from '../../lib/request/expertise.js'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import PageTitle from '../../components/page-title'
import Section from '../../components/section'
import TextContainer from '../../components/text-container'
import CardExpertise from '../../components/card-expertise'
import ContactSection from '../../components/contact-section'
import Breadcrumb from '../../components/breadcrumb'
import StepContainer from '../../components/step-container'
import Helmet from '../../components/layout/helmet-seo'

export const Design = ({ expertises = [] }) => {
  const router = useRouter()
  const { t } = useTranslation('design')
  const metatags = { ...t('seo', {}, { returnObjects: true }) }

  return (
    <Helmet metatags={metatags} router={router}>
      <Breadcrumb router={router} />
      <PageTitle
        namespace='design'
        displayImage='reverse'
        classText='text-left px-4 pe-md-8'
        classImg='w-100 px-4 px-md-0'
      />
      {/* Présentation de notre méthodologie + work step */}
      <Section>
        <TextContainer namespace={{ name: 'design', section: 'methodologie' }} alignText='center' data-aos='fade-up' />
        <div className='d-md-flex d-lg-flex'>
          <StepContainer namespace='design' displayDirection='column' />
        </div>
      </Section>

      {/* Présentation de notre expertise/nos outils */}
      <Section>
        <TextContainer namespace={{ name: 'design', section: 'expertises' }} alignText='center' data-aos='fade-up' />
        <div className='row row-cols-1 row-cols-md-2'>
          <CardExpertise config={expertises} />
        </div>
      </Section>
      {/* Card de contact */}
      <Section>
        <ContactSection />
      </Section>
    </Helmet>
  )
}

export default Design

export async function getStaticProps({ preview = false, locale }) {
  const expertises = (await getExpertisesByField(preview, locale, 'design')) || []
  return {
    props: { expertises }
  }
}
