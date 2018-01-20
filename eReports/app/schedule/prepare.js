module.exports = app => {
  const Schedule = app.models.schedule
  const moment = require('moment')
  const connect = app.config.connect
  const pluck = app.utils.pluck
  const template = require('../resources/mail/production/production.js')

  return {
    mounted: item => {
      const config = pluck(item.database, 'password', 'connectString', 'user')
      const sql = pluck(item.query, 'query').query[0]
      const columns = pluck(item.query, 'columns').columns
      const service = pluck(item.email, 'service').service
      const configEmail = pluck(item.email, 'password', 'from', 'to')
      configEmail.user = configEmail.from
      const assunto = pluck(item.query, 'name').name
      // configEmail.assunto = assunto;
      connect(config, sql).then(data => {
        const html = template({
          data: data,
          columns: columns
        })

        const mailer = require(`../modules/${service}`)(app)(configEmail)
        // console.log('enviando sql...: ', sql)
        mailer
          .sendMail({
            to: configEmail.to,
            from: configEmail.from,
            subject: assunto,
            html: html
          })
          .then(info => {
            mailer.close()
            // console.log("Info: ", info);
            console.log(`E-mail enviado para ${info.envelope.to} :)`)
          })
          .catch(err => {
            mailer.close()
            // console.log("err: ", err);
            console.log(`Verifique e-mail e senha, ocorreu um erro: ${err} :)`)
          })

        // sendEmail(data, service, configEmail, assunto, html);
      })
    }
  }
}

// const sendEmail = (data, service, configEmail, assunto, html) => {
//   const mailer = require(`../modules/${service}`)(app)(configEmail);
//   // console.log("mailer: ", mailer);
//   mailer
//     .sendMail({
//       to: configEmail.to,
//       from: configEmail.from,
//       subject: assunto,
//       html: html
//     })
//     .then(info => {
//       mailer.close();
//       // console.log("Info: ", info);
//       console.log(`E-mail enviado para ${info.envelope.to} :)`);
//     })
//     .catch(err => {
//       mailer.close();
//       // console.log("err: ", err);
//       console.log(`Verifique e-mail e senha, ocorreu um erro: ${err} :)`);
//     });
// };
