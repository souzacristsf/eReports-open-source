var oracledb = require("oracledb");

const testConnection = (config, res) => {
  return oracledb
    .getConnection({
      user: config.user,
      password: config.password,
      connectString: config.connectString
    })
    .then(function(connection) {
      return connection
        .execute("SELECT SYSDATE DATA " + "FROM DUAL", [], {
          outFormat: oracledb.OBJECT
        })
        .then(function(result) {
          res.status(201).json({
            success: true,
            type: "success",
            msg: "Conexão Efetuada com sucesso!!! :)",
            data: result.rows[0].DATA,
            title: "Status da Conexão"
          });

          return connection.close();
        })
        .catch(function(err) {
          res.status(503).json({
            success: false,
            type: "danger",
            msg: "Conexão Falhou!!! :(",
            data: err.message,
            title: "Status da Conexão"
          });

          return connection.close();
        });
    })
    .catch(function(err) {
      res.status(503).send({
        success: false,
        type: "danger",
        msg: "Conexão Falhou!!! :(",
        data: err.message,
        title: "Status da Conexão"
      });
    });
};

module.exports = app => {
  const Connection = app.models.connection;
  const Help = app.helps.crud;
  const pluck = app.utils.pluck;

  return {
    testConnect: (req, res) => {
      const fields = pluck(req.body, "user", "password", "connectString");
      testConnection(fields, res);
    },

    create: (req, res) => {
      const connection = new Connection();
      const fields = pluck(
        req.body,
        "driver",
        "user",
        "password",
        "nameConect",
        "connectString",
        "descrConect"
      );

      Object.assign(connection, fields);

      Help.create(connection, res);
    },
    listAll: (req, res) => {
      const query = {};
      const mod = {
        page: 1,
        limit: 10,
        select: "-__v, -_id"
      };

      Help.listAll(Connection, query, mod, res);
    },
    update: (req, res) => {
      const query = {
        connect_id: parseInt(req.params.connect_id)
      };
      const fields = pluck(app)(
        req.body,
        "driver",
        "user",
        "nameConect",
        "connectString",
        "descrConect"
      );

      Connection.find(query).then(data => {
        if (data.password != req.body.password) {
          fields.password = req.body.password;
        }
      });

      const mod = fields;
      mod.status = "Active";
      mod.$unset = { deleted_at: 1 };
      mod.updated_at = new Date();
      Help.update(Connection, query, mod, res);
    },
    delete: (req, res) => {
      const query = {
        connect_id: parseInt(req.params.connect_id)
      };
      const mod = {
        deleted_at: new Date(),
        updated_at: new Date(),
        status: "Inactive"
      };

      Help.update(Connection, query, mod, res);
    }
  };
};
