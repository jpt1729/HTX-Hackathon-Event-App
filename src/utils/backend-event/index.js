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
        start: activity.startTime,
        end: activity.endTime,
        ...activity,
      };
    });
    return processedActivityData;
  } catch (error) {
    console.error("Error retrieving slugs: ", error);
  } finally {
    await prisma.$disconnect();
  }
}
export async function getActivityData(activitySlug) {
  try {
    const activityData = await prisma.activity.findUnique({
      where: { published: true, slug: activitySlug },
      include: {
        activitycontent: true,
      },
    });
    let processedActivityData = {
      eventTime: {
        startTime: activityData.startTime,
        endTime: activityData.endTime,
      },
      start: activityData.startTime,
      end: activityData.endTime,
      ...activityData,
    };
    return processedActivityData;
  } catch (error) {
    console.error("Error retrieving slugs: ", error);
  } finally {
    await prisma.$disconnect();
  }
}
export async function getEventsForUser(userId) {
  try {
    const userEvents = await prisma.userEventRole.findMany({
      where: {
        userId: userId,
        NOT: {
          OR: [
            {
              role: "banned",
            },
            {
              role: "left",
            },
          ],
        },
      },
      include: {
        event: true,
      },
    });

    let processedEventData = userEvents.map((eventObject) => {
      const event = eventObject.event;
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
    // Check if the user and event exist
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const event = await prisma.event.findUnique({ where: { slug: eventSlug } });

    if (!user) {
      console.error("User not found");
      return;
    }

    if (!event) {
      console.error("Event not found");
      return;
    }
    // Check if user left
    const userRole = await prisma.UserEventRole.findFirst({
      where: {
        userId: userId,
        eventId: event.id,
      },
    });
    if (userRole) {
      if (userRole.role !== "left") {
        return;
      }
      const res = await prisma.UserEventRole.update({
        where: {
          id: userRole.id,
        },
        data: {
          role: "participant",
        },
      });
      console.log(res);
      return res;
    }
    // Create the UserEventRole entry
    const res = await prisma.userEventRole.create({
      data: {
        userId: userId,
        eventId: event.id,
        role: "participant", // Setting the role as 'participant'
      },
    });
    console.log(`Event ${eventSlug} added to user ${userId}`);
    return res;
  } catch (error) {
    console.error("Error adding event to user:", error);

    return error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getEventParticipants(eventId, eventSlug) {
  try {
    let query = { id: eventId };
    if (eventSlug) {
      query = { slug: eventSlug };
    }
    const eventParticipants = await prisma.event.findUnique({
      where: query,
      include: {
        eventParticipants: {
          include: {
            user: true,
          },
          where: {
            NOT: {
              OR: [{ role: "banned" }, { role: "left" }],
            },
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

export async function createActivityContentResponse(
  activitycontentId,
  userId,
  response
) {
  try {
    const activityContentResponse =
      await prisma.activityContentResponses.create({
        data: {
          activitycontentId: activitycontentId,
          userId: userId,
          response: response,
        },
      });

    console.log("ActivityContentResponse created:", activityContentResponse);
    return activityContentResponse;
  } catch (error) {
    console.error("Error creating ActivityContentResponse:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
export async function getActivityParticipants(activityId, activitySlug) {
  try {
    let query = { id: activityId };
    if (activitySlug) {
      query = { slug: activitySlug };
    }
    const activityParticipants = await prisma.activity.findUnique({
      where: query,
      include: {
        activityParticipants: {
          include: {
            user: true,
          },
          where: {
            NOT: {
              role: "banned",
            },
          },
        },
      },
    });
    console.log(activityParticipants)
    const activityParticipantsUsers = activityParticipants.activityParticipants.map(
      (relation) => {
        return {
          role: relation.role,
          ...relation.user,
        };
      }
    );
    return activityParticipantsUsers;
  } catch (error) {
    console.error("Error fetching activity participants:", error);
  } finally {
    await prisma.$disconnect();
  }
}
export async function getUserActivityRole(userId, activityId, activitySlug) {
  try {
    let query = { id: activityId };
    if (activitySlug) {
      query = { slug: activitySlug };
    }
    const activityParticipants = await prisma.activity.findUnique({
      where: query,
      include: {
        activityParticipants: {
          include: {
            user: true,
          },
          where: {
            NOT: {
              role: "banned",
            },
          },
        },
      },
    });
    console.log(activityParticipants)
    const activityParticipantsUsers = activityParticipants.activityParticipants.map(
      (relation) => {
        return {
          role: relation.role,
          ...relation.user,
        };
      }
    );
    return activityParticipantsUsers;
  } catch (error) {
    console.error("Error fetching activity participants:", error);
  } finally {
    await prisma.$disconnect();
  }
}