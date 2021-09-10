import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'

export const Breadcrumb = ({ router, lastLink }) => {
  const { t } = useTranslation('common')
  const linkPath = router.asPath.split('/')
  linkPath.shift()
  if (lastLink) linkPath.pop()

  const pathArray = linkPath.map((key) => {
    return { key: t(`header.expertise.items.${key}.name`), href: t(`header.expertise.items.${key}.path`) }
  })

  return (
    <div className='ms-md-11 d-none d-sm-block'>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link href={t('header.home.path')}>
              <a>{t('header.home.name')}</a>
            </Link>
          </li>
          {pathArray.map((item, index) => {
            return (
              <li
                key={index}
                className={`breadcrumb-item ${index === pathArray.length - 1 && !lastLink ? 'active' : ''}`}
                aria-current='page'
              >
                <Link href={item.href}>
                  <a>{item.key}</a>
                </Link>
              </li>
            )
          })}
          {lastLink && (
            <li className='breadcrumb-item active disabled' aria-current='page'>
              <span className='disabled'>{lastLink.name}</span>
            </li>
          )}
        </ol>
      </nav>
    </div>
  )
}

export default Breadcrumb
