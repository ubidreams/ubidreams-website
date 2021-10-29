import { htmlBody } from './mail-html'

//https://nodemailer.com/usage/
//https://vercel.com/support/articles/serverless-functions-and-smtp
export default async function handler(req, res) {
  let nodemailer = require('nodemailer')

  const mailData = {
    from: process.env.MAIL_SMTP_SENDER,
    to: process.env.MAIL_SMTP_RECIPIENT,
    replyTo: req.body.email,
    subject: `${req.body.object}`,
    text: req.body.message + ' | Envoyé par : ' + req.body.email + ' - ' + req.body.email + ' - ' + req.body.company,
    html: htmlBody(req.body.name, req.body.email, req.body.message, req.body.object, req.body.company)
  }

  //Si le captcha n'existe pas (malgré la vérification en front) alors erreur 400
  if (!req.body.captcha) {
    return res.status(422).send('CAPTCHA NOT EXIST')
  }

  try {
    //j'envoie la valeur du captcha pour vérification
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.body.captcha}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        method: 'POST'
      }
    )
    const captchaValidation = await response.json()

    //Si le captcha est validé alors je lance le processus d'envoie de mail via nodemailer
    if (captchaValidation.success) {
      const transporter = nodemailer.createTransport({
        port: 587,
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.MAIL_SMTP_SENDER,
          pass: process.env.PASSWORD_SMTP_SENDER
        }
      })

      //En fonction du succès ou de l'échec de l'envoi, je renvoie le statut adapté
      transporter.sendMail(mailData, function (error) {
        if (error) {
          return res.status(500).send(error)
        } else {
          return res.status(200).send('SENT')
        }
      })
    } else {
      //le captcha n'a pas été validé
      return res.status(422).send('INVALID CAPTCHA')
    }
  } catch (e) {
    //La requête de test du captcha ne fonctionne pas
    return res.status(400).send('REQUEST ERROR')
  }
}
