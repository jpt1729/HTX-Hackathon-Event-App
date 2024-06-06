const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create sample Users
  /*
  const user1 = await prisma.user.create({
    data: {
      id: 'user1',
      name: 'Alice',
      email: 'alice@example.com',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: 'user2',
      name: 'Bob',
      email: 'bob@example.com',
    },
  });
  */
  // Create an Event
  const event = await prisma.event.create({
    data: {
      title: 'Annual Conference',
      description: 'An event for professionals in the industry.',
      location: {
        address: "401 Franklin St, Houston, TX 77201, USA",
        googleMapsLink: "https://maps.app.goo.gl/WWfBrhsYFanNg8ZK8",
      },
      playlist: 'conference-playlist',
      startTime: new Date('2024-06-10T09:00:00Z'),
      endTime: new Date('2024-06-10T17:00:00Z'),
      eventOwners: {
        connect: [{ id: 'user1' }]
      },
      eventParticipants: {
        connect: [{ id: 'user2' }]
      }
    },
  });

  // Create an Activity
  const activity = await prisma.activity.create({
    data: {
      slug: 'workshop-1',
      title: 'Workshop on AI',
      description: 'An in-depth workshop on AI technologies.',
      content: {
        type: 'workshop',
        details: 'Covering the basics and advanced concepts of AI.'
      },
      startTime: new Date('2024-06-10T10:00:00Z'),
      endTime: new Date('2024-06-10T12:00:00Z'),
      event: {
        connect: { id: event.id }
      },
      activityOwners: {
        connect: [{ id: 'user1' }]
      },
      activityParticipants: {
        connect: [{ id: 'user2' }]
      }
    },
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
