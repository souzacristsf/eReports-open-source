var oracledb = require('oracledb');

module.exports = app => (config, sql) => {
 return oracledb.getConnection(
    {  
        user          : config.user,
        password      : config.password,
        connectString : config.connectString
    })
    .then(function(connection) {
      return connection.execute(
        sql,
        {},
        {
        outFormat: oracledb.OBJECT
        }
      )
      .then(function(result) {
        connection.close();
        
        // console.log('Fechou conexão')        
        
        return result.rows
      })
      .catch(function(err) {
        // console.log('Aqui: ', err.message)
        connection.close();
        
        // console.log('Fechou conexão')        
        return err;
        
      });
    })
    .catch(function(err) {
        // console.log('Aqui tbm: ', err.message)
        return err
        // res.status(503).send({ success: false, type: 'danger', msg: 'Conexão Falhou!!! :(', data: err.message, title:'Status da Conexão'})
    });
}