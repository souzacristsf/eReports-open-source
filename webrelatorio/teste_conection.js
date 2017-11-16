//para montar grafico no front teremos esses libs. ---- ChartJS, D3JS e C3JS, http://echarts.baidu.com/
'use strict'
const moment = require('moment');
var oracledb = require('oracledb');

module.exports = (Connection) => 
	(req, res) => {

var query = (err, connection) => {
    if (err) { console.error('estourou aqui: ', err); return; }

    var sql = `select * from product`; 

      connection.execute(
      sql,
      {},
      {
          outFormat: oracledb.OBJECT
      },
      function(err, result){
        if (err) { console.error('err: ', err); connection.close(); return; }

        const resultados = result.rows;
        console.log(resultados);
        
        connection.close();
        //connectionClose(connection);
        

        res.status(200).json(resultados);      
      
      });    
};

  Connection(query);

}

