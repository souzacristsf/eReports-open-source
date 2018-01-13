module.exports = (config, res, type, data) => {
  const nodemailer = require("nodemailer");
  const template = require(`./template/${type}`);
  const html = template(data);
  // send Gmail
  const transporte = nodemailer.createTransport({
    service: "gmail",
    secure: true, // use SSL
    auth: {
      user: config.from,
      pass: config.password
    }
  });

  transporte
    .sendMail({
      from: config.from,
      to: config.to,
      subject: config.assunto,
      html: html
    })
    .then(info => {
      transporte.close();
      if (res) {
        res.status(200).json({
          success: true,
          type: "success",
          msg: `E-mail enviado para ${config.to} :)`,
          data: new Date(),
          title: "Status do Envio"
        });
      } else {
        console.log(`E-mail enviado para ${config.to} :)`);
      }
    })
    .catch(err => {
      transporte.close();
      if (res) {
        res.status(500).json({
          success: false,
          type: "danger",
          msg: `Verifique e-mail e senha, ocorreu um erro: ${err.message} :)`,
          data: new Date(),
          title: "Status do Envio"
        });
      } else {
        console.log(`Ocorreu um erro ${err} :(`);
      }
    });
};
