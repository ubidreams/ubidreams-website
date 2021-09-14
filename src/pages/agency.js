import { getTeamMembers, getGalleryImg } from '../lib/api'
import useTranslation from 'next-translate/useTranslation'
import { Image } from 'react-datocms'

import FeatureContainer from '../components/feature-container'
import Layout from '../components/layout/layout'
import Section from '../components/section'
import SliderComponent from '../components/slider'
import Title from '../components/title'
import { AccueilCropped, ConseilCropped, Contact } from '../config/StaticImagesExport'
import '../components/map.js'
import MapBox from '../components/map.js'
import CardMember from '../components/card-member'

export const Agency = ({ allMembers, galleryImg }) => {
  const { t } = useTranslation('agency')

  function splitColor(string, character) {
    return string.split(character)
  }

  return (
    <Layout>
      {/* Entete de page != du hero classique donc usage du background-image + composant Title */}
      <Section
        bgClass='bg-between'
        customStyle={{
          backgroundImage: `url(${ConseilCropped.src}), url(${AccueilCropped.src})`,
          //override the default background-size property made by the theme bundle
          backgroundSize: 'auto 60%'
        }}
      >
        <div className='d-flex vh-50 justify-content-center align-items-center'>
          <Title title={t('hero.title')} subtitle={t('hero.subtitle')} />
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
        <div className='mt-4'>
          <p className='h2 text-uppercase'>{t('introduction.title')}</p>
          <p className='text-muted'>{t('introduction.subtitle')}</p>
        </div>
      </Section>

      {/* Slider valeurs */}
      <Section bgClass='bg-gray-200' display=''>
        <SliderComponent
          buttonSpace='250'
          className='mx-md-11'
          slideArrow900={false}
          showArrow={{ show: true, break1000: true }}
          option={{ slidesToShow: 1, adaptiveHeight: true, fade: true }}
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
            <div className='ratio ratio-1x1 d-md-none'>
              <MapBox />
            </div>
            <div className='position-relative h-100 vw-50 float-end d-none d-md-block'>
              <MapBox />
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
                {splitColor(t('localisation.subtitle'), '%color%').map((word, index) => {
                  if ((index + 1) % 2 == 0) {
                    return (
                      <span key={index} className='text-green'>
                        {word}
                      </span>
                    )
                  } else {
                    return word
                  }
                })}
              </strong>
            </h3>
            <p className='fs-lg text-gray-700'>{t('localisation.content')}</p>
          </div>
        </div>
      </Section>
    </Layout>
  )
}

export default Agency

export async function getStaticProps({ preview = false, locale }) {
  const allMembers = (await getTeamMembers(preview, locale)) || []
  const galleryImg = (await getGalleryImg(preview, locale)) || []
  return {
    props: { allMembers, galleryImg }
  }
}
