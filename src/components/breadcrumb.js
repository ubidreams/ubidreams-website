import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'

export const Breadcrumb = ({ router }) => {
  const { t } = useTranslation('common')
  const linkPath = router.pathname.split('/')
  linkPath.shift()
  const pathArray = linkPath.map((key) => {
    return { key: t(`header.expertise.${key}.name`), href: t(`header.expertise.${key}.path`) }
  })

  return (
    <div className='ms-md-11 d-none d-sm-block'>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb breadcrumb-scroll'>
          <li className='breadcrumb-item'>
            <Link href={t('header.home.path')}>
              <a>{t('header.home.name')}</a>
            </Link>
          </li>
          {pathArray.map((item, index) => {
            return (
              <li
                key={index}
                className={`breadcrumb-item ${index === pathArray.length - 1 ? 'active' : ''}`}
                aria-current='page'
              >
                <Link href={item.href}>
                  <a>{item.key}</a>
                </Link>
              </li>
            )
          })}
        </ol>
      </nav>
    </div>
  )
}

export default Breadcrumb
