module.exports = app => {
    const User = app.models.user
    const ValidatorId = app.helps.validator_id
    return {
        create: (req, res, next) => {
            req.assert('username', 'username is required').notEmpty().len(5, 20)
            req.assert('password', '6 to 20 characters required').notEmpty().len(6, 20)
            req.assert('email', 'email description is required').notEmpty().isEmail()
            req.assert('fullname', 'fullname is required').notEmpty()

            const errors = req.validationErrors()
            errors ? res.status(400).json(errors) : next()
        },
        createSocialUser: (req, res, next) => {
            req.assert('login', 'login 5 to 20 characters is required').len(5, 20)
            req.assert('password', '6 to 20 characters required').len(6, 20)
            req.assert('email', 'email description is required').isEmail()

            const errors = req.validationErrors()
            errors ? res.status(400).json(errors) : next()
        },
        listOne: (req, res, next) => {
            ValidatorId(req.params._id) ? next() : res.status(400).json({ error: 'paramns _id invalid!' })
        },
        update: (req, res, next) => {
            req.assert('login', 'login description is required').notEmpty()
            req.assert('email', 'email description is required').isEmail()
            req.assert('person.fullName', 'fullName description is required').notEmpty()
            req.assert('person.birthDate', 'birthDate 10 characters is required').notEmpty().len(10)
            req.assert('person.gender', 'gender is required').notEmpty()
            req.assert('person.phones.phone_cell', 'phone cell 10 to 11 characters is required').notEmpty().len(10, 11)

            const errors = req.validationErrors()

            if (errors) {
                return res.status(400).json(errors)
            } else if (!ValidatorId(req.params._id)) {
                return res.status(400).json({ error: 'paramns _id invalid!' })
            } else {
                next()
            }
        },
        delete: (req, res, next) => {
            ValidatorId(req.params._id) ? next() : res.status(400).json({ error: 'paramns _id invalid!' })
        },
        unique: (req, res, next) => {
            const query = {
                $or: [{ login: req.body.username.trim() }, { email: req.body.email.trim() }]
            }
            User.findOne(query)
                .then(user => {
                    if (user) {
                        if (user.login === req.body.login) {
                            res.status(409).json({ param: 'login', msg: 'user login exists' })
                        } else {
                            res.status(409).json({ param: 'email', msg: 'email login exists' })
                        }
                    } else {
                        next()
                    }
                })
                .catch(err => res.status(500).json(err))
        }
    }
}
