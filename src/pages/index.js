import { getAllTestimonialsForHome, getLastReferences } from '../lib/api'

import FeatureContainer from '../components/feature-container'
import Layout from '../components/layout'
import PageTitle from '../components/page-title'
import Section from '../components/section'
import SectionCardSimple from '../components/section-card-simple'
import TextContainer from '../components/text-container'
import ContactSection from '../components/contact-section'
import SliderComponent from '../components/slider'
import CardReference from '../components/card-reference'
import { Recherche, IdeesRightCropped } from '../config/StaticImagesExport'
import {
  configFeatureContainer,
  configPageTitle,
  configIntroduction,
  configDataTechnos,
  configTestimony,
  configReference
} from '../config/indexConfig'

export const Home = ({ allTestimonials, lastReferences }) => {
  return (
    <Layout>
      {/* Entête > titre + illustration à droite */}
      <PageTitle config={configPageTitle} displayImage='reverse' alignText='left' />

      {/* Présentation de 3 expertises (développement, IOT, Conseil) */}
      <Section>
        <div className='d-md-flex d-lg-flex'>
          <FeatureContainer config={configFeatureContainer} displayDirection='column' />
        </div>
      </Section>

      {/* Présentation de l'entreprise */}
      <Section
        bgColor='bg-gray-200'
        customStyle={{
          backgroundImage: `url(${Recherche.src}), url(${IdeesRightCropped.src})`
        }}
      >
        <TextContainer config={configIntroduction} alignText='center' className='adaptive-padding' />
      </Section>

      {/* Triple blocs de technologies */}
      <Section>
        <TextContainer config={{ title: 'Nos technologies et méthodes favorites' }} alignText='center' />
        {configDataTechnos.firstSection.map((item, index) => (
          <SectionCardSimple key={index} data={item} index={index} type='techno' />
        ))}
        <div className='d-md-flex'>
          {configDataTechnos.secondSection.map((item, index) => (
            <SectionCardSimple key={index} data={item} index={index} type='techno' />
          ))}
        </div>
      </Section>

      {/* Card de contact */}
      <Section>
        <ContactSection />
      </Section>

      {/* Slider de témoignage clients */}
      <Section bgColor='bg-gray-200'>
        <TextContainer config={configTestimony.introduction} alignText='center' />
        <SliderComponent className='shadow-light-lg'>
          {allTestimonials.temoignages.map((item, index) => (
            <SectionCardSimple key={index} data={item} index={index} type='temoignage' />
          ))}
        </SliderComponent>
      </Section>

      {/* Dernières références */}
      <Section>
        <TextContainer config={configReference.introduction} alignText='center' />
        <div className='d-md-flex'>
          <CardReference config={lastReferences} />
        </div>
      </Section>
    </Layout>
  )
}

export default Home

export async function getStaticProps({ preview = false }) {
  const allTestimonials = (await getAllTestimonialsForHome(preview)) || []
  const lastReferences = (await getLastReferences(preview)) || []
  return {
    props: { allTestimonials, lastReferences }
  }
}
