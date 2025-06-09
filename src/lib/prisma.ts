import { PrismaClient } from '@prisma/client';

// Create Prisma Client with logging
const prisma = new PrismaClient({
  log: [
    { level: 'query', emit: 'event' },
    { level: 'error', emit: 'stdout' },
    { level: 'warn', emit: 'stdout' }
  ]
});

// Monitor query performance
prisma.$on('query', (e: { query: string; duration: number; timestamp: Date }) => {
  if (e.duration >= 100) {
    console.warn('Slow query detected:', {
      query: e.query,
      duration: e.duration,
      timestamp: e.timestamp
    });
  }
});

// Log all errors
prisma.$on('error', (e: { message: string }) => {
  console.error('Database error:', {
    message: e.message,
    timestamp: new Date().toISOString()
  });
});

// Handle graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export default prisma; 