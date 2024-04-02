const nodemailer = require('nodemailer');


// binh.an.dev.2004@gmail.com
// nsuz viub pabs oout

// khai báo transporter
// khai báo thông tin email
const transporter = nodemailer.createTransport({
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: {
        user: 'vunguyen10111998@gmail.com',
        pass: 'lhvu xbli ktki kibe'
    },
});
const sendMail = async (data) => {
    try {
        const { email, subject, content } = data;
        const mailOptions = {
            from: 'vunguyen10111998@gmail.com',
            to: email,
            subject,
            html: content,
        };
        await transporter.sendMail(mailOptions);
        return true;
    }
    catch (error) {
        console.log(error);
        throw new Error('Có lỗi xảy ra khi gửi email');
    }
}

module.exports = {
    sendMail,
}
