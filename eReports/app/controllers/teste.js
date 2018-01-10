const Connection = require('../config/connect')
module.exports = app => config => {
  
    var query = (err, connection) => {
        if (err) { console.error('estourou aqui: ', err); return; }
        var sql = `SELECT SYSDATE DATA FROM DUAL;`; 

        return connection.execute(
        sql,
        [],
        {
          outFormat: oracledb.OBJECT,
          maxRows: 1000
        },
        function(err, result){
          if (err) { console.error('err: ', err); connection.close(); return; }
  
          const resultados = result.rows;

          connection.close();
            
          return resultados;

        });    
    };
    return Connection(config, query)
  }