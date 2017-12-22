module.exports = app => {
    const url = `${app.url}/connect`
    const Controller = app.controllers.connect
    const Validate = app.validates.connect

    // route login jwt
    app.route(`${url}/test`)
        .post(Validate.create, Controller.testConnect)
    
    app.route(`${url}/new`)
        .post(Validate.create, Validate.unique, Controller.create)

    app.route(url)
        .get(Controller.listAll)
}
