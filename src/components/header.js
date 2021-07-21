import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Ubidreams, French, English } from '../config/StaticImagesExport.js'

const Header = () => {
  const [lang, setLang] = useState('Fr')
  /**
   * Recupération de la langue sélectionnée
   */
  const handleChangeLanguage = ({ target: { value } }) => {
    setLang(value)
  }

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
            aria-label='Toggle navigation'
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
              aria-label='Toggle navigation'
            >
              <i className='fe fe-x' />
            </button>
            <ul className='navbar-nav mx-auto'>
              <MenuLink type='nav-item' href='/' name='Accueil' />
              <li className='nav-item dropdown'>
                <a
                  className='nav-link dropdown-toggle'
                  id='navbarDarkDropdownMenuLink'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  Expertise
                </a>
                <ul className='dropdown-menu' aria-labelledby='navbarDarkDropdownMenuLink'>
                  <MenuLink type='dropdown-item' href='/' name='Développement web et mobile' />
                  <MenuLink type='dropdown-item' href='/' name='IOT Objets connectés' />
                  <MenuLink type='dropdown-item' href='/' name='Conseils et Audit' />
                  <MenuLink type='dropdown-item' href='/' name='Design UI/UX et ergonomie' />
                  <div className='dropdown-divider' />
                  <MenuLink type='dropdown-item' href='/' name='Toutes nos Expertises' />
                </ul>
              </li>
              <MenuLink type='nav-item' href='/' name="L'agence" />
              <MenuLink type='nav-item' href='/' name='Références' />
              <MenuLink type='nav-item' href='/' name='Blog' />
              <MenuLink type='nav-item' href='/' name='Contact' />
            </ul>
            {/* Bouton fr/eng */}
            <form>
              <div className='d-flex align-items-center'>
                <div className='d-flex avatar align-items-center rounded-circle'>
                  <Image src={lang === 'Fr' ? French : English} className='avatar-img rounded-circle' />
                </div>
                <select
                  id='language'
                  className='form-control form-select form-control-sm border-0'
                  onChange={handleChangeLanguage}
                >
                  <option value='Fr'>Français</option>
                  <option value='En'>Anglais</option>
                </select>
              </div>
            </form>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header

const MenuLink = ({ type, href, name }) => {
  return (
    <li className={type}>
      <Link href={href}>
        <a className='nav-link'>{name}</a>
      </Link>
    </li>
  )
}
