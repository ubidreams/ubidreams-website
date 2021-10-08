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
                const subMenu = route?.items
                if (!isEmpty(subMenu)) {
                  return (
                    <li key={route?.key} className='nav-item dropdown'>
                      <span
                        style={{ cursor: 'pointer' }}
                        className='nav-link dropdown-toggle d-flex align-items-center'
                        id='expertises'
                        data-bs-toggle='dropdown'
                        aria-expanded='false'
                      >
                        {t(`header.${route?.key}.name`)}
                        <span className='ps-2 fe fe-chevron-down'></span>
                      </span>
                      <ul className='dropdown-menu' aria-labelledby='expertises'>
                        {subMenu.map((subLink, index) => {
                          return (
                            <li key={index}>
                              <Link href={t(`header.${route?.key}.items.${subLink.key}.path`)}>
                                <a className='dropdown-item p-2 mx-4'>
                                  {t(`header.${route?.key}.items.${subLink.key}.name`)}
                                </a>
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </li>
                  )
                }
                return (
                  <MenuLink
                    key={route?.key}
                    type='nav-item'
                    href={t(`header.${route?.key}.path`)}
                    name={t(`header.${route?.key}.name`)}
                  />
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
