const mongoose = require('mongoose');
const Contact = require('../models/contacts.model');
const ApiError = require('../models/api.error.model');
const nodemailer = require('nodemailer');

module.exports.list = (req, res, next) => {
    Contact.find()
    .then(contacts => res.json(contacts))
    .catch(error => next(error));
};

module.exports.create = (req, res, next) => {
    var contact = new Contact(req.body);

    contact.save()
    .then(()=> {
        res.status(201).json(contact);
        sendMail(contact);
    })
    .catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
          console.log(error);
          next(new ApiError(error.errors));
        } else {
          next(new ApiError(error.message, 500));
        }
    });
};

module.exports.destroy = (req, res, next) => {
    const id = req.params.id;
  
    Contact.findByIdAndRemove(id)
      .then(contact => {
        if (contact) {
          res.status(204).json();
        } else {
          next(new ApiError(`Card not found`, 404));
        }
      }).catch(error => next(error));
};

function sendMail (contact) {

    let transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false,
        auth: {
            user: 'serviabu@outlook.com',
            pass: '.Aj6958jw'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: '"Pablo Otero" <serviabu@outlook.com>', 
        to: contact.email,
        subject: 'Asistencia profesional de Serviabu',
        text: 
        `Hola ${contact.name},

        Gracias por confiar en el equipo de Serviabu. Nos pondremos en contacto con usted lo antes posible para analizar su caso en detalle.

        Reciba un cordial saludo,

        Pablo Otero
        Director general de Serviabu`
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
};
    