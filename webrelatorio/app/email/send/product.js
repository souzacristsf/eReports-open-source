module.exports = (Organism) => {

    const data = {
		email: 'michel.souza@hospitalmarieta.org.br'
};

    // console.log('Organism:', Organism)

	const nodemailer = require('nodemailer')	
	const template = require('../template/product')

	const config = {
		remetente: 'Send Reports Email <michel.souza@hospitalmarieta.org.br>',
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
			user: 'michel.souza@hospitalmarieta.org.br',
			pass: '<m66189184m>'
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