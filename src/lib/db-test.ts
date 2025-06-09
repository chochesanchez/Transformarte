import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testDatabase() {
  try {
    // Test User Creation
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        passwordHash: 'hashed_password_here',
        fullName: 'Test User',
        role: 'admin'
      }
    });
    console.log('Created user:', user);

    // Test Event Creation
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
    console.log('Created event:', event);

    // Test Artwork Creation
    const artwork = await prisma.artwork.create({
      data: {
        title: 'Paisaje Primaveral',
        artistName: 'María González',
        technique: 'Óleo sobre lienzo',
        dimensions: '60x80cm',
        marketPrice: 1500.00,
        startingPrice: 800.00,
        imageUrl: 'https://example.com/artwork1.jpg',
        donorEmail: 'maria@example.com',
        donorPhone: '+52 123 456 7890'
      }
    });
    console.log('Created artwork:', artwork);

    // Test Event Registration
    const registration = await prisma.eventRegistration.create({
      data: {
        eventId: event.id,
        participantName: 'Juan Pérez',
        email: 'juan@example.com',
        phone: '+52 987 654 3210',
        status: 'confirmed'
      }
    });
    console.log('Created registration:', registration);

    // Test Querying Data
    const allEvents = await prisma.event.findMany({
      include: {
        registrations: true
      }
    });
    console.log('All events with registrations:', allEvents);

  } catch (error) {
    console.error('Error testing database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testDatabase()
  .then(() => console.log('Database test completed'))
  .catch(console.error); 