module.exports = app =>{
	const mongoose = require('mongoose')
	const mongoosePaginate = require('mongoose-paginate')
	const Schema = mongoose.Schema
	const ObjectId = mongoose.Schema.Types.ObjectId
	const pass = require('../middleware/password')

	function configPass (v) {
		return pass.hash(v)
	}

	const user = new Schema({
		login: {type: String, required: true, index:{unique:true}, trim: true},
		password: {type: String, select: true, required:true, set: configPass},
		person: {
			fullName : {type: String, required: true, trim: true},
			birthDate:  {type: Date, required: true},
			gender: {type: String, enum : [ 'Masculino', 'Feminino' ] },
			phones: {
				phone_cell: {type: String},
				phone_fixed: {type: String},
			},
			created_at: {type: Date, default: Date.now},
			updated_at: {type: Date},
			deleted_at: {type: Date}
		},
		rule: {type : String, enum : [ 'Usuario Smart', 'Usuario Master', 'Administrador' ], default : 'Usuario Smart'},
		isAdmin: {type: Boolean, default: false},
		email:  {type: String, required: true},
		last_acess: {type: Date, default: Date.now},
		isActive : {type: Boolean, default: true},
		userActive: {type: Boolean, default:true},
		userConfirmed: {type: Boolean, default:false},
		token: {type: String},
		cpf: {type: String},
		created_at: {type: Date, default: Date.now},
		updated_at: {type: Date},
		deleted_at: {type: Date}
	})

	user.plugin(mongoosePaginate)

	return mongoose.model('User', user)

}

