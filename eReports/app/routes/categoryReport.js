module.exports = app => {
    const url = `${app.url}/categoryReport`
    const Controller = app.controllers.categoryReport
    const Validate = app.validates.categoryReport
    const auth = app.controllers.auth
    const isAdmin = app.middleware.permission
    // const isMaster = app.middleware.isMaster

    // route login jwt
    app.route(`${url}/new`)
        .get((req, res) => res.json({msg: 'Bem vindo api delivery', version: '0.0.1'}))
        .post(isAdmin, Validate.unique, Controller.create)
}
