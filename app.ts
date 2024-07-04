
import dotenv from 'dotenv';

// Primero, determina el entorno y carga las variables de entorno correspondientes
if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.prod' });
    console.log('Running in production mode');
} else {
    dotenv.config({ path: '.env.dev' });
    console.log('Running in development mode');
}

// Después de cargar las variables de entorno, importa los módulos que dependen de ellas
import ServerNode from './src/models/server';
import { handleUncaughtExceptions } from './src/models/uncaughtException';

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

const server = new ServerNode();

process.on('uncaughtException', (err: Error) => {
    handleUncaughtExceptions(err);
});

server.listen();


