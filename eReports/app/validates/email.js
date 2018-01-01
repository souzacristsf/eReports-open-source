module.exports = app => {
    const Email = app.models.email
    const ValidatorId = app.helps.validator_id
    return {
        create: (req, res, next) => {
            req.assert('to', 'to is required').notEmpty().isEmail()
            req.assert('from', 'from is required').notEmpty().isEmail()
            req.assert('service', 'service is required').notEmpty()
            req.assert('password', 'password is required').notEmpty()

            const errors = req.validationErrors()
            errors ? res.status(400).json(errors) : next()
        },
        listOne: (req, res, next) => {
            ValidatorId(req.params._id) ? next() : res.status(400).json({ error: 'paramns _id invalid!' })
        },
        update: (req, res, next) => {
            req.assert('to', 'to is required').notEmpty().isEmail()
            req.assert('from', 'from is required').notEmpty().isEmail()
            req.assert('service', 'service is required').notEmpty()
            req.assert('password', 'password is required').notEmpty()

            const errors = req.validationErrors()

            if (errors) {
                return res.status(400).json(errors)
            } else if (!Number.isInteger(parseInt(req.params._id))) {
                return res.status(400).json({ error: 'paramns _id invalid!' })
            } else {
                next()
            }
        },
        delete: (req, res, next) => {
            Number.isInteger(parseInt(req.params._id)) ? next() : res.status(400).json({ error: 'paramns _id invalid!' })
        },
        unique: (req, res, next)=>{
			const query = {
                $and: [ { to: req.body.to.trim() }, { from: req.body.from.trim() }, { service: req.body.service.trim() } ]
			}
			Email.findOne(query)
			.then(data => data ? res.status(409).json({success: false, type: 'danger', msg: 'Dados do Driver, Database e User já estão cadastrados. :)', data: new Date(), title:'Status do Cadastro'}) : next()) 
			.catch(err => res.status(500).json({success: false, type: 'danger', msg: err , data: new Date().now , title:'Status do Cadastro'}))
		},
        uniqueId: (req, res, next)=>{
			const query = {
                _id: { $ne: req.body._id},
                $and: [ { to: req.body.to.trim() }, { from: req.body.from.trim() }, { service: req.body.service.trim() } ]
			}
			Email.findOne(query)
			.then(data => data ? res.status(409).json({success: false, type: 'danger', msg: 'Dados já estão cadastrados. :)', data: new Date(), title:'Status do Cadastro'}) : next()) 
			.catch(err => res.status(500).json({success: false, type: 'danger', msg: err , data: new Date().now , title:'Status do Cadastro'}))
		}
    }
}
