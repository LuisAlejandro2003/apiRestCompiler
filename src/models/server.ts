// src/models/server.ts
import express, { Application } from 'express';
import cors from 'cors';
import sqlRoutes from '../routes/sqlRoutes';
import logger from './logger';

class ServerNode {
    private app: Application;
    private port: string;
    private address: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '5000';
        this.address = process.env.ADDRESS || '0.0.0.0';
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.set('json spaces', 2);
    }

    routes() {
        this.app.use('/api/sql', sqlRoutes);

        this.app.use((req, res) => {
            const error = new Error('Ruta no encontrada');
            logger.info(`IP:${req.ip} METHOD:${req.method} URL:${req.url} MESSAGE:${error.message}`);
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

export default ServerNode;
