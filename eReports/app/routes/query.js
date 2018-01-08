module.exports = app => {
    const url = `${app.url}/query`
    const Controller = app.controllers.query
    const Validate = app.validates.query

    // route login jwt
    app.route(`${url}/test`)
        .post()
    
    app.route(`${url}/new`)
        .post(Validate.create, Controller.create)

    app.route(`${url}/run`)
        .post(Validate.runQuery, Controller.runQuery)

    app.route(url)
        .get(Controller.listAll)
}