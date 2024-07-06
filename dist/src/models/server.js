"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const sqlRoutes_1 = __importDefault(require("../routes/sqlRoutes"));
const logger_1 = __importDefault(require("./logger"));
class ServerNode {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '5000';
        this.address = process.env.ADDRESS || '0.0.0.0';
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.json());
        this.app.set('json spaces', 2);
    }
    routes() {
        this.app.use('/api/sql', sqlRoutes_1.default);
        this.app.use((req, res) => {
            const error = new Error('Ruta no encontrada');
            logger_1.default.info(`IP:${req.ip} METHOD:${req.method} URL:${req.url} MESSAGE:${error.message}`);
            res.status(404).json({ message: error.message });
        });
    }
    listen() {
        const portNumber = parseInt(this.port, 10);
        this.app.listen(portNumber, this.address, () => {
            console.log(`Server on port: ${this.address}:${portNumber}`);
        });
    }
}
exports.default = ServerNode;
