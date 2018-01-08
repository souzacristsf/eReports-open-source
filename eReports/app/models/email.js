module.exports = app => {
    const mongoose = require('mongoose')
    const mongoosePaginate = require('mongoose-paginate')
    const autoIncrement = require('mongoose-auto-increment')
    const Schema = mongoose.Schema
    const ObjectId = mongoose.Schema.Types.ObjectId

    const email = new Schema({
        // email_id: {type: Number, index: true, unique: true},
        to: {type: String, required: true, trim: true},
        from: {type: String, required: true, trim: true},
        password: {type: String, required: true, trim: true},
        service: {type : String, required: true, enum : [ 'hotmail', 'gmail' ]},
        created_at: {type: Date, default: Date.now},
        updated_at: {type: Date},
        deleted_at: {type: Date}
    })
    email.virtual('email_id').get(function(){
        return this._id;
    })
    autoIncrement.initialize(mongoose.connection);
    email.plugin(autoIncrement.plugin, { model: 'Email', field: 'email_id', startAt: 1, incrementBy: 1 });
    email.plugin(mongoosePaginate)

    return mongoose.model('Email', email)
}
