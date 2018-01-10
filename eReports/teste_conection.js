/*
Para montarmos graficos no front teremos essas libs. => ChartJS, D3JS e C3JS, http://echarts.baidu.com/
*/
'use strict'
const moment = require('moment')
const oracledb = require('oracledb')

module.exports = (Connection) =>
    (req, res) => {
        var query = (err, connection) => {
            if (err) { console.error('estourou aqui: ', err); return }

            var sql = `select * from sys.product`

            connection.execute(
                sql,
                {},
                {
                    outFormat: oracledb.OBJECT
                },
                function (err, result) {
                    if (err) { console.error('err: ', err); connection.close(); return }

                    const resultados = result.rows

                    connection.close()
                    // connectionClose(connection);

                    res.status(200).json(resultados)
                })
        }

        Connection(query)
    }
