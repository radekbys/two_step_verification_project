"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class MailSender {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL,
                pass: process.env.APPLICATION_PASSWORD
            }
        });
    }
    sendMail(targetEmail, verCode) {
        const mailOptions = {
            to: targetEmail,
            subject: 'Verification Code',
            text: verCode
        };
        this.transporter.sendMail(mailOptions);
    }
}
exports.default = MailSender;
//# sourceMappingURL=MailSender.js.map