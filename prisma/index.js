const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getEventOwners(eventId) {
  const eventWithOwners = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    select: {
      eventOwners: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return eventWithOwners?.eventOwners || [];
}

// Example usage
const eventId = 'hack-htx';
getEventOwners(eventId)
  .then(eventOwners => {
    console.log('Event Owners:', eventOwners);
  })
  .catch(error => {
    console.error('Error fetching event owners:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
