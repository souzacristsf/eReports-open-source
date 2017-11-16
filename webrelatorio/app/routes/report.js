module.exports = app => {

  const url = '/api/v1/report' 
  const Controllers = app.controllers.report

  app.route(`${url}/:sequencia`)
  .get(Controllers.listAll)

}