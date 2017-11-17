module.exports = (Organism) => {

    const data = {
		email: 'souza_crists@hotmail.com'
};

    // console.log('Organism:', Organism)

	const nodemailer = require('nodemailer')	
	const template = require('../template/product')

	const config = {
		remetente: 'Send Reports Email <souza_crists@hotmail.com>',
		assunto: 'Indicadores de Produtos'
	}
	
	const html = template(Organism);
	
	const transporte = nodemailer.createTransport({
		host: "smtp.office365.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
            ciphers:'SSLv3'
        },
		auth: {
			user: 'souza_crists@hotmail.com',
			pass: '<891866>'
		}
	})
	transporte.sendMail({
		from: config.remetente,
		to: data.email,
		subject: config.assunto,
		html: html
	}, (err)=>{
		if (err) throw err;
		console.log('E-mail para %s enviado!', data.email);

	})

}