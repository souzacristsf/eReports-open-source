module.exports = app =>{
	const mongoose = require('mongoose')
	const mongoosePaginate = require('mongoose-paginate')
	const Schema = mongoose.Schema
	const ObjectId = mongoose.Schema.Types.ObjectId

	const ruleReport = new Schema({
		categoryReportID: {type: ObjectId, ref:'CategoryReport'},
        user: {type: ObjectId, ref:'User'},
        isActive : {type: Boolean, default: true},
		created_at: {type: Date, default: Date.now},
		updated_at: {type: Date},
		deleted_at: {type: Date}
	})

	ruleReport.plugin(mongoosePaginate)

	return mongoose.model('RuleReport', ruleReport)

}

