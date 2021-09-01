import { Image } from 'react-datocms'
import ReactHtmlParser from 'react-html-parser'

export const CardArticle = ({ config = {}, locale }) => {
  return config.map((post, index) => {
    const dateFormatted = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' }).format(
      new Date(post.date)
    )
    return (
      <div key={index} className='mb-6'>
        <a className='card shadow-light-lg lift lift-lg h-100 custom-card-link' href={`/blog/${post.slug}`}>
          <div className='card-img-top'>
            <Image
              alt=''
              data={{
                ...post.heroCover.responsiveImage
              }}
              className='card-img-top bg-grey-blue'
              style={{ height: '200px' }}
            />
            <div className='position-relative'>
              <div className='shape shape-bottom shape-fluid-x text-white'>
                <svg viewBox='0 0 2880 480' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M2160 0C1440 240 720 240 720 240H0v240h2880V0h-720z'
                    fill='currentColor'
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className='card-body' href='#!'>
            <h3>{post.title}</h3>

            <div className='mb-0 text-muted'>{ReactHtmlParser(post.content.substr(0, 100) + '...')}</div>
          </div>

          <div className='card-meta mt-auto' href='#!'>
            <hr className='card-meta-divider' />

            <h6 className='text-uppercase text-muted me-2 mb-0'>{post.author.name}</h6>

            <p className='h6 text-uppercase text-muted mb-0 ms-auto'>
              <time dateTime={dateFormatted}>{dateFormatted}</time>
            </p>
          </div>
        </a>
      </div>
    )
  })
}

export default CardArticle
