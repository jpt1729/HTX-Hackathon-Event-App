import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllSlugs() {
  try {
    const slugs = await prisma.event.findMany({
      select: {
        slug: true,
      },
    });
    return slugs;
  } catch (error) {
    console.error("Error retrieving slugs: ", error);
  } finally {
    await prisma.$disconnect();
  }
}
export async function getEventData(slug) {
  try {
    const eventData = await prisma.event.findUnique({
      where: {
        slug: slug,
      },
    });
    let processedEventData = {
      eventTime: { startTime: eventData.startTime, endTime: eventData.endTime },
      ...eventData,
    };
    return processedEventData;
  } catch (error) {
    console.error("Error retrieving slugs: ", error);
  } finally {
    await prisma.$disconnect();
  }
}
export async function getActivities(eventId) {
  try {
    const activityData = await prisma.activity.findMany({
      where: { published: true, eventId: eventId },
    });

    let processedActivityData = activityData.map((activity) => {
      return {
        eventTime: {
          startTime: activity.startTime,
          endTime: activity.endTime,
        },
        ...activity,
      };
    });
    console.log(processedActivityData);
    return processedActivityData;
  } catch (error) {
    console.error("Error retrieving slugs: ", error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getParticipantEventsForUser(userId) {
  try {
    const userWithParticipantEvents = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        participantsEvents: true,
      },
    });
    const participantsEvents = userWithParticipantEvents.participantsEvents;
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
export async function addEventToUser(userId, eventId) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        participantsEvents: {
          connect: { id: eventId },
        },
      },
    });
    console.log(`Event ${eventId} added to user ${userId}`);
    return {
      message: "success",
    };
  } catch (error) {
    console.error("Error adding event to user:", error);
    if (error.code === "P2025") {
      return {
        message: "Event does not exist",
      };
    }
  } finally {
    await prisma.$disconnect();
  }
}
