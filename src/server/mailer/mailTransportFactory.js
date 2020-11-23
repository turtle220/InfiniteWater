import mgTransport from 'nodemailer-mailgun-transport'

// eslint-disable-next-line camelcase
export default ({transport, mailgun_api_key, mailgun_domain}) => {
  console.log(transport)
  switch (transport.toLowerCase()) {
    case 'mailgun':
      return mgTransport({
        auth: {
          api_key: mailgun_api_key, // process.env.MAILGUN_KEY,
          domain: mailgun_domain // process.env.MAILGUN_DOMAIN
        }
      })
    default:
      throw Error(`Mail Transport '${process.env.MAIL_TRANSPORT}' not suuported`)
  }
}
