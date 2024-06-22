const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
let userId = "clxm2u5r10000o8cmmr0zto3t";
let eventId = "clxm2ln07000212odx9q4h6dq";

async function addUserToEventAsParticipant(userId, eventId) {
  try {
    // Check if the user and event exist
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const event = await prisma.event.findUnique({ where: { id: eventId } });

    if (!user) {
      console.error("User not found");
      return;
    }

    if (!event) {
      console.error("Event not found");
      return;
    }

    // Create the UserEventRole entry
    const userEventRole = await prisma.userEventRole.create({
      data: {
        userId: userId,
        eventId: eventId,
        role: "participant", // Setting the role as 'participant'
      },
    });

    console.log("User added to event as participant:", userEventRole);
  } catch (error) {
    console.error("Error adding user to event:", error);
  } finally {
    await prisma.$disconnect();
  }
}
async function createEvent() {
  const event = await prisma.event.create({
    data: {
      title: "Conference 2025",
      description: "Annual Tech Conference",
      content: "Details about the conference...",
      location: {
        address: "401 Franklin St, Houston, TX 77201, USA",
        googleMapsLink: "https://maps.app.goo.gl/WWfBrhsYFanNg8ZK8",
      },
      startTime: new Date("2024-09-15T09:00:00.000Z"),
      endTime: new Date("2024-09-15T17:00:00.000Z"),
      published: true,
    },
  });
  console.log(event);
}
async function getEventParticipants(eventId) {
  try {
    const eventParticipants = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        eventParticipants: {
          include: {
            user: true,
          },
        },
      },
    });
    const eventParticipantsUsers = eventParticipants.eventParticipants.map(
      (relation) => {
        return {
          role: relation.role,
          ...relation.user,
        };
      }
    );
    return eventParticipantsUsers;
  } catch (error) {
    console.error("Error fetching event participants:", error);
  } finally {
    await prisma.$disconnect();
  }
}
async function test() {
  /*
  const isOwner = await prisma.UserEventRole.findFirst({
    where: {
      userId: userId,
      OR: [
        {
          role: "organizer"
        },
        {
          role: "owner"
        }
      ]
    },
  });
  console.log(isOwner)*/
  const userRecord = await prisma.userEventRole.findFirst({
    where: {
      userId: userId,
    },
  });
  const updatedUserEventRole = await prisma.userEventRole.update({
    where: {
      id: userRecord.id,
    },
    data: {
      role: "owner",
    },
  });
  console.log(updatedUserEventRole);
}

async function createActivity() {
  const eventId = "clxm2ln07000212odx9q4h6dq";

  // Create the activity
  const activity = await prisma.activity.create({
    data: {
      eventId: eventId,
      slug: "new-activity-slug", // Make sure this is unique
      published: true,
      title: "New Activity Title",
      description: "This is a description for the new activity.",
      startTime: new Date("2024-07-01T10:00:00.000Z"), // Adjust as necessary
      endTime: new Date("2024-07-01T12:00:00.000Z"), // Adjust as necessary
    },
  });

  // Create the activity content
  const activityContent = await prisma.activityContent.create({
    data: {
      activityId: activity.id,
      title: "Activity Content Title",
      type: "md", // or "QA" or "Multiple Choice" as needed
      content: {
        markdown: "# This is the markdown content", // Adjust as necessary
      },
    },
  });

  console.log("Activity created:", activity);
  console.log("Activity content created:", activityContent);
}

async function addActivity(id, activity) {
  const activityContent = await prisma.activityContent.create({
    data: {
      activityId: id,
      ...activity,
    },
  });

  console.log("Activity content created:", activityContent);
}
addActivity("clxpnndm00001t1ddzbu7sbq9", {
  type: "MC",
  title: "Preferred Code Editor",
  content: {
    options: ["VS Code", "Sublime Text", "Atom", "PyCharm"],
  },
});
