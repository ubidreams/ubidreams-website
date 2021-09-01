import { useState, useEffect, useCallback } from 'react'
import { getAllReferences, getAllRegies } from '../../lib/api'
import useTranslation from 'next-translate/useTranslation'
import { Image } from 'react-datocms'

import CardReference from '../../components/card-reference'
import Layout from '../../components/layout/layout'
import Section from '../../components/section'
import Title from '../../components/title'
import SliderComponent from '../../components/slider'
import PaginationComponent from '../../components/pagination'

export const References = ({ references, regies }) => {
  const { t } = useTranslation('references')
  const [activePage, setActivePage] = useState(1)
  const [refPaginated, setRefPaginated] = useState([])

  useEffect(() => {
    const referencesByPage = () => {
      let array = []
      references.forEach((el, i) => {
        if (i % 6 === 0) {
          array.push(references.slice(i, i + 6))
        }
      })
      array.length != 0 ? setRefPaginated(array[activePage - 1]) : setRefPaginated([])
    }
    referencesByPage()
    window.scrollTo(0, 0)
  }, [activePage, references])

  return (
    <Layout>
      <Section>
        <Title title={t('realisations.title')} subtitle={t('realisations.subtitle')} />
        <div className='row row-cols-md-3 mt-6'>
          <CardReference config={refPaginated} />
        </div>
        <div className='text-center'>
          <PaginationComponent data={references} current={activePage} onChange={setActivePage} />
        </div>
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
  return {
    props: { references, regies }
  }
}
