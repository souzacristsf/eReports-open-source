'use strict'
const moment = require('moment'),
      promise = require("bluebird");

const products = require('./sql/product');
const oracledb = require('oracledb');

module.exports = (Connection) => {

console.log('Connection: ', Connection)
var myoffset = 0; // number of rows to skip
var mymaxnumrows = 1000; // number of rows to fetch

var query = (err, connection) => { 
  
  if (err) { console.error('estourou aqui: ', err); return; }

     connection.execute(
        "ALTER SESSION SET NLS_NUMERIC_CHARACTERS = ',.'"
      );
      
     var session = connection.execute(
        "ALTER SESSION SET NLS_NUMERIC_CHARACTERS = ',.'"
      );

     var query = connection.execute(
          products,
          {},
          {
            outFormat: oracledb.OBJECT,
            maxRows: 1000
          }
      );

    promise.join(session, query  ).spread(function (sessions, result){
        const index = { 
          title: 'Send Reports Email', 
          products: result.rows, 
        };

        require('./send/product')(index);  

        return connection.close();
      })
      .catch(function (err){
        console.log('Estourou bem aqui o erro');
        console.log(err.message);
        return connection.close();
      });   
};

Connection(query);

}