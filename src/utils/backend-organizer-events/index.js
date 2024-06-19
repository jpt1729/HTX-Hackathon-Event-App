import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function userRole(userId, eventId, eventSlug = null){
  let trueEventId = eventId;
  if (eventSlug){
    const event = await prisma.event.findUnique({ where: { slug: eventSlug } });
    trueEventId = event.id
  }
  const res = await prisma.UserEventRole.findFirst({
    where: {
      userId: userId,
      eventId: trueEventId,
    },
  });
  return res;
}
export async function getOrganizerEventsForUser(userId) {
  try {
    const organizerEventsForUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        events: {
          where: {
            OR: [{ role: "organizer" }, { role: "owner" }],
          },
          include: {
            event: true
          }
        },
      },
    });
    let processedEventData = organizerEventsForUser.events.map((relation) => {
      let event = relation.event
      return {
        eventTime: {
          startTime: event.startTime,
          endTime: event.endTime,
        },
        ...event,
      };
    });

    return processedEventData;
  } catch (error) {
    console.error("Error fetching participant events:", error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function changeEventContent(userId, eventId, updatedMarkdown) {
  // Check if the user is an eventOwner
  const isOwner = await prisma.UserEventRole.findFirst({
    where: {
      userId: userId,
      eventId: eventId,
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

  if (!isOwner) {
    return {
      message: 'User is not an event owner'
    }
    
  }

  // Update the event content
  const updatedEvent = await prisma.event.update({
    where: {
      id: eventId,
    },
    data: {
      content: updatedMarkdown,
    },
  });

  return updatedEvent;

}
export async function updateUserRole(userId, eventSlug, newRole) {
  try {
    const event = await prisma.event.findUnique({ where: { slug: eventSlug } });
    const userRecord = await prisma.userEventRole.findFirst({
      where: {
        userId: userId,
        eventId: event.id,
      }
    })
    const res = await prisma.userEventRole.update({
      where: {
        id: userRecord.id,
      },
      data: {
        role: newRole,
      },
    });
    console.log(`Updated ${userId} to ${newRole} for ${event.id} at ${userRecord.id}`);
    return res
  } catch (error) {
    console.error("Error adding event to user:", error);
    
    return error
  } finally {
    await prisma.$disconnect();
  }
}