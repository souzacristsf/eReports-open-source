module.exports = app =>{
	const mongoose = require('mongoose')
	const mongoosePaginate = require('mongoose-paginate')
	const Schema = mongoose.Schema
	const ObjectId = mongoose.Schema.Types.ObjectId

	const parameter = new Schema({
        userID: [ {type: ObjectId, ref:'User'} ],
        reportAcess: [{
            reportID: {type: ObjectId, ref:'ReportCaption'},
            name: {type: String},
            isAcess: {type: Boolean}
        }],
		created_at: {type: Date, default: Date.now},
		updated_at: {type: Date},
		deleted_at: {type: Date}
	})

	parameter.plugin(mongoosePaginate)

	return mongoose.model('Parameter', parameter)

}

