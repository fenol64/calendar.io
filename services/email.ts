import nodemailer from 'nodemailer';

export async function sendEmail(email: string | null, message: string) {

    if (!email) return

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'Calendar.io notifiy', // sender address
        to: "email, " + email, // list of receivers
        subject: message, // Subject line
        text: message, // plain text body
        html: message, // html body
    });

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}