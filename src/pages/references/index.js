import { getAllReferences, getAllRegies } from '../../lib/api'
import useTranslation from 'next-translate/useTranslation'
import CardReference from '../../components/card-reference'

import Layout from '../../components/layout/layout'
import Section from '../../components/section'
import Title from '../../components/title'
import Link from 'next/link'
import SliderComponent from '../../components/slider'
import { Image } from 'react-datocms'

export const References = ({ sixReferences, totalReferences, regies, page = 1 }) => {
  const { t } = useTranslation('references')
  const PageLinks = () => {
    let links = []
    for (var i = 1; i <= Math.ceil(totalReferences / 6); i++) {
      links.push(
        <li key={i} className={`page-item ${page == i ? 'active' : ''}`} aria-current='page'>
          <Link href={`/references/${i}`}>
            <a className='page-link text-green'>{i}</a>
          </Link>
        </li>
      )
    }
    return links
  }

  return (
    <Layout>
      <Section>
        <Title title={t('realisations.title')} subtitle={t('realisations.subtitle')} />
        <div className='row row-cols-md-3 mt-6'>
          <CardReference config={sixReferences} />
        </div>
        {totalReferences > 6 && (
          <nav aria-label='pagination'>
            <ul className='pagination pagination-sm justify-content-center mt-4'>
              <PageLinks />
            </ul>
          </nav>
        )}
      </Section>
      <Section>
        <Title title={t('regies.title')} subtitle={t('regies.subtitle')} />
      </Section>
      <SliderComponent
        className='center mt-14'
        showArrow={{ show: false, break1000: true }}
        option={{ slidesToShow: 4 }}
      >
        {regies.map((regie, index) => {
          return (
            <div key={index} className='card mb-6 mb-xl-0 px-4'>
              <div className='card-img-top shadow-light-lg'>
                <Image
                  alt=''
                  data={{
                    ...regie.img.responsiveImage
                  }}
                  className='img-fluid object-contain img-regies'
                />
              </div>
              <div className='card-body'>
                <h6 className='text-uppercase mb-1 text-muted'>{regie.nomEntreprise}</h6>

                <p className='h4 mb-0' style={{ whiteSpace: 'pre-line' }}>
                  {regie.mission}
                </p>
              </div>
            </div>
          )
        })}
      </SliderComponent>
    </Layout>
  )
}

export default References

export async function getStaticProps({ preview, locale }) {
  const references = (await getAllReferences(preview, locale)) || []
  const regies = (await getAllRegies(preview, locale)) || []
  const sixReferences = references.allReferences
  const totalReferences = references._allReferencesMeta.count
  return {
    props: { sixReferences, totalReferences, regies }
  }
}
