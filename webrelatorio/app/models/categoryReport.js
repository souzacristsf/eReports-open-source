module.exports = app =>{
	const mongoose = require('mongoose')
	const mongoosePaginate = require('mongoose-paginate')
	const Schema = mongoose.Schema
	const ObjectId = mongoose.Schema.Types.ObjectId

	const categoryReport = new Schema({
		name: {type: String, index: {unique: true}},
        ruleUpdate: [], //{type : String, enum : [ 'Administrador', 'Master' ], default : 'Administrador'},
        isActive : {type: Boolean, default: true},
		created_at: {type: Date, default: Date.now},
		updated_at: {type: Date},
		deleted_at: {type: Date}
	})

	categoryReport.plugin(mongoosePaginate)

	return mongoose.model('CategoryReport', categoryReport)

}

