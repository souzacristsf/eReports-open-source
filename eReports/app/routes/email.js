module.exports = app => {
    const url = `${app.url}/email`
    const Controller = app.controllers.email
    const Validate = app.validates.email

    // route login jwt
    app.route(`${url}/test`)
        .post(Validate.create, Controller.sendEmailTest)
    
    app.route(`${url}/new`)
        .post(Validate.create, Validate.unique, Controller.create)

    app.route(url)
        .get(Controller.listAll)
}
