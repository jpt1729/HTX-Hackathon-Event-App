const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addParticipantToEvent(userId, eventId) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        participantsEvents: {
          connect: { id: eventId },
        },
      },
    });
    console.log(`User ${userId} added to event ${eventId}`);
  } catch (error) {
    console.error('Error adding participant to event:', error);
  } finally {
    await prisma.$disconnect();
  }
}



// Example usage
getParticipantEventsForUser('clx20e8he000090149kk123zk');
