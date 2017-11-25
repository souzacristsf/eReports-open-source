module.exports = app => {
    const url = `${app.url}/rulereport`
    const Controllers = app.controllers.ruleReport
    const isAdmin = app.middleware.permission

    app.route(`${url}/new`)
        .get(isAdmin, Controllers.create)
}
