const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: process.env.SMTP_PORT,  
    secure: process.env.SMTP_SECURE === "true", 
    auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASS, 
    },
});

const sendEmail = async (to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: `"ArogoAI" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
        });
        console.log("Email sent:", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
module.exports = sendEmail;