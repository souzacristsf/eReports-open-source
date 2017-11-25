const oracledb = require('oracledb')
const dbConfig = require('../app/config/urls').oracle

module.exports = (cb) => oracledb.getConnection(dbConfig, cb)
