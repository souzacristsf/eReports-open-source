module.exports = app =>{
	const mongoose = require('mongoose')
	const mongoosePaginate = require('mongoose-paginate')
	const Schema = mongoose.Schema
	const ObjectId = mongoose.Schema.Types.ObjectId
	const pass = require('../middleware/password')

	function configPass (v) {
		return pass.hash(v)
	}

	const admin = new Schema({
		userID: {type: ObjectId, ref:'User'},
		password: {type: String, select: true, required:true, set: configPass},
		created_at: {type: Date, default: Date.now},
		updated_at: {type: Date},
		deleted_at: {type: Date}
	})

	admin.plugin(mongoosePaginate)

	return mongoose.model('Admin', admin)

}

