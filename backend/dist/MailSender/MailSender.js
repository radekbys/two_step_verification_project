"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class MailSender {
    constructor() {
        this.mailOptions = {
            to: 'rebusik67@gmail.com',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
        };
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
    async sendMail() {
        await this.transporter.sendMail(this.mailOptions);
    }
}
exports.default = MailSender;
;
(async () => {
    const mailer = new MailSender();
    await mailer.sendMail();
})();
//# sourceMappingURL=MailSender.js.map