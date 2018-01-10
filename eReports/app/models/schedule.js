const email = { 
    email_id: {type: Number},
    service: {type: String},
    password: {type: String},
    from: {type: String},
    to: {type: String},
    created_at: {type: Date} 
}
const database = { 
    descrConect: {type: String},
    connectString: {type: String},
    nameConect: {type: String},
    password: {type: String},
    user: {type: String},
    driver: {type: String},
    created_at: {type: Date},
    status: {type: String} 
}
const query = { 
    query_id: {type: Number},
    name: {type: String},
    created_at: {type: Date},
    columns: {type: Array},
    query: {type: Array}
}

module.exports = app => {
    const mongoose = require('mongoose')
    const mongoosePaginate = require('mongoose-paginate')
    const Schema = mongoose.Schema
    const ObjectId = mongoose.Schema.Types.ObjectId
    const autoIncrement = require('mongoose-auto-increment')

    const schedule = new Schema({
        allDay: {type: Boolean},
        status: {type: String, enum : [ 'Active', 'Inactive' ], default : 'Active'},
        startDate: {type: Date},
        endDate: {type: Date},
        startTime: {type: String},
        endTime: {type: String},
        sTime: {type: Number},
        eTime: {type: Number},
        email: email,
        database: database,
        query: query,
        created_at: {type: Date, default: Date.now},
        updated_at: {type: Date},
        deleted_at: {type: Date}
    })
    schedule.virtual('schedule_id').get(function(){
        return this._id;
    })
    autoIncrement.initialize(mongoose.connection);
    schedule.plugin(autoIncrement.plugin, { model: 'Schedule', field: 'schedule_id', startAt: 1, incrementBy: 1 });
    schedule.plugin(mongoosePaginate)

    return mongoose.model('Schedule', schedule)
}
