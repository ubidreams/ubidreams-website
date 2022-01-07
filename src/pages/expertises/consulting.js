import { getExpertisesByField } from '../../lib/request/expertise.js'
import { useRouter } from 'next/router'
import { groupBy, isEmpty } from 'lodash'
import useTranslation from 'next-translate/useTranslation'

import PageTitle from '../../components/page-title'
import Section from '../../components/section'
import TextContainer from '../../components/text-container'
import ContactSection from '../../components/contact-section'
import Breadcrumb from '../../components/breadcrumb'
import CardConsulting from '../../components/card-consulting'
import Helmet from '../../components/layout/helmet-seo'

export const Consulting = ({ expertises = [] }) => {
  const router = useRouter()
  const { t } = useTranslation('consulting')
  const metatags = { ...t('seo', {}, { returnObjects: true }) }
  const expertisesGroupByDomaine = groupBy(expertises, 'domaine')
  const domainesExpertise = t('expertises.domaine-expertise', {}, { returnObjects: true })

  return (
    <Helmet metatags={metatags} router={router}>
      <Breadcrumb router={router} />
      <PageTitle
        namespace='consulting'
        displayImage='reverse'
        classText='text-left px-4 pe-md-8'
        classImg='w-100 px-4 px-md-0'
      />

      {/* Présentation de notre expertise */}
      <Section>
        <TextContainer
          namespace={{ name: 'consulting', section: 'expertises' }}
          alignText='center'
          data-aos='fade-up'
        />

        {domainesExpertise.map((domaine, index) => {
          const oneDomaineExp = expertisesGroupByDomaine[domaine.key]
          if (!isEmpty(oneDomaineExp)) {
            return (
              <div key={index} className='py-6'>
                <div className='text-center pb-5'>
                  <h3 className='fw-bold'>{domaine.title}</h3>
                  <p className='text-muted'>{domaine.subtitle}</p>
                </div>
                <div className='row row-cols-1 row-cols-sm-2 row-consulting'>
                  <CardConsulting config={oneDomaineExp} />
                </div>
              </div>
            )
          }
        })}
      </Section>
      {/* Card de contact */}
      <Section>
        <ContactSection />
      </Section>
    </Helmet>
  )
}

export default Consulting

export async function getStaticProps({ preview = false, locale }) {
  const expertises = (await getExpertisesByField(preview, locale, 'consulting')) || []
  return {
    props: { expertises }
  }
}
