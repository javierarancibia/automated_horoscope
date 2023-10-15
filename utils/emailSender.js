const nodemailer = require("nodemailer")
require("dotenv").config()

const emailSender = (action) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.zoho.eu",
        port: 465,
        secure: true, 
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASSWORD, 
        },
    });

    const mailData = {
        from: process.env.EMAIL_USER,  
        to: "javier.arancibia.reyes@hotmail.com",   
        subject: action,
        html: `<div><h1>${action}</h1></div>`
    };  

    transporter.sendMail(mailData, function (err, info) {
        if(err) console.log(err)
        else console.log("Reporte enviado al correo")
    });
}

module.exports = emailSender