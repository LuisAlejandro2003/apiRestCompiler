"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeSql = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = promise_1.default.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
const executeSql = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = req.body.sql;
    if (!sql) {
        res.status(400).json({ message: "No SQL query provided." });
        return;
    }
    try {
        const [results] = yield pool.query(sql);
        res.json({ results });
    }
    catch (error) {
        if (error instanceof Error) {
            res
                .status(500)
                .json({ message: "Error executing SQL query.", error: error.message });
        }
        else {
            res
                .status(500)
                .json({ message: "Error executing SQL query.", error: String(error) });
        }
    }
});
exports.executeSql = executeSql;
