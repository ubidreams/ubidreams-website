// External Librairies
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'

// Helpers & Config
import { Image } from 'react-datocms'

// Data
import { getAllTestimonialsForHome, getPagesFavorites, getGalleryImg } from '../lib/request/home.js'
import { getLastReferences } from '../lib/request/reference.js'

// Component
import Card from '../components/card'
import CardReference from '../components/card-reference'
import ContactSection from '../components/contact-section'
import FeatureContainer from '../components/feature-container'
import Helmet from '../components/layout/helmet-seo'
import PageTitle from '../components/page-title'
import Section from '../components/section'
import SliderComponent from '../components/slider'
import SliderItem from '../components/slider-item'
import TextContainer from '../components/text-container'

/**
 * Page principale du site (ACCUEIL)
 * @param allTestimonials résultats de la requête : getAllTestimonialsForHome
 * @param lastReferences résultats de la requête : getLastReferences
 * @param pagesFavorites résultats de la requête : getPagesFavorites
 * @param galleryImg résultats de la requête : getGalleryImg
 */
export const Home = ({ allTestimonials, lastReferences, pagesFavorites, galleryImg }) => {
  // Initialisation de la page
  const { t } = useTranslation('home')
  const router = useRouter()
  const metatags = { ...t('seo', {}, { returnObjects: true }) }

  return (
    <Helmet metatags={metatags} router={router}>
      {/* Entête > titre + illustration à droite */}
      <PageTitle namespace='home' displayImage='reverse' classText='text-left' showButton />

      {/* Présentation de 3 expertises (développement, IOT, Conseil) */}
      <Section>
        <div className='d-md-flex d-lg-flex'>
          <FeatureContainer className='m-2' namespace={{ name: 'home' }} displayDirection='column' />
        </div>
      </Section>

      {/* Gallerie photo */}
      <Section>
        <div className='row grid'>
          {galleryImg.gallerie.map((img, index) => {
            return (
              <div key={index} className='col-12 col-md-4 mb-2 px-md-1 grid-item'>
                <Image
                  alt=''
                  data={{
                    ...img.responsiveImage
                  }}
                  className='card-img object-cover h-100'
                />
              </div>
            )
          })}
        </div>
      </Section>

      {/* Video */}
      <Section bgClass='bg-gray-200'>
        <iframe width='420' height='315' src='https://www.youtube.com/watch?v=W0RN_TSLCj0'></iframe>
      </Section>

      {/* Présentation des technologies / pages favorites */}
      <Section id='solutions'>
        <TextContainer namespace={{ name: 'home', section: 'technology' }} alignText='center' />
        <div className='row'>
          <Card config={pagesFavorites} large={1} reverse showShadows />
        </div>
      </Section>

      {/* Card de contact */}
      <Section>
        <ContactSection />
      </Section>

      {/* Slider de témoignage clients */}
      <Section bgClass='bg-gray-200'>
        <TextContainer namespace={{ name: 'home', section: 'testimony' }} alignText='center' />
        <SliderComponent className='shadow-light-lg' option={{ slidesToShow: 1, adaptiveHeight: true, fade: true }}>
          {allTestimonials.temoignages?.map((item, index) => (
            <SliderItem key={index} data={item} />
          ))}
        </SliderComponent>
      </Section>

      {/* Dernières références */}
      <Section>
        <TextContainer namespace={{ name: 'home', section: 'reference' }} alignText='center' />
        <div className='row row-cols-md-3'>
          <CardReference config={lastReferences} />
        </div>
      </Section>
    </Helmet>
  )
}

export default Home

/**
 * Fonction asynchrone Next JS => Next.js will pre-render this page at build time using the props returned by getStaticProps.
 * @param preview booléen qui permet de gérer la preview (nous gérons cela au niveau du déploiement donc nous laissons à false)
 * @param locale locale active du site
 */
export async function getStaticProps({ preview = false, locale }) {
  const pagesFavorites = (await getPagesFavorites(preview, locale)) || []
  const allTestimonials = (await getAllTestimonialsForHome(preview, locale)) || []
  const galleryImg = (await getGalleryImg(preview, locale)) || []
  const lastReferences = (await getLastReferences(preview, locale)) || []

  // Nous renvoyons les données sous forme de props à la page
  return {
    props: { allTestimonials, galleryImg, lastReferences, pagesFavorites }
  }
}
