const oracledb = require('oracledb');
const dbConfig = require('../app/config/dbconfig');

'use strict'
module.exports = (cb) => {
  oracledb.getConnection( dbConfig, cb );
}



// {
//   user          : dbConfig.user,
//   password      : dbConfig.password,
//   connectString : dbConfig.connectString,
//   stmtCacheSize : 40
// }
