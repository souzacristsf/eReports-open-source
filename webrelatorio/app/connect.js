'use strict'
const dbConfig = require('../app/config/dbconfig');
const oracledb = require('oracledb');

module.exports = (cb) => {
  oracledb.getConnection( dbConfig, cb );
}



// {
//   user          : dbConfig.user,
//   password      : dbConfig.password,
//   connectString : dbConfig.connectString,
//   stmtCacheSize : 40
// }
