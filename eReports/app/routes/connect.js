module.exports = app => {
    const url = `${app.url}/connect`
    const Controller = app.controllers.connect
    const Validate = app.validates.connect
    const auth = app.controllers.auth
    const isAdmin = app.middleware.permission

    // route login jwt
    app.route(url)
        .post(Controller.testConnect)
}
