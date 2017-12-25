module.exports = app => {
    const mongoose = require('mongoose')
    const mongoosePaginate = require('mongoose-paginate')
    const autoIncrement = require('mongoose-auto-increment')
    const Schema = mongoose.Schema
    const ObjectId = mongoose.Schema.Types.ObjectId

    const connection = new Schema({
        _id: {type: Number, index: true},
        driver: {type: String, required: true, trim: true},
        user: {type: String, required: true, trim: true},
        password: {type: String, required: true, trim: true},
        nameConect: {type: String, required: true, trim: true},
        connectString: {type: String, required: true, trim: true},
        descrConect: {type: String, required: true, trim: true},
        created_at: {type: Date, default: Date.now},
        updated_at: {type: Date},
        deleted_at: {type: Date}
    })
    autoIncrement.initialize(mongoose.connection);
    connection.plugin(autoIncrement.plugin, { model: 'Connection', field: '_id', startAt: 1, incrementBy: 1 });
    connection.plugin(mongoosePaginate)

    return mongoose.model('Connection', connection)
}
