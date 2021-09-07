import { getExpertisesByField } from '../../lib/api'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'

import Layout from '../../components/layout/layout'
import PageTitle from '../../components/page-title'
import Section from '../../components/section'
import TextContainer from '../../components/text-container'
import CardExpertise from '../../components/card-expertise'
import ContactSection from '../../components/contact-section'
import SectionCardSimple from '../../components/section-card-simple'
import Breadcrumb from '../../components/breadcrumb'

export const Developpement = ({ expertises = [] }) => {
  const { t } = useTranslation('development')
  const router = useRouter()

  return (
    <Layout>
      <Breadcrumb router={router} />
      <PageTitle
        namespace='development'
        displayImage='reverse'
        classText='text-left px-4 pe-md-8'
        classImg='w-100 px-4 px-md-0'
      />
      <Section>
        {/* Introduction à nos technologies */}
        <TextContainer
          namespace={{ name: 'development', section: 'technologies' }}
          alignText='center'
          data-aos='fade-up'
        />
        <div className='row row-cols-1 row-cols-md-2'>
          <CardExpertise config={expertises} />
        </div>
      </Section>
      <Section bgClass='bg-gray-300'>
        <h2 className='text-center'>{t('projets.title')}</h2>
        <div className='row'>
          {t('projets.features', {}, { returnObjects: true }).map((item, index) => (
            <SectionCardSimple key={index} data={item} reverse={index % 2 === 1} textJustify='justify-content-center' />
          ))}
        </div>
      </Section>
      {/* Card de contact */}
      <Section>
        <ContactSection />
      </Section>
    </Layout>
  )
}

export default Developpement

export async function getStaticProps({ preview = false, locale }) {
  const expertises = (await getExpertisesByField(preview, locale, 'developpement')) || []
  return {
    props: { expertises }
  }
}
