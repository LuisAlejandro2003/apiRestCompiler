"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV === 'production') {
    dotenv_1.default.config({ path: '.env.prod' });
    console.log('Running in production mode');
}
else {
    dotenv_1.default.config({ path: '.env.dev' });
    console.log('Running in development mode');
}
const server_1 = __importDefault(require("./src/models/server"));
const uncaughtException_1 = require("./src/models/uncaughtException");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
const server = new server_1.default();
process.on('uncaughtException', (err) => {
    (0, uncaughtException_1.handleUncaughtExceptions)(err);
});
server.listen();
