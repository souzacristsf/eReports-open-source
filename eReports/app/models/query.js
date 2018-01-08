module.exports = app => {
    const mongoose = require('mongoose')
    const mongoosePaginate = require('mongoose-paginate')
    const autoIncrement = require('mongoose-auto-increment')
    const Schema = mongoose.Schema
    const ObjectId = mongoose.Schema.Types.ObjectId

    const column = mongoose.Schema({
        key: {type: String}, 
        name: {type: String}
    },{ _id : false });

    const database = mongoose.Schema({
        driver: {type: String, required: true, trim: true},
        user: {type: String, required: true, trim: true},
        password: {type: String, required: true, trim: true},
        nameConect: {type: String, required: true, trim: true},
        connectString: {type: String, required: true, trim: true},
        descrConect: {type: String, required: true, trim: true},
        status: {type : String, required: true, enum : [ 'Active', 'Inactive' ], default : 'Active'},
        created_at: {type: Date, default: Date.now}
    });

    const query = new Schema({
        // email_id: {type: Number, index: true, unique: true},
        name: {type: String, required: true, trim: true},
        query: [{type: String}],
        columns: [column],
        database: database,
        created_at: {type: Date, default: Date.now},
        updated_at: {type: Date},
        deleted_at: {type: Date}
    })
    query.virtual('query_id').get(function(){
        return this._id;
    })
    autoIncrement.initialize(mongoose.connection);
    query.plugin(autoIncrement.plugin, { model: 'Query', field: 'query_id', startAt: 1, incrementBy: 1 });
    query.plugin(mongoosePaginate)

    return mongoose.model('Query', query)
}
