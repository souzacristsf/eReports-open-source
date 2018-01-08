module.exports = app => {
    const url = `${app.url}/connect`
    const Controller = app.controllers.connection
    const Validate = app.validates.connection

    // route login jwt
    app.route(`${url}/test`)
        .post(Validate.testeConect, Controller.testConnect)
    
    app.route(`${url}/new`)
        .post(Validate.create, Validate.unique, Controller.create)

    app.route(url)
        .get(Controller.listAll)

    app.route(`${url}/:connect_id`)
        .put(Validate.update, Validate.uniqueId, Controller.update)
        .delete(Validate.delete, Controller.delete)
}
