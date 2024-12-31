"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.route('/firstStep').post((req, res) => {
    if (req.body.email === 'rebusik67@gmail.com' &&
        req.body.password === '1234') {
        res.status(200);
        res.send({
            message: 'data correct, verification email has been sent'
        });
        return;
    }
    res.status(403).send({ message: 'Incorrect email or password' });
});
router.route('/secondStep').post((req, res) => {
    if (req.body.email === 'rebusik67@gmail.com' &&
        req.body.password === '1234' &&
        req.body.code === '1234') {
        res.status(200);
        res.send({
            message: 'you have logged in'
        });
        return;
    }
    res.status(403).send({ message: 'Incorrect verification code' });
});
exports.default = router;
//# sourceMappingURL=login.js.map