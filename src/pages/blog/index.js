// External Librairies
import { useCallback, useState, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { forEach, filter, includes, uniqWith, isEqual } from 'lodash'
import { useRouter } from 'next/router'
import Link from 'next/link'

// Data
import { getBlog } from '../../lib/request/blog.js'

// Components
import Section from '../../components/section'
import Title from '../../components/title'
import CardArticle from '../../components/card-article'
import PaginationComponent from '../../components/pagination'
import Helmet from '../../components/layout/helmet-seo'

/**
 * PAGE blog (liste avec pagination)
 * @param posts résultats de la requête : getBlog
 * @param tags résultats de la requête : getBlog
 * @param locale locale active
 */
export const Blog = ({ posts, tags, locale }) => {
  // Initialisation de la page
  const router = useRouter()
  const { t } = useTranslation('blog')
  const metatags = { ...t('seo', {}, { returnObjects: true }) }
  // Instanciation de l'état de la page
  const [activeTag, setActiveTag] = useState(null)
  const [visiblePosts, setVisiblePosts] = useState(posts)
  const [searchValue, setSearchValue] = useState('')
  const [activePage, setActivePage] = useState(1)
  const [postsPaginated, setPostsPaginated] = useState([])

  /* Gestion event : clique sur un tag afin de filtrer la recherche
    param : tag sélectionné
    handleTagClicked : vide la searchbar, filtre les posts et retourne ceux affiliés au tag, réinitialise la page active à 1
  */
  const handleTagClicked = useCallback(
    (activeTag) => {
      if (searchValue) setSearchValue('')
      setActiveTag(activeTag)

      let newVisiblePostsArray = []
      forEach(posts, (post) => {
        if (post.tags.name === activeTag) {
          newVisiblePostsArray.push(post)
        }
      })

      setActivePage(1)
      setVisiblePosts(newVisiblePostsArray)
    },
    [posts, searchValue]
  )

  /* Gestion event : validation du champ de recherche
    param : event
    action : filtre les posts et retourne ceux dont le titre match la recherche, réinitialise la page active à 1
  */
  const handleSearchValue = (e) => {
    e.preventDefault()
    const newVisiblePostsArray = filter(posts, (post) => includes(post.title.toLowerCase(), searchValue.toLowerCase()))

    setActivePage(1)
    setVisiblePosts(newVisiblePostsArray)
  }

  /* Gestion event : changement de la valeur de la recherche
    param : valeur saisie
    action : réinitialise les filtres par tag, stock la valeur saisie dans un state
  */
  const handleChangeSearchValue = useCallback(({ target: { value } }) => {
    setActiveTag(null)
    setSearchValue(value)
  }, [])

  /* Gestion event : réinitialisation de la recherche
    action : réinitialise les filtres par tag, vide la searchbar
  */
  const cleanSearch = useCallback(() => {
    setActiveTag(null)
    setSearchValue('')
    setVisiblePosts(posts)
  }, [posts])

  // Gestion locale de la pagination
  useEffect(() => {
    const postsByPage = () => {
      // Je groupe dans un tableau des tableaux de 6 articles à afficher
      let array = []
      visiblePosts.forEach((el, i) => {
        if (i % 6 === 0) {
          array.push(visiblePosts.slice(i, i + 6))
        }
      })
      /**
       * [
       *    (page 1 - index 0) [{}, {}, {}, {}, {}, {}],
       *    (page 2 - index 1) [{}, {}, {}, {}, {}, {}],
       *    (page 3 - index 2) [{}, {}, {}, {}, {}, {}]
       * ]
       */
      // Si le tableau est plein, alors je sélectionne dans mon tableau les articles correspondants à la page active
      array.length != 0 ? setPostsPaginated(array[activePage - 1]) : setPostsPaginated([])
    }
    postsByPage()
    window.scrollTo(0, 0)
  }, [activePage, visiblePosts])

  return (
    <Helmet metatags={metatags} router={router}>
      <Section>
        <Title title={t('blog.title')} subtitle={t('blog.subtitle')} />
        <div className='my-8'>
          <div>
            <form className='mb-4 search-bar'>
              {/* Searchbar*/}
              <div className='rounded input-group input-group-lg border border-gray-300'>
                {searchValue.length === 0 && (
                  <div className='input-group-text border-0 pe-1'>
                    <i className='fe fe-search' />
                  </div>
                )}
                {searchValue.length > 0 && (
                  <span className='input-group-text border-0 pe-1' onClick={cleanSearch}>
                    <i className='fe fe-x' />
                  </span>
                )}
                <input
                  type='text'
                  className='form-control border-0 px-1'
                  aria-label={t('blog.search.placeholder')}
                  placeholder={t('blog.search.placeholder')}
                  onChange={handleChangeSearchValue}
                  value={searchValue}
                />
                <span className='input-group-text border-0 py-0 ps-1 pe-3'>
                  <button type='submit' className='btn btn-sm btn-blue' onClick={handleSearchValue}>
                    {t('blog.search.button')}
                  </button>
                </span>
              </div>
            </form>
          </div>
          {/* Tags permettant de filtrer la recherche */}
          <nav className='nav justify-content-center'>
            {tags.map((tag, index) => {
              return (
                <Link key={index} href='/blog' shallow>
                  <a
                    className={`badge bg-green-soft me-2 mb-1 ${tag.name === activeTag ? 'active' : ''}`}
                    onClick={() => handleTagClicked(tag.name)}
                  >
                    <span className='h6 text-uppercase'>{tag.name}</span>
                  </a>
                </Link>
              )
            })}
            {/* Le tag actif prend une apparence différente et nous pouvons supprimer le filtre */}
            {activeTag && (
              <button className='border-0 pe-1 bg-white me-2 mb-1' onClick={cleanSearch}>
                <span className='h6 text-uppercase'>
                  <i className='fe fe-x'></i>
                </span>
              </button>
            )}
          </nav>
        </div>
        {/* A partir du tableau des articles filtrés j'affiche la liste */}
        <div className='row row-cols-md-3 mt-6'>
          {visiblePosts.length === 0 ? (
            <p className='w-100 text-center text-muted'>{t('blog.noResult')}</p>
          ) : (
            <CardArticle config={postsPaginated} locale={locale} />
          )}
        </div>
        {/* Pagination */}
        <div className='text-center'>
          <PaginationComponent data={visiblePosts} current={activePage} onChange={setActivePage} />
        </div>
      </Section>
    </Helmet>
  )
}

export default Blog

/**
 * Fonction asynchrone Next JS => Next.js will pre-render this page at build time using the props returned by getStaticProps.
 * @param preview booléen qui permet de gérer la preview (nous gérons cela au niveau du déploiement donc nous laissons à false)
 * @param locale locale active du site
 */
export async function getStaticProps({ preview, locale }) {
  const blog = (await getBlog(preview, locale)) || []
  const posts = blog.allPosts

  // Je récupère les tags à partir de la requête
  const taglist = () => {
    let tag = posts.map((post) => {
      return post.tags
    })
    return uniqWith(tag, isEqual)
  }

  const tags = taglist()

  // Nous renvoyons les données sous forme de props à la page
  return {
    props: { posts, tags, locale }
  }
}
