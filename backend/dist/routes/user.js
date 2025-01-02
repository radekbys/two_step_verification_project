"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MockDatabaseOperations_1 = require("../mockDatabase/MockDatabaseOperations");
const User_1 = require("../User/User");
const router = express_1.default.Router();
router.route('/').post(async (req, res) => {
    try {
        const user = await User_1.User.fromEmailPassword(req.body.email, req.body.password);
        await (0, MockDatabaseOperations_1.addUser)(user);
        res.status(200).send({
            message: 'User created and added to database'
        });
    }
    catch (e) {
        res.status(400).send({
            message: 'adding user failes',
            Emessage: e.message
        });
    }
});
exports.default = router;
//# sourceMappingURL=user.js.map