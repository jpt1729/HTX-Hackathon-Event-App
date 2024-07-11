import { PrismaClient } from "@prisma/client";
import { cache } from "react";
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())

export const revalidate = 600;

export const getActivities = async (eventId) => {
  try {
    const activityData = await prisma.activity.findMany({
      where: { published: true, eventId: eventId },
      cacheStrategy: {
        swr: 60,
      },
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
};

export const getActivityData = async (activitySlug) => {
  try {
    const activityData = await prisma.activity.findUnique({
      where: { published: true, slug: activitySlug },
      include: {
        activitycontent: {
          orderBy: {
            order: "desc",
          },
        },
      },
      cacheStrategy: {
        swr: 60,
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
};

export const getActivityParticipants = async (activityId, activitySlug) => {
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
      cacheStrategy: {
        swr: 60,
      },
    });
    console.log(activityParticipants);
    const activityParticipantsUsers =
      activityParticipants.activityParticipants.map((relation) => {
        return {
          role: relation.role,
          ...relation.user,
        };
      });
    return activityParticipantsUsers;
  } catch (error) {
    console.error("Error fetching activity participants:", error);
  } finally {
    await prisma.$disconnect();
  }
};

export const getUserActivityRole = async (userId, activityId) => {
  try {
    const userActivityRole = await prisma.userActivityRole.findFirst({
      where: {
        activityId: activityId,
        userId: userId,
      },
      cacheStrategy: {
        swr: 60,
      },
    });

    return userActivityRole;
  } catch (error) {
    console.error("Error fetching activity participants:", error);
  } finally {
    await prisma.$disconnect();
  }
};

export const getActivityContentById = async (activityContentId) => {
  try {
    const activityContent = await prisma.activityContent.findUnique({
      where: { id: activityContentId },
      cacheStrategy: {
        swr: 60,
      },
    });

    if (!activityContent) {
      throw new Error(
        `ActivityContent with ID "${activityContentId}" not found`
      );
    }
    return activityContent;
  } catch (error) {
    console.error("Error fetching ActivityContent:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export const getActivityResponses = async (activitySlug, search) => {
  try {
    const activity = await prisma.activity.findUnique({
      where: {
        slug: activitySlug,
      },
    });

    if (!activity) {
      throw new Error(`Activity with slug ${activitySlug} not found`);
    }
    let whereClause = {
      activitycontent: {
        activityId: activity.id,
      },
    };
    if (search.id) {
      whereClause.activitycontentId = search.id;
    }
    let orderBy = [];
    if (search.sort === "ascending") {
      orderBy.push({ createdAt: "asc" });
    } else if (search.sort === "descending") {
      orderBy.push({ createdAt: "desc" });
    }
    const responses = await prisma.activityContentResponses.findMany({
      where: whereClause,
      orderBy: orderBy,
      include: {
        user: true,
        activitycontent: true,
      },
      cacheStrategy: {
        swr: 60,
      },
    });

    return responses;
  } catch (error) {
    console.error("Error retrieving activity responses:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export async function updateActivityContent(
  activityContentId,
  userId,
  updatedData
) {
  try {
    const activityContent = await prisma.activityContent.findUnique({
      where: { id: activityContentId },
      include: {
        activity: {
          include: {
            activityParticipants: {
              where: { userId: userId },
              select: { role: true },
            },
          },
        },
      },
    });
    if (!activityContent) {
      throw new Error("ActivityContent not found");
    }

    const userRole = activityContent.activity.activityParticipants[0]?.role;

    if (!(userRole === "organizer" || userRole === "owner")) {
      throw new Error(
        "User does not have permission to update this activity content"
      );
    }

    const updatedActivityContent = await prisma.activityContent.update({
      where: { id: activityContentId },
      data: updatedData,
    });
    console.log(updatedActivityContent);
    return updatedActivityContent;
  } catch (error) {
    console.error("Error updating ActivityContent:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
export async function deleteActivityResponses(responseIds) {
  try {
    const deleteResult = await prisma.activityContentResponses.deleteMany({
      where: {
        id: {
          in: responseIds,
        },
      },
    });

    return deleteResult;
  } catch (error) {
    console.error("Error deleting activity responses:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteActivityContent(activityContentId, userId) {
  try {
    // Fetch the activity content to get the associated activity ID
    const activityContent = await prisma.activityContent.findUnique({
      where: { id: activityContentId },
      include: { activity: true },
    });

    if (!activityContent) {
      throw new Error("Activity content not found.");
    }

    const activityId = activityContent.activityId;

    // Check if the user is an organizer or owner of the associated activity
    const userActivityRole = await prisma.userActivityRole.findFirst({
      where: {
        activityId: activityId,
        userId: userId,
        role: {
          in: ["organizer", "owner"],
        },
      },
    });

    if (!userActivityRole) {
      throw new Error(
        "User is not an organizer or owner of the associated activity."
      );
    }

    // Delete activity content responses associated with the activity content
    await prisma.activityContentResponses.deleteMany({
      where: {
        activitycontentId: activityContentId,
      },
    });

    // Delete the activity content
    await prisma.activityContent.delete({
      where: {
        id: activityContentId,
      },
    });

    return "Activity content and related data deleted successfully.";
  } catch (error) {
    console.error("Error deleting activity content:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function createNewActivityContent(
  activityId,
  content,
  type,
  title = null
) {
  try {
    // Create the activity content
    const newActivityContent = await prisma.activityContent.create({
      data: {
        content: content,
        type: type,
        title: title,
        activity: {
          connect: {
            id: activityId,
          },
        },
      },
    });

    return newActivityContent;
  } catch (error) {
    console.error("Error creating activity content:", error);
    throw error;
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
      error: error,
    };
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
export async function updateActivityContentOrder(id, change) {
  // Fetch the current activitycontent record
  const currentContent = await prisma.activityContent.findUnique({
    where: { id: id },
  });

  if (!currentContent) {
    throw new Error(`ActivityContent with id ${id} not found`);
  }

  // Determine the target order value
  let targetOrder = currentContent.order + change;

  // Fetch the min and max order values
  const { _min, _max } = await prisma.activityContent.aggregate({
    _min: { order: true },
    _max: { order: true },
  });

  // Ensure the target order is within the valid range
  if (targetOrder < _min.order || targetOrder > _max.order) {
    throw new Error(`Target order value '${targetOrder}' is out of range`);
  }

  // Find the record with the target order value
  const targetContent = await prisma.activityContent.findFirst({
    where: { order: targetOrder },
  });

  if (!targetContent) {
    throw new Error(`ActivityContent with order ${targetOrder} not found`);
  }

  // Perform the order swap
  await prisma.$transaction([
    prisma.activityContent.update({
      where: { id: currentContent.id },
      data: { order: targetOrder },
    }),
    prisma.activityContent.update({
      where: { id: targetContent.id },
      data: { order: currentContent.order },
    }),
  ]);

  console.log(
    `Order of ActivityContent with id ${id} updated to ${targetOrder}`
  );
}
