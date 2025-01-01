"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = addUser;
const promises_1 = require("fs/promises");
async function addUser(user) {
    let db;
    try {
        db = JSON.parse(await (0, promises_1.readFile)('./src/mockDatabase/mockDB.json', 'utf-8'));
    }
    catch (e) {
        if (e.code === 'ENOENT') {
            db = {
                users: []
            };
        }
        else {
            console.log('Cannot open db file');
            return;
        }
    }
    if (typeof db !== 'object' || db === null || Array.isArray(db)) {
        db = {
            users: []
        };
    }
    if (!Array.isArray(db.users)) {
        db.users = [];
    }
    db.users.push(user);
    try {
        await (0, promises_1.writeFile)('./src/mockDatabase/mockDB.json', JSON.stringify(db, null, 2), 'utf-8');
    }
    catch (e) {
        console.log('Cannot write to the db file');
        return;
    }
}
addUser({
    id: 1,
    email: 'rebusik67@gmail.com',
    hash: 'string',
    salt: 'string'
});
//# sourceMappingURL=MockDatabaseOperations.js.map