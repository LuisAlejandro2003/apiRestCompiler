// src/models/uncaughtException.ts

import logger from './logger';

export const handleUncaughtExceptions = (err: Error) => {
    logger.error(`Uncaught Exception: ${err.message}`);
    process.exit(1);
};
