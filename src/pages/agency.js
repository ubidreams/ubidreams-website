// External Librairies
import useTranslation from 'next-translate/useTranslation'
import ImageNext from 'next/image'
import { useRouter } from 'next/router'

// Components
import CardMember from '../components/card-member'
import FeatureContainer from '../components/feature-container'
import Helmet from '../components/layout/helmet-seo'
import Section from '../components/section'
import SlidItemPartner from '../components/slide-item-partner'
import SliderComponent from '../components/slider'
import Title from '../components/title'

// Helpers & Config
import { AccueilCropped, ConseilCropped, UbidreamsFront } from '../config/StaticImagesExport'

// Data
import { getMembership, getTeamMembers } from '../lib/request/agence.js'

/**
 * Page de présentation de l'agence et des collaborateurs
 * @param allMembers résultats de la requête : getTeamMembers
 * @param allMembership résultats de la requête : getMembership
 */
export const Agency = ({ allMembers, allMembership }) => {
  // Initialisation de la page
  const router = useRouter()
  const { t } = useTranslation('agency')
  const metatags = { ...t('seo', {}, { returnObjects: true }) }

  // Fonction qui retourne un tableau avec les mots d'une chaine de caractère
  function splitColor(string, character) {
    return string.split(character)
  }

  return (
    <Helmet metatags={metatags} router={router}>
      {/* Entete de page != du hero classique donc usage du background-image + composant Title */}
      <Section
        bgClass='bg-between'
        customStyle={{
          backgroundImage: `url(${ConseilCropped.src}), url(${AccueilCropped.src})`,
          //override the default background-size property made by the theme bundle
          backgroundSize: 'auto 60%'
        }}
      >
        <div className='d-flex vh-md-50 justify-content-center align-items-center'>
          <Title title={t('hero.title')} subtitle={t('hero.subtitle')} />
        </div>
      </Section>

      {/* Slider valeurs */}
      <Section bgClass='bg-gray-200' display=''>
        <SliderComponent
          buttonSpace='250'
          className='mx-md-11'
          slideArrow900={false}
          showArrow={{ show: true, break1000: true }}
          option={{ slidesToShow: 1 }}
        >
          {t('valeurs', {}, { returnObjects: true }).map((item, index) => (
            <section key={index} className='container d-block'>
              <h3 className='display-4 text-center mb-4 text-uppercase'>{item.title}</h3>
              <div className='row'>
                <FeatureContainer
                  className='mw-md-50 mt-4'
                  namespace={{ name: 'agency' }}
                  data={item}
                  displayDirection='row'
                />
              </div>
            </section>
          ))}
        </SliderComponent>
      </Section>

      {/* Présentation de l'équipe */}
      <Section>
        <div className='text-center mb-6'>
          <h3 className='display-4 mb-4'>{t('equipe.title')}</h3>
          <p className='lead text-muted'>{t('equipe.subtitle')}</p>
        </div>
        <div className='row row-cols-1 row-cols-md-3 mt-6 members'>
          <CardMember config={allMembers.membres} />
        </div>
      </Section>

      {/* Localisation */}
      <Section display=''>
        <h3 className='display-4 text-center mb-6 text-uppercase'>{t('localisation.title')}</h3>
        <div className='row border' data-aos='fade-in' data-aos-delay='500'>
          <div className='col-12 col-md-6 px-md-0'>
            <div className='position-relative h-100 vw-50 float-end d-none d-md-block' style={{ minHeight: '500px' }}>
              <ImageNext src={UbidreamsFront} alt='' layout='fill' objectFit='cover' />
              <div className='shape shape-end shape-fluid-y svg-shim text-white'>
                <svg viewBox='0 0 100 1544' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M0 386V0h100v1544H50v-386L0 386z' fill='currentColor' />
                </svg>
              </div>
            </div>
          </div>
          <div className='col-12 col-md-6 py-5 py-md-11 px-6 px-md-12 align-self-center'>
            <h3 className='fw-bold'>
              <strong>
                {/* Isoler les mots à mettre en couleur */}
                {splitColor(t('localisation.subtitle'), '%color%').map((word, index) => {
                  if ((index + 1) % 2 == 0) {
                    return (
                      <span key={index} className='text-black'>
                        {word}
                      </span>
                    )
                  } else {
                    return word
                  }
                })}
              </strong>
            </h3>
            <p className='fs-lg'>{t('localisation.content')}</p>
          </div>
        </div>
      </Section>
      {/* Présentation des Associations partenaires */}
      <Section>
        <div className='text-center'>
          <h3 className='display-4 mb-4'>{t('adhesion.title')}</h3>
          <p className='lead text-muted'>{t('adhesion.subtitle')}</p>
        </div>
      </Section>
      {/* Slider des associations partenaires d'Ubidreams */}
      <SliderComponent
        className='center mt-14 mt-md-12'
        showArrow={{ show: false, break1000: true }}
        option={{ slidesToShow: 4 }}
      >
        {allMembership.adhesionAssociation.map((adhesion, index) => {
          return <SlidItemPartner key={index} config={adhesion} />
        })}
      </SliderComponent>
    </Helmet>
  )
}

export default Agency

/**
 * Fonction asynchrone Next JS => Next.js will pre-render this page at build time using the props returned by getStaticProps.
 * @param preview booléen qui permet de gérer la preview (nous gérons cela au niveau du déploiement donc nous laissons à false)
 * @param locale locale active du site
 */
export async function getStaticProps({ preview = false, locale }) {
  const allMembers = (await getTeamMembers(preview, locale)) || []
  const allMembership = (await getMembership(preview, locale)) || []

  // Nous renvoyons les données sous forme de props à la page
  return {
    props: { allMembers, allMembership }
  }
}
