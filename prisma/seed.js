const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      email: "alice@example.com",
      name: "Alice",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "bob@example.com",
      name: "Bob",
    },
  });

  // Create events
  const event1 = await prisma.event.create({
    data: {
      title: "Conference 2024",
      description: "Annual Tech Conference",
      content: "Details about the conference...",
      location: {
        address: "401 Franklin St, Houston, TX 77201, USA",
        googleMapsLink: "https://maps.app.goo.gl/WWfBrhsYFanNg8ZK8",
      },
      startTime: new Date("2024-09-15T09:00:00.000Z"),
      endTime: new Date("2024-09-15T17:00:00.000Z"),
      published: true,
      eventParticipants: {
        create: [
          {
            user: { connect: { id: user1.id } },
            role: "organizer",
          },
          {
            user: { connect: { id: user2.id } },
            role: "participant",
          },
        ],
      },
    },
  });

  // Create activities for the event
  const activity1 = await prisma.activity.create({
    data: {
      eventId: event1.id,
      title: "Keynote Speech",
      description: "Opening keynote speech by industry leader",
      content: {},
      startTime: new Date("2024-09-15T10:00:00.000Z"),
      endTime: new Date("2024-09-15T11:00:00.000Z"),
      published: true,
      activityParticipants: {
        create: [
          {
            user: { connect: { id: user1.id } },
            role: "speaker",
          },
          {
            user: { connect: { id: user2.id } },
            role: "attendee",
          },
        ],
      },
    },
  });

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
