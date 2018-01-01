module.exports = app => {
    const Email = app.models.email
    const Help = app.helps.crud
    const pluck = require('./pluck')     

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
                select: '-password'
            }

            Help.listAll(Email, query, mod, res)
        },
        listOne: (req, res) => {
            const query = req.params
            const mod = {password: 0}

            Help.listOne(Email, query, mod, res)
        }
    }
}
