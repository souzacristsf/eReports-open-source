module.exports = app => {
    const url = `${app.url}/connect`
    const Controller = app.controllers.connect
    // const Validate = app.validates.connect

    // route login jwt
    app.route(`${url}/test`)
        .post(Controller.testConnect)
    
    app.route(`${url}/new`)
        .post(Controller.create)

    app.route(url)
        .get(Controller.listAll)
}
