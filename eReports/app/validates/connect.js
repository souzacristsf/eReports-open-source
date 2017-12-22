module.exports = app => {
    const Connect = app.models.connect
    const ValidatorId = app.helps.validator_id
    return {
        create: (req, res, next) => {
            req.assert('connectString', 'connectString is required').notEmpty()
            req.assert('descrConect', 'descrConect is required').notEmpty()
            req.assert('driver', 'driver is required').notEmpty()
            req.assert('nameConect', 'nameConect is required').notEmpty()
            req.assert('user', 'user is required').notEmpty()
            req.assert('password', 'password is required').notEmpty()

            const errors = req.validationErrors()
            errors ? res.status(400).json(errors) : next()
        },
        createSocialUser: (req, res, next) => {
            req.assert('connectString', 'connectString is required').notEmpty()
            req.assert('descrConect', 'descrConect is required').notEmpty()
            req.assert('driver', 'driver is required').notEmpty()
            req.assert('nameConect', 'nameConect is required').notEmpty()
            req.assert('user', 'user is required').notEmpty()
            req.assert('password', 'password is required').notEmpty()

            const errors = req.validationErrors()
            errors ? res.status(400).json(errors) : next()
        },
        listOne: (req, res, next) => {
            ValidatorId(req.params._id) ? next() : res.status(400).json({ error: 'paramns _id invalid!' })
        },
        update: (req, res, next) => {
            req.assert('connectString', 'connectString is required').notEmpty()
            req.assert('descrConect', 'descrConect is required').notEmpty()
            req.assert('driver', 'driver is required').notEmpty()
            req.assert('nameConect', 'nameConect is required').notEmpty()
            req.assert('user', 'user is required').notEmpty()
            req.assert('password', 'password is required').notEmpty()

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
        unique: (req, res, next)=>{
			const query = {
                $and: [ { driver: req.body.driver.trim() }, { connectString: req.body.connectString.trim() }, { user: req.body.user.trim() } ]
			}
			Connect.findOne(query)
			.then(data => data ? res.status(400).json({success: false, type: 'danger', msg: 'Dados já cadastrados', data: 'Conexão já cadastrada!!!'}) : next()) 
			.catch(err => res.status(500).json({success: false, type: 'danger', msg: 'Conexão Falhou!!! :(', data: err}))
		}
    }
}
