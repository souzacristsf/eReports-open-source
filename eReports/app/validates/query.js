module.exports = app => {
    const Query = app.models.query
    const ValidatorId = app.helps.validator_id
    return {
        create: (req, res, next) => {
            req.assert('name', 'name is required').notEmpty()
            req.assert('columns', 'columns is required').notEmpty()
            req.assert('database', 'database is required').notEmpty()
            req.assert('query', 'query is required').notEmpty()
            
            const errors = req.validationErrors()
            errors 
            ? res.status(400).json({success: false, type: 'danger', msg: errors, data: new Date(), title:'Status do Requisição'})
            : next()
        },
        listOne: (req, res, next) => {
            ValidatorId(req.params._id) 
            ? next() 
            : res.status(400).json({success: false, type: 'danger', msg: errors, data: new Date(), title:'Status do Requisição'})
        },

        runQuery: (req, res, next) => {
            req.assert('query', 'query is required').notEmpty()
            req.assert('connect_id', 'connect_id is required').notEmpty()

            const errors = req.validationErrors()
            
            if (errors) {
                return res.status(400).json({success: false, type: 'danger', msg: errors, data: new Date(), title:'Status do Requisição'})
            } else if (!Number.isInteger(parseInt(req.body.connect_id))) {
                return res.status(400).json({success: false, type: 'danger', msg: 'connect_id invalid!', data: new Date(), title:'Status do Requisição'})
            } else {
                next()
            }
        },
        update: (req, res, next) => {
            req.assert('name', 'name is required').notEmpty()
            req.assert('connect_id', 'connect_id is required').notEmpty().isInteger()
            
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
        }
        // unique: (req, res, next)=>{
		// 	const query = {
        //         $and: [ { to: req.body.query_id }, { from: req.body.from.trim() }, { service: req.body.service.trim() } ]
		// 	}
		// 	Query.findOne(query)
		// 	.then(data => data ? res.status(409).json({success: false, type: 'danger', msg: 'Dados do Driver, Database e User já estão cadastrados. :)', data: new Date(), title:'Status do Cadastro'}) : next()) 
		// 	.catch(err => res.status(500).json({success: false, type: 'danger', msg: err , data: new Date().now , title:'Status do Cadastro'}))
		// },
        // uniqueId: (req, res, next)=>{
		// 	const query = {
        //         _id: { $ne: req.body._id},
        //         $and: [ { to: req.body.to.trim() }, { from: req.body.from.trim() }, { service: req.body.service.trim() } ]
		// 	}
		// 	Query.findOne(query)
		// 	.then(data => data ? res.status(409).json({success: false, type: 'danger', msg: 'Dados já estão cadastrados. :)', data: new Date(), title:'Status do Cadastro'}) : next()) 
		// 	.catch(err => res.status(500).json({success: false, type: 'danger', msg: err , data: new Date().now , title:'Status do Cadastro'}))
		// }
    }
}
