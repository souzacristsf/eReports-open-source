module.exports = app => {

	const CategoryReport = app.models.categoryReport;
	const Help = app.helps.crud

	const pass = require('../middleware/password')

	function configPass (v) {
		return pass.hash(v)
	}

	return {
		create: (req,res)=>{
			const categoryReport = new CategoryReport();

			categoryReport.name = req.body.name
			categoryReport.ruleUpdate = req.body.ruleUpdate

			Help.create(categoryReport, res)
		},

		update: (req, res)=> {
			const query = {
				_id: req.params._id
			}
			if(req.body.password) req.body.password = configPass(req.body.password)
				const mod = req.body

			Help.update(CategoryReport, query, mod, res)
		},
		delete: (req,res)=>{
			const query = req.params
		},
		listAll: (req,res)=>{
			const query = {}
			const mod = {
				page: 1,
				limit: 10,
				select: ''
			}

			Help.listAll(CategoryReport, query, mod, res)
		},
		listOne: (req,res)=>{
			const query = req.params
			const mod = {password: 0, token:0}

			Help.listOne(CategoryReport, query,mod, res)
		}
	}

}