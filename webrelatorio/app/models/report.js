module.exports = app => {
	const mongoose = require('mongoose')
	const mongoosePaginate = require('mongoose-paginate')
	const Schema = mongoose.Schema
	const ObjectId = mongoose.Schema.Types.ObjectId

	const report = new Schema({
		catoryReportId:  {type: ObjectId, ref:'CategoryReport'},
		userUpdate: {type: ObjectId, ref:'User'},
		title: {type: String},
		sequencia: {type: Number },
		ordem: {type: Number},
		description: {type: String},
		descriptionCaption: {type: String},
		typeDashboard: {type: String, enum : [ 'Sintetico', 'Analitico' ], default : 'Analitico'},
		reportType: { type: String },
		titleColumn: [
			{
				position: { type: Number }, 
				column: { type: String } 
			}
		],
		subtitle: [{name: {type: String}}],		
		created_at: {type: Date, default: Date.now},
		updated_at: {type: Date, default: Date.now},
		deleted_at: {type: Date}
	})

	report.plugin(mongoosePaginate)

	return mongoose.model('Report', report)

}

