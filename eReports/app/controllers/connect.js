var oracledb = require('oracledb');

const testConnection = (config, res) => {
 return oracledb.getConnection(
    {
        
        user          : config.user,
        password      : config.password,
        connectString : config.connectString
    })
    .then(function(connection) {
      return connection.execute(
        "SELECT TO_CHAR(SYSDATE, 'dd/mm/yyyy hh24:mm:ss') DATA " +
          "FROM DUAL",
        [],
        {
        outFormat: oracledb.OBJECT
        }
      )
      .then(function(result) {
        console.log('Data: ', result.rows[0].DATA)
        res.status(201).json({success: true, type: 'success', msg: 'Conexão Efetuada com sucesso!!! :)', data: 'conexão realizada as ' + result.rows[0].DATA})

        return connection.close();
      })
      .catch(function(err) {
        res.status(503).json({success: false, type: 'danger', msg: 'Conexão Falhou!!! :(', data: err.message})
        console.log(err.message);

        return connection.close();
      });
    })
    .catch(function(err) {
      res.status(503).send({ success: false, type: 'danger', msg: 'Conexão Falhou!!! :(', data: err.message})
      console.error('erropppp: ', err.message);
    });
}
  // Note: connections should always be released when not needed
function doRelease(connection)
{
connection.close(
    function(err) {
    if (err) {
        console.error(err.message);
    }
    });
}
module.exports = app => {

    const Connection = app.models.connect
    const Help = app.helps.crud

    return {
        testConnect: (req, res) => {
            testConnection(req.body, res);
        },

        create: (req, res) => {
            const connection = new Connection()

            Object.assign(connection, req.body)

            Help.create(connection, res)
        },
        listAll: (req, res) => {
            const query = {}
            const mod = {
                page: 1,
                limit: 10,
                select: ''
            }

            Help.listAll(Connection, query, mod, res)
        }
    }
}
