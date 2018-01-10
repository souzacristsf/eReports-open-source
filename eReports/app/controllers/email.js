module.exports = app => {
    const Email = app.models.email
    const Help = app.helps.crud
    const pluck = require('./pluck')     

    return {
        create: (req, res) => {
            const email = new Email()

            const fields = pluck(app)(req.body, 'to', 'from', 'password', 'service')

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
            const mod = {password: 0}

            Help.listOne(Email, query, mod, res)
        },
        sendEmailTest: (req, res) => {
            const service = req.body.service
            const config = {
                to: req.body.to,
                user: req.body.from,
                from: req.body.from,
                assunto: 'eReports e-mail de teste :)',
                password: req.body.password
            }

            require(`../email/${service}`)(config, res, 'teste', '')
        }
    }
}
