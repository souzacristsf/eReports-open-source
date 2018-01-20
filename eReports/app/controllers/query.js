module.exports = app => {
  const Query = app.models.query
  const Connection = app.models.connection
  const Help = app.helps.crud
  const pluck = app.utils.pluck
  const execQuery = require('../config/connect')

  return {
    create: (req, res) => {
      const query = new Query()

      const fields = pluck(req.body, 'name', 'query', 'columns', 'database')

      Object.assign(query, fields)

      Help.create(query, res)
    },
    runQuery: (req, res) => {
      const query = {
        connect_id: parseInt(req.body.connect_id)
      }

      const sql = req.body.query // `select * from sys.product c`;

      Connection.findOne(query, {
        connectString: 1,
        password: 1,
        user: 1,
        _id: 0
      })
        .then(connect => {
          execQuery(app)(connect, sql)
            .then(result => {
              if (result.message) {
                res.status(503).json({
                  success: false,
                  type: 'danger',
                  msg: result.message,
                  data: new Date(),
                  title: 'Status da Consulta'
                })
              }
              res.status(201).json({
                success: true,
                type: 'success',
                msg: 'Consulta realizada com sucesso!!! :)',
                data: result,
                title: 'Status da Consulta'
              })
            })
            .catch(err =>
              res.status(503).json({
                success: false,
                type: 'danger',
                msg: 'Consulta Falhou!!! :(',
                data: err.message,
                title: 'Status da Consulta'
              })
            )
        })
        .catch(err =>
          res.status(503).json({
            success: false,
            type: 'danger',
            msg: 'Consulta Falhou!!! :(',
            data: err.message,
            title: 'Status da Consulta'
          })
        )
    },
    listAll: (req, res) => {
      const myQuery = {}
      const mod = {
        page: 1,
        limit: 10,
        select: '-__v, -_id'
      }
      Help.listAll(Query, myQuery, mod, res)
    },
    update: (req, res) => {
      const myQuery = {
        query_id: parseInt(req.params.query_id)
      }
      const fields = pluck(req.body, 'name', 'query', 'connect_id')

      const mod = fields
      mod.$unset = { deleted_at: 1 }
      mod.updated_at = new Date()
      Help.update(Query, myQuery, mod, res)
    },
    delete: (req, res) => {
      const myQuery = {
        connect_id: parseInt(req.params.query_id)
      }
      const mod = {
        deleted_at: new Date(),
        updated_at: new Date()
      }

      Help.update(Query, myQuery, mod, res)
    }
  }
}
