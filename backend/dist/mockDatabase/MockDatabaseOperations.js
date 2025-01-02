"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = addUser;
exports.findUser = findUser;
const promises_1 = require("fs/promises");
const User_1 = require("../User/User");
async function readDatabase() {
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
            throw new Error('Cannot open db file');
        }
    }
    if (typeof db !== 'object' || db === null || Array.isArray(db)) {
        db = {
            users: []
        };
    }
    if (!Array.isArray(db.users)) {
        db = {
            users: []
        };
    }
    return db;
}
async function saveDatabase(db) {
    try {
        await (0, promises_1.writeFile)('./src/mockDatabase/mockDB.json', JSON.stringify(db, null, 2), 'utf-8');
    }
    catch (e) {
        throw new Error('Cannot write to the db file');
    }
}
async function addUser(user) {
    try {
        const db = await readDatabase();
        const existingUser = db.users.find((user2) => user2.email === user.email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        db.users.push(user);
        await saveDatabase(db);
    }
    catch (e) {
        console.error('Error:', e.message);
        throw e;
    }
}
async function findUser(email) {
    let db;
    try {
        db = await readDatabase();
    }
    catch (e) {
        console.error('Error:', e.message);
        throw e;
    }
    const userArray = db.users.filter(item => {
        return item.email === email;
    });
    if (userArray.length === 0) {
        throw new Error('no user with this email address');
    }
    return User_1.User.fromRawUser(userArray[0]);
}
//# sourceMappingURL=MockDatabaseOperations.js.map