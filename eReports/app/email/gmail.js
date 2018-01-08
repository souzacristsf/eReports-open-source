module.exports = (config, res, type) => {
    const nodemailer = require('nodemailer')
    const template = require(`./template/${type}`)

    const html = template()

    console.log('config: ', config)

    // send Gmail
    const transporte = nodemailer.createTransport({
    service: 'gmail',
    secure: true, // use SSL
    auth: {
    		user: config.user,
    		pass: config.pass
    	}
    });

    transporte.sendMail({
        from: config.remetente,
        to: config.to,
        subject: config.assunto,
        html: html
    }).then(info => {
        transporte.close();
        res.status(200).json({success: true, type: 'success', msg: `E-mail enviado para ${config.to} :)`, data: new Date(), title:'Status do Envio'})
    }).catch(err => {
        transporte.close();
        res.status(500).json({success: false, type: 'danger', msg: `Verifique e-mail e senha, ocorreu um erro: ${err.message} :)`, data: new Date(), title:'Status do Envio'})        
    })
}
