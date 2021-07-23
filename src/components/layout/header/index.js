import Link from 'next/link'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import { map, isNil, isEmpty, defaultTo } from 'lodash'

import routes from './routes'

import { Ubidreams } from '../../../config/StaticImagesExport.js'

const MenuLink = ({ type, href, name }) => {
  return (
    <li className={type}>
      <Link href={href}>
        <a className='nav-link'>{name}</a>
      </Link>
    </li>
  )
}

const Header = () => {
  const { t } = useTranslation('common')
  return (
    <header>
      <nav className='navbar navbar-expand-lg navbar-light bg-white'>
        <div className='container-fluid'>
          {/* Lien home "Ubidreams" et bouton mobile */}
          <Link href='/'>
            <a className='navbar-brand d-flex'>
              <Image src={Ubidreams} alt='Logo Ubidreams' width={150} height={43} />
            </a>
          </Link>

          {/* button toggler */}
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarCollapse'
            aria-controls='navbarCollapse'
            aria-expanded='false'
          >
            <span className='navbar-toggler-icon' />
          </button>

          {/* Menu principal */}
          <div className='collapse navbar-collapse' id='navbarCollapse'>
            {/* button toggler */}
            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarCollapse'
              aria-controls='navbarCollapse'
              aria-expanded='false'
            >
              <i className='fe fe-x' />
            </button>
            <ul className='navbar-nav mx-auto'>
              {map(routes, (route) => {
                const isSubMenu = !isNil(route?.items) && !isEmpty(route?.items)

                return isSubMenu ? (
                  <li key={route?.key} className='nav-item dropdown'>
                    <a
                      className='nav-link dropdown-toggle'
                      id='subMenu'
                      role='button'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                    >
                      {t(`header.${route?.key}.title`)}
                    </a>

                    <ul className='dropdown-menu' aria-labelledby='subMenu'>
                      {map(defaultTo(route?.items, []), (item) => {
                        return (
                          <MenuLink
                            key={[route?.key, item?.key].join('/')}
                            type='dropdown-item'
                            href={route?.path}
                            name={t(`header.${route?.key}.${item?.key}`)}
                          />
                        )
                      })}
                    </ul>
                  </li>
                ) : (
                  <MenuLink key={route?.key} type='nav-item' href={route?.path} name={t(`header.${route?.key}`)} />
                )
              })}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
