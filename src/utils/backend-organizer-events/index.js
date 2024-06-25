import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserRole(
  userId,
  eventId,
  eventSlug = null,
  includeEventData = false
) {
  let trueEventId = eventId;
  if (eventSlug) {
    const event = await prisma.event.findUnique({ where: { slug: eventSlug } });
    trueEventId = event.id;
  } else {
    if (includeEventData) {
      const event = await prisma.event.findUnique({ where: { id: eventId } });
    }
  }
  const res = await prisma.UserEventRole.findFirst({
    where: {
      userId: userId,
      eventId: trueEventId,
    },
    include: {
      event: includeEventData,
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
            event: true,
          },
        },
      },
    });
    let processedEventData = organizerEventsForUser.events.map((relation) => {
      let event = relation.event;
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
          role: "organizer",
        },
        {
          role: "owner",
        },
      ],
    },
  });

  if (!isOwner) {
    return {
      message: "User is not an event owner",
    };
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
export async function updateUserRole(
  userId,
  eventSlug,
  newRole,
  eventId = null
) {
  try {
    let queryEventId = eventId;
    if (!eventId) {
      const event = await prisma.event.findUnique({
        where: { slug: eventSlug },
      });
      queryEventId = event.id;
    }
    const userRecord = await prisma.userEventRole.findFirst({
      where: {
        userId: userId,
        eventId: queryEventId
      },
    });
    const res = await prisma.userEventRole.update({
      where: {
        id: userRecord.id,
      },
      data: {
        role: newRole,
      },
    });
    console.log(
      `Updated ${userId} to ${newRole} for ${queryEventId} at ${userRecord.id}`
    );
    return res;
  } catch (error) {
    console.error("Error updating user role:", error);

    return error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateEventInfo(
  eventId,
  title,
  description,
  startTime,
  endTime,
  address,
  googleMapsLink,
  slug
) {
  try {
    const res = await prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        title: title,
        description: description,
        startTime: startTime,
        endTime: endTime,
        location: {
          address: address,
          googleMapsLink: googleMapsLink,
        },
        slug: slug,
      },
    });
    return res;
  } catch (error) {
    console.error("Error updating event info: ", error);

    return error;
  } finally {
    await prisma.$disconnect();
  }
}
export async function createNewEvent(
  userId,
  title,
  description,
  startTime,
  endTime,
  address,
  googleMapsLink,
  slug
) {
  try {
    const res = await prisma.event.create({
      data: {
        title: title,
        description: description,
        startTime: startTime,
        endTime: endTime,
        published: false,
        location: {
          address: address,
          googleMapsLink: googleMapsLink,
        },
        slug: slug,
        eventParticipants: {
          create: [
            {
              user: { connect: { id: userId } },
              role: "owner",
            },
          ],
        },
      },
    });
    return res;
  } catch (error) {
    console.error("Error creating a new event: ", error);

    return {status: 'error',
      error: error
    };
  } finally {
    await prisma.$disconnect();
  }
}

export async function createActivity(eventSlug, activityData) {
  try {
    // Find the event by its slug
    const eventAndUsers = await prisma.event.findUnique({
      where: { slug: eventSlug },
      include: {
        eventParticipants: {
          where: {
            role: {
              in: ["organizer", "owner"],
            },
          },
          select: {
            userId: true,
          },
        },
      },
    });
    if (!eventAndUsers) {
      throw new Error("Event not found");
    }

    // Create the new activity associated with the event

    const newActivity = await prisma.activity.create({
      data: {
        title: activityData.title,
        description: activityData.description,
        startTime: new Date(activityData.startTime),
        endTime: new Date(activityData.endTime),
        slug: activityData.slug,
        event: {
          connect: { id: eventAndUsers.id },
        },
        activityParticipants: {
          create: eventAndUsers.eventParticipants.map((user) => {
            return {
              user: { connect: { id: user.userId } },
              role: "organizer",
            };
          }),
        },
      },
    });

    console.log("New activity created:", newActivity);
    return newActivity;
  } catch (error) {
    console.error("Error creating activity:", error);
    return {
      status: "error",
      error: error
    }
  }
}
export async function getActivities(eventId) {
  try {
    const activityData = await prisma.activity.findMany({
      where: { eventId: eventId },
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
    return {
      status: "error",
      error: error
    }
  } finally {
    await prisma.$disconnect();
  }
}
export async function getActivityData(activitySlug) {
  try {
    const activityData = await prisma.activity.findUnique({
      where: { slug: activitySlug },
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