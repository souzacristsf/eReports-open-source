module.exports = app => {
  const mongoose = require('mongoose')
  const mongoosePaginate = require('mongoose-paginate')
  const Schema = mongoose.Schema
  const ObjectId = mongoose.Schema.Types.ObjectId
  const pass = require('../middleware/password')

  function configPass(v) {
    return pass.hash(v)
  }

  const user = new Schema({
    username: {
      type: String,
      required: true,
      index: { unique: true },
      trim: true
    },
    password: { type: String, select: true, required: true, set: configPass },
    fullname: { type: String, required: true, trim: true },
    email: { type: String, required: true },
    token: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date },
    deleted_at: { type: Date }
  })

  user.plugin(mongoosePaginate)

  return mongoose.model('User', user)
}
