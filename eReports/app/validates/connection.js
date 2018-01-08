module.exports = app => {
    const Connection = app.models.connection
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
         testeConect: (req, res, next) => {
            req.assert('connectString', 'connectString is required').notEmpty()
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
            ValidatorId(req.params.connect_id) ? next() : res.status(400).json({ error: 'paramns connect_id invalid!' })
        },
        update: (req, res, next) => {
            req.assert('connectString', 'connectString is required').notEmpty()
            req.assert('descrConect', 'descrConect is required').notEmpty()
            req.assert('driver', 'driver is required').notEmpty()
            req.assert('nameConect', 'nameConect is required').notEmpty()
            req.assert('user', 'user is required').notEmpty()

            const errors = req.validationErrors()

            if (errors) {
                return res.status(400).json(errors)
            } else if (!Number.isInteger(parseInt(req.params.connect_id))) {
                return res.status(400).json({ error: 'paramns connect_id invalid!' })
            } else {
                next()
            }
        },
        delete: (req, res, next) => {
            Number.isInteger(parseInt(req.params.connect_id)) ? next() : res.status(400).json({ error: 'paramns connect_id invalid!' })
        },
        unique: (req, res, next)=>{
			const query = {
                $and: [ { driver: req.body.driver.trim() }, { connectString: req.body.connectString.trim() }, { user: req.body.user.trim() } ]
			}
			Connection.findOne(query)
			.then(data => data ? res.status(409).json({success: false, type: 'danger', msg: 'Dados do Driver, Database e User já estão cadastrados. :)', data: new Date(), title:'Status do Cadastro'}) : next()) 
			.catch(err => res.status(500).json({success: false, type: 'danger', msg: err , data: new Date().now , title:'Status do Cadastro'}))
		},
        uniqueId: (req, res, next)=>{
			const query = {
                connect_id: { $ne: req.body.connect_id},
                $and: [ { driver: req.body.driver.trim() }, { connectString: req.body.connectString.trim() }, { user: req.body.user.trim() } ]
			}
			Connection.findOne(query)
			.then(data => data ? res.status(409).json({success: false, type: 'danger', msg: 'Dados do Driver, Database e User já estão cadastrados. :)', data: new Date(), title:'Status do Cadastro'}) : next()) 
			.catch(err => res.status(500).json({success: false, type: 'danger', msg: err , data: new Date().now , title:'Status do Cadastro'}))
		}
    }
}
