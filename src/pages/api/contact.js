import { htmlBody } from './mail-html'

//https://nodemailer.com/usage/
//https://vercel.com/support/articles/serverless-functions-and-smtp
export default async function handler(req, res) {
  let nodemailer = require('nodemailer')

  const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.MAIL_SMTP_SENDER,
      pass: process.env.PASSWORD_SMTP_SENDER
    },
    secure: true
  })

  const mailData = {
    from: process.env.MAIL_SMTP_SENDER,
    to: process.env.MAIL_SMTP_RECIPIENT,
    replyTo: req.body.email,
    subject: `${req.body.object}`,
    text: req.body.message + ' | Envoyé par : ' + req.body.email + ' - ' + req.body.email,
    html: htmlBody(req.body.name, req.body.email, req.body.message, req.body.object)
  }

  transporter.sendMail(mailData, function (error, info) {
    if (error) {
      res.status(500).end()
    } else {
      res.status(200).end()
    }
  })
}
