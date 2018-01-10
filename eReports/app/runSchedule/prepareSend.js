module.exports = (app) => {
    
        const Schedule = app.models.schedule
        const moment = require('moment')
        const connect = app.config.connect
        const pluck = app.controllers.pluck

        return {
            mounted: (data) => {
                const config = pluck(data.database, 'password', 'connectString', 'user')
                const sql = pluck(data.query, 'query').query[0]
                const columns = pluck(data.query, 'columns').columns
                const service = pluck(data.email, 'service').service
                const configEmail = pluck(data.email, 'password', 'from', 'to')
                const assunto = pluck(data.query, 'name').name
                configEmail.assunto = assunto
                connect(config, sql).then(data => {
                    require(`../email/${service}`)(configEmail, '', 'production', { data: data, columns: columns })
                })
            }
        }
    }
    