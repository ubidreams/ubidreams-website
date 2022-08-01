/**
 * Template HTML de l'email de contact. Les données passées en props sont celles issues du formulaires
 */
export const htmlBody = (name, email, message, object, company) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
            body{visibility:hidden}
            h3 { text-align:center}
            #content-mail{
                margin: auto;
                width: 70%;
            }
            .align-center{
                text-align: center;
            }
        </style>
      </head>
      <body>
        <div id='content-mail'>
            <p class='align-center'><img src="https://www.datocms-assets.com/45470/1626703732-cropped-logo.png" width="172" height="49"/></p>
            <h3>Nouveau message sur Ubidreams : ${object}</h3>
            <div>
                <p><strong>Envoyé par : </strong>
                  ${name} | ${email}
                </p>
                <p><strong>Société : </strong>
                  ${company} 
                </p>
                <p><strong>Message :</strong></p>
                <p>${message}</p>
            </div>
        </div>
        
      </body>
    </html>
    `
}

export default htmlBody
