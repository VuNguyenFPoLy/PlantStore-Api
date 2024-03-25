const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    host: "smtp.ethereal.email",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "vunguyen10111998@gmail.com",
        pass: "kpyv inib eook zeyq",
    },
});

const sendMail = async (data) => {
    try {

        const { name, mail, subject, content } = data;
        console.log('dataMail: ', data);

        await transporter.sendMail({
            from: '"Planta Store 👻" <plantaAutoSend@gmail.com>',
            to: mail,
            subject: subject,
            html: `<b>Hello world?</b>`

        })


    } catch (error) {
        console.log('Send mail error: ', error.message);
    }
}

module.exports = sendMail