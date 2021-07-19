import FeatureContainer from '../core/components/FeatureContainer'
import Layout from '../core/components/layout'
import PageTitle from '../core/components/pageTitle'
import Section from '../core/components/section'
import SectionCardSimple from '../core/components/sectionCardSimple'
import TextContainer from '../core/components/textContainer'
import ContactSection from '../core/components/contactSection'
import SliderComponent from '../core/components/slider'
import CardReference from '../core/components/cardReference'
import { Recherche, IdeesRightCropped } from '../core/config/StaticImagesExport'
import {
  configFeatureContainer,
  configPageTitle,
  configIntroduction,
  configDataTechnos,
  configTestimony,
  configReference
} from '../pages/config/indexConfig'

export const Home = () => {
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
          {configTestimony.testimonials.map((item, index) => (
            <SectionCardSimple key={index} data={item} index={index} />
          ))}
        </SliderComponent>
      </Section>

      {/* Dernières références */}
      <Section>
        <TextContainer config={configReference.introduction} alignText='center' />
        <div className='d-md-flex'>
          <CardReference config={configReference.references} />
        </div>
      </Section>
    </Layout>
  )
}

export default Home
