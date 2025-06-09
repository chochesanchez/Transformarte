import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Simple test to create an event
async function createTestEvent() {
  try {
    const event = await prisma.event.create({
      data: {
        title: 'Noche Rotaria 2024',
        date: new Date('2024-07-15'),
        location: 'Centro de Convenciones',
        description: 'Evento anual de recaudación de fondos',
        club: 'Rotary Club Transformarte',
        maxParticipants: 200
      }
    });
    console.log('Successfully created event:', event);
  } catch (error) {
    console.error('Error creating event:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestEvent(); 