"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class User {
    constructor() { }
    static async fromEmailPassword(email, password) {
        try {
            const user = new User();
            user.email = email;
            const salt = await bcrypt_1.default.genSalt(10);
            user.hash = await bcrypt_1.default.hash(password, salt);
            return user;
        }
        catch (e) {
            throw new Error('couldnt create a new user');
        }
    }
    static fromRawUser(rawUser) {
        const user = new User();
        user.email = rawUser.email;
        user.hash = rawUser.hash;
        return user;
    }
    async isSamePassword(password) {
        try {
            const answer = await bcrypt_1.default.compare(password, this.hash);
            if (answer)
                return true;
            return false;
        }
        catch (e) {
            throw new Error("couldn't compare passwords");
        }
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map