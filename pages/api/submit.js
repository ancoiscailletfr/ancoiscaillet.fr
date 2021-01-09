import nodemailer from 'nodemailer'
import moment from 'moment'

moment.locale('FR')

export default async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    secure: false,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS
    }
  })

  if (req.method === 'POST') {
    const { fullname, email, phone, message } = req.body

    const text = `
  --------------------------
  | Nom : ${fullname}
  | Email : ${email}
  | Téléphone: ${phone}
  | envoyer depuis: ancoiscaillet.fr
  | le: ${moment().format('LLLL')}
  --------------------------
  
${message}
    `

    const info = await transporter.sendMail({
      from: `"ancoiscaillet.fr" ${process.env.MAILER_USER}`, // from myself
      to: process.env.MAILER_TO, // to myself
      subject: `Message de ${fullname}`,
      text
    })

    res.json({
      message: `Message sent: ${info}`
    })
  } else {
    res.status(401).json({ message: 'unauthorized' })
  }
}
