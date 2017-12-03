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
        "SELECT SYSDATE DATA " +
          "FROM DUAL",
        [],
        {
        outFormat: oracledb.OBJECT
        }
      )
      .then(function(result) {
        res.status(201).json(result.rows)
        return connection.close();
      })
      .catch(function(err) {
        res.status(401).json({"error": true})
        console.log(err.message);

        return connection.close();
      });
    })
    .catch(function(err) {
      console.error(err.message);
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

    return {
        testConnect: (req, res) => {
            testConnection(req.body, res);
        }
    }
}
