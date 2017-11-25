module.exports = app => {
    const url = `${app.url}/report`
    const Controllers = app.controllers.report

    app.route(`${url}/:sequencia`)
        .get(Controllers.listAll)
}
