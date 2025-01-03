import nodemailer from 'nodemailer'

export default class MailSender {
  //   email: string
  //   password: string
  transporter: any

  constructor () {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL,
        pass: process.env.APPLICATION_PASSWORD
      }
    })
  }

  sendMail (targetEmail: string, verCode: string) {
    const mailOptions = {
      to: targetEmail,
      subject: 'Verification Code',
      text: verCode
    }
    this.transporter.sendMail(mailOptions)
  }
}
