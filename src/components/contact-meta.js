/**
 CONTACT META : bandeau d'entête de la page contact avec les coordonnées
 Permet d'afficher un ensemble de données comme la localisation, le mail, le numéro de téléphone
 @param title string issue des clés de traduction statique
 @param content string renseignée dans DATOCMS
 */
export const ContactMeta = ({ title = '', content = '' }) => {
  return (
    <div className='text-center border-end-md border-gray-800'>
      <h6 className='text-uppercase mb-1'>{title}</h6>

      <div className='mb-5 mb-md-0'>
        <div className='h4'>{content}</div>
      </div>
    </div>
  )
}

export default ContactMeta
