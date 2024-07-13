"use server";
import { auth } from "@/auth";
import {
  getOrganizerEventsForUser,
  getUserEventRole,
  updateUserEventRole,
} from "@/utils/event-backend";
export const promoteUserAction = () => {}

export async function promoteUsersAction(users, eventSlug) {
  const session = await auth();
  if (!session) {
    // checks to see if the user is logged in
    return {
      status: "error",
      message: "invalid permissions",
    };
  }
  const userRole = await getUserEventRole(session?.user?.id, undefined, eventSlug)

  if (!(userRole.role === 'organizer' || userRole.role === 'owner')) {
    return { status: "error", message: "invalid permissions" }; //checks to see if the user is even an owner
  }

  try {
    users.map(async (user) => {
      await updateUserEventRole(user, eventSlug, "organizer");
      console.log(`${user} promoted to organizer`)
    })
  
    return {
      status: "success",
      message: "Successfully promoted users to organizer",
    };
  } catch (error) {
    return {
      status: "error",
      message: error,
    };
  }
}
export async function demoteUsersAction(users, eventSlug) {
  const session = await auth();
  if (!session) {
    // checks to see if the user is logged in
    return {
      status: "error",
      message: "invalid permissions",
    };
  }
  const userRole = await getUserEventRole(session?.user?.id, undefined, eventSlug)

  if (!(userRole.role === 'organizer' || userRole.role === 'owner')) {
    return { status: "error", message: "invalid permissions" }; //checks to see if the user is even an owner
  }

  try {
    users.map(async (user) => {
      await updateUserEventRole(user, eventSlug, "participant");
      console.log(`${user} updated to participant`)
    })
  
    return {
      status: "success",
      message: "Successfully updated users to participants",
    };
  } catch (error) {
    return {
      status: "error",
      message: error,
    };
  }
}
export async function banUsersAction(users, eventSlug) {
  const session = await auth();
  if (!session) {
    // checks to see if the user is logged in
    return {
      status: "error",
      message: "invalid permissions",
    };
  }
  const userRole = await getUserEventRole(session?.user?.id, undefined, eventSlug)

  if (!(userRole.role === 'organizer' || userRole.role === 'owner')) {
    return { status: "error", message: "invalid permissions" }; //checks to see if the user is even an owner
  }

  try {
    users.map(async (user) => {
      await updateUserEventRole(user, eventSlug, "banned");
      console.log(`${user} updated to banned`)
    })
  
    return {
      status: "success",
      message: "Successfully updated users to banned",
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
    await updateUserEventRole(userId, eventSlug, "banned");

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
