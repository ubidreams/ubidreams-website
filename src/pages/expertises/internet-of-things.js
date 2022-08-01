// External Librairies
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

// Data
import { getExpertisesByField, getPartenairesByField } from '../../lib/request/expertise.js'

// Components
import PageTitle from '../../components/page-title'
import Section from '../../components/section'
import TextContainer from '../../components/text-container'
import CardExpertise from '../../components/card-expertise'
import ContactSection from '../../components/contact-section'
import Breadcrumb from '../../components/breadcrumb'
import Card from '../../components/card'
import Helmet from '../../components/layout/helmet-seo'

/**
 * PAGE IOT
 * @param expertises résultats de la requête : getExpertisesByField
 * @param partners résultats de la requête : getPartenairesByField
 */
export const IOT = ({ expertises = [], partners = [] }) => {
  // Initialisation de la page
  const router = useRouter()
  const { t } = useTranslation('iot')
  const metatags = { ...t('seo', {}, { returnObjects: true }) }

  return (
    <Helmet metatags={metatags} router={router}>
      {/* Entête de la page (titre + image) */}
      <Breadcrumb router={router} />
      <PageTitle
        namespace='iot'
        displayImage='reverse'
        classText='text-left px-4 pe-md-8'
        classImg='w-100 px-4 px-md-0'
      />

      {/* Présentation de notre expertise : 1 bloc pour chaque spécialité de l'IOT */}
      <Section>
        <TextContainer namespace={{ name: 'iot', section: 'expertises' }} alignText='center' data-aos='fade-up' />
        <div className='row row-cols-1 row-cols-md-2 mt-6'>
          <CardExpertise config={expertises} />
        </div>
      </Section>

      {/* Présentation des entreprises partenaires dans le domaine de l'IOT */}
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

/**
 * Fonction asynchrone Next JS => Next.js will pre-render this page at build time using the props returned by getStaticProps.
 * @param preview booléen qui permet de gérer la preview (nous gérons cela au niveau du déploiement donc nous laissons à false)
 * @param locale locale active du site
 */
export async function getStaticProps({ preview = false, locale }) {
  const expertises = (await getExpertisesByField(preview, locale, 'internet-of-things')) || []
  const partners = (await getPartenairesByField(preview, locale, 'iot')) || []

  // Nous renvoyons les données sous forme de props à la page
  return {
    props: { expertises, partners }
  }
}
