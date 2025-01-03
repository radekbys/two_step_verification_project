"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MockDatabaseOperations_1 = require("../mockDatabase/MockDatabaseOperations");
const crypto_1 = require("crypto");
const MailSender_1 = __importDefault(require("../MailSender/MailSender"));
const router = express_1.default.Router();
router.route('/firstStep').post(async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(403).send({ message: 'Incorrect email or password' });
        return;
    }
    let user;
    try {
        user = await (0, MockDatabaseOperations_1.findUser)(req.body.email);
    }
    catch (e) {
        console.error(e.message);
        res.status(404).send({ message: 'No user with this email address' });
        return;
    }
    if (!user.isSamePassword(req.body.password)) {
        res.status(403).send({ message: 'Incorrect email or password' });
        return;
    }
    const verificationCode = String((0, crypto_1.randomInt)(1000, 10000));
    try {
        await user.addVerCodeHash(verificationCode);
        await (0, MockDatabaseOperations_1.updateUser)(user);
    }
    catch (e) {
        console.error(e.message);
        res.status(500).send({ message: "Could't assign verification code" });
        return;
    }
    try {
        const sender = new MailSender_1.default();
        await sender.sendMail(user.email, verificationCode);
    }
    catch (e) {
        console.error(e.message);
        res.status(500).send({
            message: "Verification code couldn't be send"
        });
        return;
    }
    res.status(200).send({
        message: 'User OK'
    });
    return;
});
router.route('/secondStep').post(async (req, res) => {
    req.body.email;
    req.body.password;
    req.body.code;
    let user;
    try {
        user = await (0, MockDatabaseOperations_1.findUser)(req.body.email);
    }
    catch (e) {
        console.error(e.message);
        res.status(404).send({ message: 'No user with this email address' });
        return;
    }
    try {
        if (!(await user.isSamePassword(req.body.password))) {
            throw new Error('wrong password');
        }
        if (!(await user.checkVerCode(req.body.code))) {
            throw new Error('wrong verification Code');
        }
    }
    catch (e) {
        console.error(e.message);
        res.status(403).send({ message: 'Authorization failed' });
        return;
    }
    res.status(200).send({
        message: 'you have logged in',
        JWT: 'Json Web Token will be there in full implementation'
    });
    return;
});
exports.default = router;
//# sourceMappingURL=login.js.map