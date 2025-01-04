"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("./routes/login"));
const user_1 = __importDefault(require("./routes/user"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/login', login_1.default);
app.use('/user', user_1.default);
app.get('/', (req, res) => {
    res.status(200).send({
        hello: 'hello, backend working'
    });
});
app.listen(4000, () => {
    console.log('listening on port 4000');
});
//# sourceMappingURL=index.js.map