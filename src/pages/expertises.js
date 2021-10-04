import useTranslation from 'next-translate/useTranslation'
import { getSolutions } from '../lib/api'
import { useRouter } from 'next/router'

import StepContainer from '../components/step-container'
import PageTitle from '../components/page-title'
import Section from '../components/section'
import TextContainer from '../components/text-container'
import SectionCardSimple from '../components/section-card-simple'
import ContactSection from '../components/contact-section'
import Card from '../components/card'

export const Expertises = ({ solutions }) => {
  const { t } = useTranslation('expertises')
  const router = useRouter()
  return (
    <main>
      <div className='shape shape-fluid-x shape-blur-2 text-light-grey d-none d-md-block'>
        <svg viewBox='0 0 1313 768' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M442.794 768c163.088 0 305.568-88.227 382.317-219.556l.183.556s.249-.749.762-2.181a440.362 440.362 0 0033.192-71.389C901.996 397.81 989.306 277.09 1144.29 206l-.92-.693C1230.34 171.296 1295.63 94.049 1312.83 0H1.294v295.514c-.663 9.909-1 19.908-1 29.986 0 244.386 198.114 442.5 442.5 442.5z'
            fill='currentColor'
          />
        </svg>
      </div>
      {/* Entête > titre + illustration à droite */}
      <PageTitle namespace='expertises' classText='ps-md-10' classImg='expertise-img mw-50 pt-4 mx-auto mx-md-0' />

      {/* Présentation de notre méthodologie */}
      <Section>
        <TextContainer
          namespace={{ name: 'expertises', section: 'introduction' }}
          alignText='center'
          data-aos='fade-up'
        />

        {/* Présentation de notre méthodologie */}
        <div className='d-md-flex d-lg-flex'>
          <StepContainer namespace='expertises' displayDirection='column' />
        </div>
      </Section>

      {/* Section domaines d'expertise */}
      <Section>
        <TextContainer namespace={{ name: 'expertises', section: 'featureContainer' }} alignText='center' />
        <div className='row'>
          {t('expertiseFields.fields', {}, { returnObjects: true }).map((item, index) => (
            <SectionCardSimple key={index} data={item} reverse={false} textJustify='justify-content-between' />
          ))}
        </div>
      </Section>

      {/* Présentation des solutions */}
      <Section bgClass='bg-gray-200'>
        <TextContainer namespace={{ name: 'expertises', section: 'solution.introduction' }} alignText='center' />
        <div className='row'>
          <Card config={solutions} router={router} large={3} />
        </div>
        <TextContainer
          namespace={{ name: 'expertises', section: 'solution.conclusion' }}
          className='mt-2'
          alignText='center'
        />
      </Section>

      {/* Card de contact */}
      <Section>
        <ContactSection />
      </Section>
    </main>
  )
}

export default Expertises

export async function getStaticProps({ preview = false, locale }) {
  const solutions = (await getSolutions(preview, locale)) || []
  return {
    props: { solutions }
  }
}
