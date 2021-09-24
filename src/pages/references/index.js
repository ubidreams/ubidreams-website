import { useState, useEffect } from 'react'
import { getAllReferences, getAllRegies } from '../../lib/api'
import useTranslation from 'next-translate/useTranslation'

import CardReference from '../../components/card-reference'
import Layout from '../../components/layout/layout'
import Section from '../../components/section'
import Title from '../../components/title'
import SliderComponent from '../../components/slider'
import PaginationComponent from '../../components/pagination'
import SlidItemPartner from '../../components/slide-item-partner'

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
      {/* Présentation References */}
      <Section>
        <Title title={t('realisations.title')} subtitle={t('realisations.subtitle')} />
        <div className='row row-cols-md-3 mt-6'>
          <CardReference config={refPaginated} />
        </div>
        <div className='text-center'>
          <PaginationComponent data={references} current={activePage} onChange={setActivePage} />
        </div>
      </Section>
      {/* Présentation Regies */}
      <Section>
        <Title title={t('regies.title')} subtitle={t('regies.subtitle')} />
      </Section>
      <SliderComponent
        className='center mt-14'
        showArrow={{ show: false, break1000: true }}
        option={{ slidesToShow: 4 }}
      >
        {regies.map((regie, index) => {
          return <SlidItemPartner key={index} config={regie} />
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
