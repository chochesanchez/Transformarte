import { PrismaClient } from '@prisma/client';

// Create Prisma Client with logging
const datasourceUrl = process.env.DATABASE_URL;

// Only create real client if we have a database URL
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  if (!datasourceUrl) {
    console.warn('[prisma] Missing DATABASE_URL. Database operations will fail.');
    return new PrismaClient();
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === 'development'
      ? ['query', 'error', 'warn']
      : ['error'],
  });
}

const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
