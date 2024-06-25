"use server";
import { auth } from "@/auth";
import {
  getOrganizerEventsForUser,
  updateUserRole,
} from "@/utils/backend-organizer-events";

export async function promoteUserAction(prevState, formData) {
  const session = await auth();
  if (!session) {
    // checks to see if the user is logged in
    return {
      status: "error",
      message: "invalid permissions",
    };
  }

  const organizerEvents = await getOrganizerEventsForUser(session?.user?.id);

  const userId = formData.get("userId");
  const eventSlug = formData.get("eventSlug");

  if (!organizerEvents.some((event) => event.slug === eventSlug))
    return { status: "error", message: "invalid permissions" }; //checks to see if the user is even an owner

  try {
    await updateUserRole(userId, eventSlug, "organizer");

    return {
      status: "success",
      message: "Successfully promoted user to organizer",
    };
  } catch (error) {
    return {
      status: "error",
      message: error,
    };
  }
}

export async function removeUserAction(prevState, formData) {
  const session = await auth();

  if (!session) {
    // checks to see if the user is logged in
    return { 
      status: "error", 
      message: "invalid permissions" 
    };
  };

  const organizerEvents = await getOrganizerEventsForUser(session?.user?.id);
  const userId = formData.get("userId");
  const eventSlug = formData.get("eventSlug");
  
  if (!organizerEvents.some((event) => event.slug === eventSlug)) {
    //checks to see if the user is even an owner
    return {
      status: "error",
      message: "invalid permissions",
    };
  }
  try {
    await updateUserRole(userId, eventSlug, "banned");

    return { status: "success", message: "Successfully banned user" };
  } catch (error) {
    return {
      status: "error",
      message: error,
    };
  }
}

export async function demoteUserAction(prevState, formData) {
  const session = await auth();
  if (!session) {
    // checks to see if the user is logged in
    return {
      status: "error",
      message: "invalid permissions",
    };
  }

  const organizerEvents = await getOrganizerEventsForUser(session?.user?.id);
  const userId = formData.get("userId");
  const eventSlug = formData.get("eventSlug");

  if (!organizerEvents.some((event) => event.slug === eventSlug)) {
    //checks to see if the user is even an owner
    return { status: "error", message: "invalid permissions" };
  }

  try {
    await updateUserRole(userId, eventSlug, "participant");

    return { status: "success", message: "Successfully demoted user" };
  } catch (error) {
    return {
      status: "error",
      message: error,
    };
  }
}
