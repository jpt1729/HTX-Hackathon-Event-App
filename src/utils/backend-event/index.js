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
export async function addEventToUser(userId, eventSlug) {
  try {
    const res = await prisma.user.update({
      where: { id: userId },
      data: {
        participantsEvents: {
          connect: { slug: eventSlug },
        },
      },
    });
    console.log(`Event ${eventSlug} added to user ${userId}`);
    return res
  } catch (error) {
    console.error("Error adding event to user:", error);
    
    return error
  } finally {
    await prisma.$disconnect();
  }
}

export async function getEventParticipants(eventId){
  try {
    const eventPartcipants = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        eventParticipants: true,
      },
    });

    return eventPartcipants;
  } catch (error) {
    console.error("Error fetching event participants:", error);
  } finally {
    await prisma.$disconnect();
  }
}
export async function getEventOwners(eventId){
  try {
    const eventPartcipants = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        eventOwners: true,
      },
    });

    return eventPartcipants;
  } catch (error) {
    console.error("Error fetching event participants:", error);
  } finally {
    await prisma.$disconnect();
  }
}