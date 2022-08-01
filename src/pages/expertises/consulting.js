// External Librairies
import { useRouter } from 'next/router'
import { groupBy, isEmpty } from 'lodash'
import useTranslation from 'next-translate/useTranslation'

// Data
import { getExpertisesByField } from '../../lib/request/expertise.js'

// Components
import PageTitle from '../../components/page-title'
import Section from '../../components/section'
import TextContainer from '../../components/text-container'
import ContactSection from '../../components/contact-section'
import Breadcrumb from '../../components/breadcrumb'
import CardConsulting from '../../components/card-consulting'
import Helmet from '../../components/layout/helmet-seo'

/**
 * PAGE CONSULTING
 * @param expertises résultats de la requête : getExpertisesByField
 */
export const Consulting = ({ expertises = [] }) => {
  // Initialisation de la page
  const router = useRouter()
  const { t } = useTranslation('consulting')
  const metatags = { ...t('seo', {}, { returnObjects: true }) }

  // Regroupement des expertises consulting par domaine (Réseaux, Rgpd)
  const expertisesGroupByDomaine = groupBy(expertises, 'domaine')
  const domainesExpertise = t('expertises.domaine-expertise', {}, { returnObjects: true })

  return (
    <Helmet metatags={metatags} router={router}>
      {/* Entête : titre + image */}
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

        {/* Pour chaque domaine (réseaux, rgpd) j'affiche une entête et les expertises liées. */}
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

/**
 * Fonction asynchrone Next JS => Next.js will pre-render this page at build time using the props returned by getStaticProps.
 * @param preview booléen qui permet de gérer la preview (nous gérons cela au niveau du déploiement donc nous laissons à false)
 * @param locale locale active du site
 */
export async function getStaticProps({ preview = false, locale }) {
  const expertises = (await getExpertisesByField(preview, locale, 'consulting')) || []
  // Nous renvoyons les données sous forme de props à la page
  return {
    props: { expertises }
  }
}
