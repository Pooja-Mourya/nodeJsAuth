import dotenv from 'dotenv'
dotenv.config()
import nodeMailer from 'nodemailer'

const transporter = nodeMailer.createTransport({
  host: process.env.SMPT_HOST,
  port: 465,
  auth: {
    user: process.env.SMPT_USER,
    pass: process.env.SMPT_PASSWORD,
  },
})

//   const mailOptions = {
// from: process.env.SMPT_USER,
// to: options.email,
// subject: options.subject,
// text: options.message,
//   }

//   await transporter.sendMail(mailOptions)
