module.exports = app => {
    const url = `${app.url}/schedule`
    const Controller = app.controllers.schedule
    // const Validate = app.validates.schedule

    // route login jwt
    // app.route(`${url}/test`)
    //     .post()
    
    app.route(`${url}/new`)
        .post(Controller.create)

    // app.route(`${url}/run`)
    //     .post(Validate.runQuery, Controller.runQuery)

    app.route(url)
        .get(Controller.listAll)
}