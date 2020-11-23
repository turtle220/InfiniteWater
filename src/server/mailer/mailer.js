import nodemailer from 'nodemailer'
import mailTransportFactory from './mailTransportFactory'

export default class mailer {
  constructor (options) {
    this._transport = mailTransportFactory(options)
    this._mailer = nodemailer.createTransport(this._transport)
  }

    send = async (to, from, subject, html, text, options) => {
      await new Promise((resolve, reject) => {
        this._mailer.sendMail({
          from: from,
          to: to,
          subject: subject,
          html: html,
          text: text
        }, function (err, info) {
          if (err) {
            reject(err)
          } else {
            resolve(info)
          }
        })
      })
    }
}
