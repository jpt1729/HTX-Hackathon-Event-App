import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

export const revalidate = 3600;

export async function getAllEventSlugs() {
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
export const getEventData = async (slug) => {
  try {
    const eventData = await prisma.event.findUnique({
      where: {
        slug: slug,
      },
      cacheStrategy: {
        swr: 60,
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
};
export const getEventsForUser = async (userId) => {
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
      cacheStrategy: {
        swr: 60,
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
};
export const getEventParticipants = async (eventId, eventSlug, search = {}) => {
  try {
    let query = { where: { id: eventId } };
    if (eventSlug) {
      query = { where: { slug: eventSlug } };
    }
    let filters = {
      where: {
        NOT: {
          OR: [{ role: "banned" }, { role: "left" }],
        },
      },
    };
    if (search.sort) {
      filters = {
        ...filters,
        orderBy: {
          createdAt: search.sort === "ascending" ? "asc" : "desc",
        },
      };
    }
    if (search.role) {
      filters = {
        ...filters,
        where: {
          role: search.role,
        },
      };
    }
    if (search.search) {
      filters = {
        ...filters,
        where: {
          ...filters.where,
          user: {
            OR: [
              { email: {startsWith: search.search } },
              { name: { startsWith: search.search } },
            ],
          },
        },
      };
    }
    const eventParticipants = await prisma.event.findUnique({
      ...query,
      include: {
        eventParticipants: {
          include: {
            user: true,
          },

          ...filters,
        },
      },
      cacheStrategy: {
        swr: 60,
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
};
export const getUserEventRole = async (
  userId,
  eventId,
  eventSlug = null,
  includeEventData = false
) => {
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
    cacheStrategy: {
      swr: 60,
    },
  });
  return res;
};
export const getOrganizerEventsForUser = async (userId) => {
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
      cacheStrategy: {
        swr: 60,
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
};
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
export async function updateEventContent(userId, eventId, updatedMarkdown) {
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
export async function updateUserEventRole(
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
        eventId: queryEventId,
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

    return { status: "error", error: error };
  } finally {
    await prisma.$disconnect();
  }
}
