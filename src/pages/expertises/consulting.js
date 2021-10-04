import { getExpertisesByField } from '../../lib/api'
import { useRouter } from 'next/router'
import { groupBy, isEmpty } from 'lodash'
import useTranslation from 'next-translate/useTranslation'

import Layout from '../../components/layout/layout'
import PageTitle from '../../components/page-title'
import Section from '../../components/section'
import TextContainer from '../../components/text-container'
import CardExpertise from '../../components/card-expertise'
import ContactSection from '../../components/contact-section'
import Breadcrumb from '../../components/breadcrumb'

export const Consulting = ({ expertises = [] }) => {
  const { t } = useTranslation('consulting')
  const router = useRouter()
  const expertisesGroupByDomaine = groupBy(expertises, 'domaine')
  const domainesExpertise = t('expertises.domaine-expertise', {}, { returnObjects: true })

  return (
    <main>
      <Breadcrumb router={router} />
      <PageTitle
        namespace='consulting'
        displayImage='reverse'
        classText='text-left px-4 pe-md-8'
        classImg='w-100 px-4 px-md-0'
        minHeight='80vh'
      />

      {/* Présentation de notre expertise */}
      <Section>
        <TextContainer
          namespace={{ name: 'consulting', section: 'expertises' }}
          alignText='center'
          data-aos='fade-up'
        />
      </Section>
      {domainesExpertise.map((domaine, index) => {
        const oneDomaineExp = expertisesGroupByDomaine[domaine.key]
        if (!isEmpty(oneDomaineExp)) {
          return (
            <Section key={index}>
              <div className='text-center pb-5'>
                <h3 className='fw-bold'>{domaine.title}</h3>
                <p className='text-muted'>{domaine.subtitle}</p>
              </div>
              <div className='row row-cols-1 row-cols-md-2'>
                <CardExpertise config={oneDomaineExp} />
              </div>
            </Section>
          )
        }
      })}
      {/* Card de contact */}
      <Section>
        <ContactSection />
      </Section>
    </main>
  )
}

export default Consulting

export async function getStaticProps({ preview = false, locale }) {
  const expertises = (await getExpertisesByField(preview, locale, 'consulting')) || []
  return {
    props: { expertises }
  }
}
