module.exports = app => {

  const url = '/api/v1/rulereport' 
  const Controllers = app.controllers.ruleReport
  const isAdmin = app.middleware.permission

  app.route(`${url}/new`)
  .get(isAdmin, Controllers.create)

}