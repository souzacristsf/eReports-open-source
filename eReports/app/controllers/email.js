module.exports = app => {
  const Email = app.models.email
  const Help = app.helps.crud
  const pluck = app.utils.pluck

  return {
    create: (req, res) => {
      const email = new Email()

      const fields = pluck(req.body, 'to', 'from', 'password', 'service')

      Object.assign(email, fields)

      Help.create(email, res)
    },
    update: (req, res) => {
      const query = {
        _id: req.params._id
      }
      const mod = req.body

      Help.update(Email, query, mod, res)
    },
    delete: (req, res) => {
      const query = req.params
    },
    listAll: (req, res) => {
      const query = {}
      const mod = {
        page: 1,
        limit: 10,
        select: '-__v, -_id'
      }

      Help.listAll(Email, query, mod, res)
    },
    listOne: (req, res) => {
      const query = req.params
      const mod = { password: 0 }

      Help.listOne(Email, query, mod, res)
    },
    sendEmailTest: (req, res) => {
      const service = req.body.service
      const config = {
        user: req.body.from,
        password: req.body.password
      }

      const mailer = require(`../modules/${service}`)(app)(config)
      const template = require('../resources/mail/test/test.js')
      const html = template()

      mailer
        .sendMail({
          to: req.body.to,
          from: req.body.from,
          subject: 'eReports e-mail de teste :)',
          html: html
        })
        .then(info => {
          mailer.close()
          res.status(200).json({
            success: true,
            type: 'success',
            msg: `E-mail enviado para ${info.envelope.to} :)`,
            data: new Date(),
            title: 'Status do Envio'
          })
        })
        .catch(err => {
          mailer.close()
          res.status(500).json({
            success: false,
            type: 'danger',
            msg: `Verifique e-mail e senha, ocorreu um erro: ${err.message} :)`,
            data: new Date(),
            title: 'Status do Envio'
          })
        })
    }
  }
}
