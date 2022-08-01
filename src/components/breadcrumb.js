// External Librairies
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'

/**
  BREADCRUMB : fil d'Arianne, arborescence d'une page
  Ce composant permet de connaitre l'arborescence conduisant à une page.
  Chaque page de l'arborescence est un lien permettant de remonter les pages parentes de la page actuelle.
    @param router objet router issu de next/router donne accès aux informations de navigation (history, path, url) et à des fonctions de navigation
    @param lastlink objet contenant le path et le titre de la page
*/
export const Breadcrumb = ({ router, lastLink }) => {
  // Initialisation de l'état du composant
  const { t } = useTranslation('common')

  // je transforme mon chemin d'url en tableau pour isoler les clés d'url (morceau d'url entre chaque /)
  const linkPath = router.asPath.split('/')
  linkPath.shift()
  // si le dernier lien est passé en props je le supprime de mon tableau
  if (lastLink) linkPath.pop()

  // Grâce à mon tableau de clé je reconstruis un tableau d'objet contenant le titre de la page et le lien associé.
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
          {/* Je boucle sur mon tableau pour afficher les liens du breadcrumb */}
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
          {/* Le dernier lien est isolé avec un affichage spécial puisqu'il s'agit de la page actuelle, le lien est disabled */}
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
