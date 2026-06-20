import { PrismaClient } from '@prisma/client';
import logger from './logger.js';

const prisma = new PrismaClient({
  log: [
    { level: 'query', emit: 'event' },
    { level: 'info', emit: 'stdout' },
    { level: 'warn', emit: 'stdout' },
    { level: 'error', emit: 'stdout' },
  ],
});

prisma.$on('query', (e) => {
  logger.debug(`Prisma Query: ${e.query} | Params: ${e.params} | Duration: ${e.duration}ms`);
});

// Test connection
prisma.$connect()
  .then(() => {
    logger.info('Database connected successfully via Prisma Client');
  })
  .catch((err) => {
    logger.error('Failed to connect to the database:', err);
  });

export default prisma;
