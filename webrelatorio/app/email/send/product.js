module.exports = (Organism) => {

    // const data = {
	// 	email: ''
	// };

    // console.log('Organism:', Organism)

	const nodemailer = require('nodemailer')	
	const template = require('../template/product')
	const config = require('../config/user')

	// const config = {
	// 	remetente: 'Send Reports Email <@hotmail.com>',
	// 	assunto: 'Indicadores de Produtos'
	// }
	
	const html = template(Organism);
	
	//send outlook e Hotmail
	const transporte = nodemailer.createTransport({
		host: "smtp.office365.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
            ciphers:'SSLv3'
        },
		auth: {
			user: config.user,
			pass: config.pass
		}
	})

	//send Gmail
	// const transporter = nodemailer.createTransport({
	// service: 'gmail',
	// auth: {
	// 		user: config.user,
	// 		pass: config.pass
	// 	}
	// });

	transporte.sendMail({
		from: config.remetente,
		to: config.to,
		subject: config.assunto,
		html: html
	}, (err)=>{
		if (err) throw err;
		console.log('E-mail para %s enviado!', config.to);

	})

}