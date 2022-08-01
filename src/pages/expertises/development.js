// External Librairies
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'

// Data
import { getExpertisesByField } from '../../lib/request/expertise.js'

// Components
import PageTitle from '../../components/page-title'
import Section from '../../components/section'
import TextContainer from '../../components/text-container'
import CardExpertise from '../../components/card-expertise'
import ContactSection from '../../components/contact-section'
import SectionCardSimple from '../../components/section-card-simple'
import Breadcrumb from '../../components/breadcrumb'
import Helmet from '../../components/layout/helmet-seo'

/**
 * PAGE DEVELOPMENT
 * @param expertises résultats de la requête : getExpertisesByField
 */
export const Developpement = ({ expertises = [] }) => {
  // Initialisation de la page
  const router = useRouter()
  const { t } = useTranslation('development')
  const metatags = { ...t('seo', {}, { returnObjects: true }) }

  return (
    <Helmet metatags={metatags} router={router}>
      {/* Entête : image + titre */}
      <Breadcrumb router={router} />
      <PageTitle
        namespace='development'
        displayImage='reverse'
        classText='text-left px-4 pe-md-8'
        classImg='w-100 px-4 px-md-0'
      />
      <Section>
        {/* Introduction à nos technologies : 1 bloc pour chaque spécialité du développement */}
        <TextContainer
          namespace={{ name: 'development', section: 'expertises' }}
          alignText='center'
          data-aos='fade-up'
        />
        <div className='row row-cols-1 row-cols-md-2'>
          <CardExpertise config={expertises} />
        </div>
      </Section>
      {/* Nos gestions de projet (statique) */}
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
    </Helmet>
  )
}

export default Developpement

/**
 * Fonction asynchrone Next JS => Next.js will pre-render this page at build time using the props returned by getStaticProps.
 * @param preview booléen qui permet de gérer la preview (nous gérons cela au niveau du déploiement donc nous laissons à false)
 * @param locale locale active du site
 */
export async function getStaticProps({ preview = false, locale }) {
  const expertises = (await getExpertisesByField(preview, locale, 'development')) || []
  // Nous renvoyons les données sous forme de props à la page
  return {
    props: { expertises }
  }
}
