//para montar grafico no front teremos esses libs. ---- ChartJS, D3JS e C3JS, http://echarts.baidu.com/
'use strict'
const moment = require('moment');

module.exports = (Connection) => 
	(req, res) => {

var myoffset     = 0;  // number of rows to skip
var mymaxnumrows = 10000;  // number of rows to fetch

// const dt_busca = moment(req.query.dt_busca, 'DD/MM/YYYY', 'fr', true).format();

// const protocolo = ( parseInt(req.query.protocolo) == 0 || isNaN(req.query.protocolo) ) ? '' : `AND cp.IE_STATUS_PROTOCOLO = ${parseInt(req.query.protocolo)}`; 

// const tipo = req.query.tipo;
//const SQL_CONCAT = (ordenar === 'S') ? 'ORDER BY ORDER_ANO, ORDER_MES' : 'ORDER BY ORDER_ANO DESC, ORDER_MES DESC';

// const SQL_CONCAT = tipo === 'mesAtual' ? 
// `WHERE TRUNC(cps.DT_MESANO_REFERENCIA, 'Month') = TRUNC(SYSDATE, 'Month')` : 
// `WHERE TRUNC(cps.DT_MESANO_REFERENCIA, 'Month') < TRUNC(SYSDATE, 'Month')`;
// var validar_p = moment(req.query.dt_busca, 'DD/MM/YYYY', 'fr', true).isValid();
// var validar_s = moment(req.query.dt_busca, 'DD/MM/YYYY', 'fr', true).format();
// var dataInicio = moment(validar_s).startOf('month').format ('DD-MMM-YYYY') //endOf 
// var dataPesquisa = moment(dt_busca).format ('DD/MM/YYYY') //endOf

var query = (err, connection) => {
    if (err) { console.error('estourou aqui: ', err); return; }
    
//faturamento por mes usuario e valor faturado
    if ( validar_p && tipo == 'vl' ){
      var sql = ``; 

                    // console.log('sql: ', sql);

//faturamento por usuario e quantidade de conta                        
    } else if ( validar_p && tipo == 'c' ){
        var sql = ``;
    }
    
    else {
      res.status(400).json({vazio: 'Sem parametro enviado!!!'});      
      return;
    }
                                  
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
      {
       dataPesquisa: dataPesquisa, offset: myoffset, maxnumrows: mymaxnumrows},
      {
        outFormat: oracledb.OBJECT,
        maxRows: 10000
      },
      function(err, result){
        if (err) { console.error('err: ', err); connection.close(); return; }

        const resultados = result.rows;
        //console.log('connection.oracleServerVersion', connection.oracleServerVersion);

        connection.close();
        
        res.status(200).json(resultados);      
      
      });    
};
  Connection(query);
}