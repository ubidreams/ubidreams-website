import { getExpertisesByField } from '../../lib/api'
import { useRouter } from 'next/router'

import Layout from '../../components/layout/layout'
import PageTitle from '../../components/page-title'
import Section from '../../components/section'
import TextContainer from '../../components/text-container'
import CardExpertise from '../../components/card-expertise'
import ContactSection from '../../components/contact-section'
import Breadcrumb from '../../components/breadcrumb'

export const Design = ({ expertises = [] }) => {
  const router = useRouter()

  return (
    <Layout>
      <Breadcrumb router={router} />
      <PageTitle
        namespace='consulting'
        displayImage='reverse'
        classText='text-left px-4 pe-md-8'
        classImg='w-100 px-4 px-md-0'
        minHeight='80vh'
      />

      {/* Présentation de notre expertise/nos outils */}
      <Section>
        <TextContainer namespace={{ name: 'consulting', section: 'conseils' }} alignText='center' data-aos='fade-up' />
        <div className='row row-cols-1 row-cols-md-2'>
          <CardExpertise config={expertises} />
        </div>
      </Section>
      {/* Card de contact */}
      <Section>
        <ContactSection />
      </Section>
    </Layout>
  )
}

export default Design

export async function getStaticProps({ preview = false, locale }) {
  const expertises = (await getExpertisesByField(preview, locale, 'conseil')) || []
  return {
    props: { expertises }
  }
}
