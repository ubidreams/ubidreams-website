import { useCallback, useState, useEffect } from 'react'
import { getBlog } from '../../lib/api'
import useTranslation from 'next-translate/useTranslation'
import { size, forEach, filter, includes } from 'lodash'

import Layout from '../../components/layout/layout'
import Section from '../../components/section'
import Title from '../../components/title'
import Link from 'next/link'
import CardArticle from '../../components/card-article'
import PaginationComponent from '../../components/pagination'

export const Blog = ({ posts, tags, locale }) => {
  const { t } = useTranslation('blog')
  const [activeTag, setActiveTag] = useState(null)
  const [visiblePosts, setVisiblePosts] = useState(posts)
  const [searchValue, setSearchValue] = useState('')
  const [activePage, setActivePage] = useState(1)
  const [postsPaginated, setPostsPaginated] = useState([])

  /* Gestion event : clique sur un tag afin de filtrer la recherche
    param : tag sélectionné
    action : vide la searchbar, filtre les posts et retourne ceux affiliés au tag, réinitialise la page active à 1
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

  useEffect(() => {
    const postsByPage = () => {
      let array = []
      visiblePosts.forEach((el, i) => {
        if (i % 6 === 0) {
          array.push(visiblePosts.slice(i, i + 6))
        }
      })
      array.length != 0 ? setPostsPaginated(array[activePage - 1]) : setPostsPaginated([])
    }
    postsByPage()
    window.scrollTo(0, 0)
  }, [activePage, visiblePosts])

  return (
    <Layout>
      <Section>
        <Title className='text-gray-800' title={t('blog.title')} subtitle={t('blog.subtitle')} />
        <div className='my-8'>
          <div>
            <form className='mb-4 search-bar'>
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
            <button className='border-0 pe-1 bg-white me-2 mb-1' onClick={cleanSearch}>
              <span className='h6 text-uppercase'>
                <i className='fe fe-x'></i>
              </span>
            </button>
          </nav>
        </div>
        <div className='row row-cols-md-3 mt-6'>
          {visiblePosts.length === 0 ? (
            <p className='w-100 text-center text-muted'>{t('blog.noResult')}</p>
          ) : (
            <CardArticle config={postsPaginated} locale={locale} />
          )}
        </div>
        <div className='text-center'>
          <PaginationComponent data={visiblePosts} current={activePage} onChange={setActivePage} />
        </div>
      </Section>
    </Layout>
  )
}

export default Blog

export async function getStaticProps({ preview, locale }) {
  const blog = (await getBlog(preview, locale)) || []
  const posts = blog.allPosts
  const tags = blog.allTags

  return {
    props: { posts, tags, locale }
  }
}
