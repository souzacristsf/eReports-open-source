module.exports = app => {
    const url = `${app.url}/faturamento`
    const connect = app.connect // require('./app/connect')
    // const Faturamento = app.relacional.faturamento
    // const Controller = app.controllers.atendimento
    const isMaster = app.middleware.isMaster

    const permissionUpdate = app.middleware.permissionUpdate
    // const help = app.helps.upload

    // app.route(`${url}/resumo`)
    // .get(Faturamento.producao(connect))
}
