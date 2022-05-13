require('dotenv').config();

module.exports = {
    async sendPalmas(req, res) {
        let options = req.body;
        // return options;
        // using Twilio SendGrid's v3 Node.js Library
        // https://github.com/sendgrid/sendgrid-nodejs
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_TOK);

        var html = ``;
        if(options.body.name != null){
                html = html + `<p><strong>Nombre: </strong> ${options.body.name} </p>`
        }
        if(options.body.email != null){
                html = html + `<p><strong>Email: </strong> ${options.body.email} </p>`
        }
        if(options.body.phone != null){
                html = html + `<p><strong>Telefono: </strong> ${options.body.phone} </p>`
        }
        if(options.body.message != null){
                html = html + `<p><strong>Comentarios: </strong> ${options.body.message} </p>`
        }
        var msg = {
          to: 'alfonsomtz.96@gmail.com', // Change to your recipient
          from: 'desarrolloameth@gmail.com', // Change to your verified sender
          subject: 'Contacto de cotizacion',
          //text: 'and easy to do anywhere, even with Node.js',
          html: html,
        }

        sgMail.send(msg)
            .then(() => {
                console.log('Email sent');
                return res.status(200).json({
                    success: 1,
                    message: 'Email sent'
                });
            }).catch((error) => {
                console.error(error);
                return res.status(400).json({
                    success: 0,
                    message: 'Error sending email'
                });
            });
    }
}