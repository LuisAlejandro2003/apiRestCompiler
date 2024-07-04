
import dotenv from 'dotenv';
import ServerNode from './src/models/server';
import { handleUncaughtExceptions } from './src/models/uncaughtException';


dotenv.config();
if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.prod' });
} else {
    dotenv.config({ path: '.env.dev' });
}

const server = new ServerNode();

process.on('uncaughtException', (err: Error) => {
    handleUncaughtExceptions(err);
});

server.listen();


