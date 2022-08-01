// External Librairies
import { useState, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'

// Data
import { getAllReferences, getAllRegies } from '../../lib/request/reference.js'

// Components
import CardReference from '../../components/card-reference'
import Section from '../../components/section'
import Title from '../../components/title'
import SliderComponent from '../../components/slider'
import PaginationComponent from '../../components/pagination'
import SlidItemPartner from '../../components/slide-item-partner'
import Helmet from '../../components/layout/helmet-seo'

/**
 * PAGE référence (liste avec pagination)
 * @param references résultats de la requête : getAllReferences
 * @param regies résultats de la requête : getAllRegies
 * @param locale locale active
 */
export const References = ({ references, regies, locale }) => {
  // Initialisation de la page
  const router = useRouter()
  const { t } = useTranslation('references')
  const metatags = { ...t('seo', {}, { returnObjects: true }) }
  // Etat de la page (pagination)
  const [activePage, setActivePage] = useState(1)
  const [refPaginated, setRefPaginated] = useState([])

  // Gestion locale de la pagination
  useEffect(() => {
    const referencesByPage = () => {
      // Je groupe dans un tableau des tableaux de 6 références à afficher
      let array = []
      references.forEach((el, i) => {
        if (i % 6 === 0) {
          array.push(references.slice(i, i + 6))
        }
      })
      /**
       * [
       *    (page 1 - index 0) [{}, {}, {}, {}, {}, {}],
       *    (page 2 - index 1) [{}, {}, {}, {}, {}, {}],
       *    (page 3 - index 2) [{}, {}, {}, {}, {}, {}]
       * ]
       */
      // Si le tableau est plein, alors je sélectionne dans mon tableau les références correspondantes à la page active
      array.length != 0 ? setRefPaginated(array[activePage - 1]) : setRefPaginated([])
    }
    referencesByPage()
    // Je scrolle en haut de la page
    window.scrollTo(0, 0)
  }, [activePage, references])

  return (
    <Helmet metatags={metatags} router={router}>
      {/* Présentation References */}
      <Section>
        <Title title={t('realisations.title')} subtitle={t('realisations.subtitle')} />
        <div className='row row-cols-md-3 mt-6'>
          <CardReference config={refPaginated} locale={locale} />
        </div>
        <div className='text-center'>
          <PaginationComponent data={references} current={activePage} onChange={setActivePage} />
        </div>
      </Section>
      {/* Présentation Regies dans un slider */}
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
    </Helmet>
  )
}

export default References

/**
 * Fonction asynchrone Next JS => Next.js will pre-render this page at build time using the props returned by getStaticProps.
 * @param preview booléen qui permet de gérer la preview (nous gérons cela au niveau du déploiement donc nous laissons à false)
 * @param locale locale active du site
 */
export async function getStaticProps({ preview, locale }) {
  const references = (await getAllReferences(preview, locale)) || []
  const regies = (await getAllRegies(preview, locale)) || []

  // Nous renvoyons les données sous forme de props à la page
  return {
    props: { references, regies, locale }
  }
}
