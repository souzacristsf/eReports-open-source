module.exports = app => {
	const CategoryReport = app.models.categoryReport;
	const ValidatorId = app.helps.validator_id
	return {
		create: (req, res, next) => {
			req.assert('name', 'name is required').notEmpty()
			req.assert('ruleUpdate', 'ruleUpdate is required').notEmpty()
			
			const errors = req.validationErrors()
			errors ? res.status(400).json(errors) : next()
		},
		listOne: (req, res, next) => {
			ValidatorId(req.params._id) ? next() : res.status(400).json({ error: 'paramns _id invalid!' })
		},
		update: (req, res, next) => {
			req.assert('name', 'name is required').notEmpty()
			req.assert('ruleUpdate', 'ruleUpdate is required').isEmail()

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
				name: req.body.name
			}
			CategoryReport.findOne(query)
				.then(category => {

					if (category) {
						res.status(409).json({ param: 'name', msg: 'category exists' })
					} else {
						next();
					}
				})
				.catch(err => res.status(500).json(err))
		}
	}
}
