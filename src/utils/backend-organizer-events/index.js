import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getOrganizerEventsForUser(userId) {
  try {
    const userWithParticipantEvents = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        organizerEvents: true,
      },
    });
    const participantsEvents = userWithParticipantEvents.organizerEvents;
    let processedEventData = participantsEvents.map((event) => {
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
  const isOwner = await prisma.event.findFirst({
    where: {
      id: eventId,
      eventOwners: {
        some: {
          id: userId,
        },
      },
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