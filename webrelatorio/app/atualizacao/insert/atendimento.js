// module.exports = app => {
module.exports = app => {
  const moment = require('moment')
  const oracledb = require('oracledb');
  const Atendimento = app.models.atendimento// require('../../models/atendimento')(app); // Errado
  const Controllers = require('../../controllers/atendimento')
  const Connection = require('../../connect')
  let sql =  require('../sql/atendimento')
      
  //atendimento
  var myoffset     = 0;  // number of rows to skip
  var mymaxnumrows = 500000;  // number of rows to fetch

  const inserirDados = (dados) => {
    const atendimento = new Atendimento(dados);
      atendimento.save();
      // atendimento.save(function (err, results) {
      //   console.log('results: ', results);
      // });
  }

  const query = (err, connection) => {
    
    if (err) { console.error('estourou aqui: ', err); return; }

    if (connection.oracleServerVersion >= 1201000000) {
      // 12c row-limiting syntax
      sql += " OFFSET :offset ROWS FETCH NEXT :maxnumrows ROWS ONLY";
    } else {
      // Pre-12c syntax [could also customize the original query and use row_number()]
      sql = `SELECT * FROM (SELECT A.*, ROWNUM AS MY_RNUM FROM
            ( ${sql} ) A 
            WHERE ROWNUM <= :maxnumrows + :offset) WHERE MY_RNUM > :offset`;
    }

      connection.execute(
      sql,
      {offset: myoffset, maxnumrows: mymaxnumrows},
      {
        outFormat: oracledb.OBJECT,
        maxRows: 500000, 
        resultSet: true, 
        prefetchRows: 10000
      },
      function(err, results){
        if (err) { console.error(err); connection.close(); return; }
        // var rowsProcessed = 0;
        // var startTime;
        // startTime = Date.now();

        function processResultSet() {
            results.resultSet.getRows(1000, function(err, rows) {
                if (err) throw err;

                console.log(rows.length);
                if (rows.length) {
                    rows.forEach(function(row) {
                        inserirDados(row);
                        // rowsProcessed += 1;
                        // console.log(row, rowsProcessed)
                        //do work on the row here
                    });

                    processResultSet(); //try to get more rows from the result set

                    return; //exit recursive function prior to closing result set
                }

                // console.log('Finish processing ' + rowsProcessed + ' rows');
                // console.log('Total time (in seconds):', ((Date.now() - startTime)/1000));

                results.resultSet.close(function(err) {
                    if (err) console.error(err.message);

                    connection.release(function(err) {
                        if (err) console.error(err.message);
                    });
                });
            });
        }

        processResultSet();
      });    
  };

Connection(query);

const connectionClose = (connection) => {
  
  connection.close(function(err){
    if(err){
      console.error('causei um erro: ',err.message);
    }
    console.log('Conexão com Oracle Encerrado!!!');
  });
}

}