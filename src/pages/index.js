import { getAllTestimonialsForHome, getLastReferences, getPagesFavorites } from '../lib/api'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'

import FeatureContainer from '../components/feature-container'
import Layout from '../components/layout/layout'
import PageTitle from '../components/page-title'
import Section from '../components/section'
import TextContainer from '../components/text-container'
import ContactSection from '../components/contact-section'
import SliderComponent from '../components/slider'
import CardReference from '../components/card-reference'
import { Recherche, IdeesRightCropped } from '../config/StaticImagesExport'
import SliderItem from '../components/slider-item'
import Card from '../components/card'

export const Home = ({ allTestimonials, lastReferences, pagesFavorites }) => {
  const { t } = useTranslation('home')
  const router = useRouter()
  return (
    <Layout>
      {/* Entête > titre + illustration à droite */}
      <PageTitle namespace='home' displayImage='reverse' classText='text-left' showButton />

      {/* Présentation de 3 expertises (développement, IOT, Conseil) */}
      <Section>
        <div className='d-md-flex d-lg-flex'>
          <FeatureContainer className='m-2' namespace={{ name: 'home' }} displayDirection='column' />
        </div>
      </Section>

      {/* Présentation de l'entreprise */}
      <Section
        bgClass='bg-gray-200 bg-between'
        customStyle={{
          backgroundImage: `url(${Recherche.src}), url(${IdeesRightCropped.src})`
        }}
      >
        <TextContainer
          namespace={{ name: 'home', section: 'introduction' }}
          alignText='center'
          className='adaptive-padding'
        />
      </Section>

      {/* Triple blocs de technologies */}
      <Section>
        <TextContainer namespace={{ name: 'home', section: 'technology' }} alignText='center' />
        <div className='row'>
          <Card config={pagesFavorites} router={router} large={1} reverse showShadows />
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
          {allTestimonials.temoignages.map((item, index) => (
            <SliderItem key={index} data={item} />
          ))}
        </SliderComponent>
      </Section>

      {/* Dernières références */}
      <Section>
        <TextContainer namespace={{ name: 'home', section: 'reference' }} alignText='center' />
        <div className='row row-cols-3'>
          <CardReference config={lastReferences} />
        </div>
      </Section>
    </Layout>
  )
}

export default Home

export async function getStaticProps({ preview = false, locale }) {
  const pagesFavorites = (await getPagesFavorites(preview, locale)) || []
  const allTestimonials = (await getAllTestimonialsForHome(preview, locale)) || []
  const lastReferences = (await getLastReferences(preview, locale)) || []

  console.log(pagesFavorites)
  return {
    props: { allTestimonials, lastReferences, pagesFavorites }
  }
}
