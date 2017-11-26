module.exports = app => {
    const url = `${app.url}/atendimento`
    const Controller = app.controllers.atendimento
    const isMaster = app.middleware.isMaster
    // const Validate = app.validates.atendimento
    // const isAdmin = app.middleware.permission
    const permissionUpdate = app.middleware.permissionUpdate
    // const help = app.helps.upload

    app.route(`${url}/resumo`)
        .get(Controller.listAllResumo)

    app.route(`${url}/:ie_tipo_atendimento`)
  	.get(Controller.listAll)
    // .post(Controller.create)

    app.route(`${url}/atendimentopormes/:ie_tipo_atendimento`)
        .get(Controller.listAllAtendimentoPorMes)

    app.route(`${url}/atualizar`)
  	.get(permissionUpdate, Controller.updateAll)
}
