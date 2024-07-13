"use server";
import { auth } from "@/auth";
import {
  getOrganizerEventsForUser,
  getUserEventRole,
  updateUserRole,
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
  console.log(userRole.role !== 'organizer' || userRole.role !== 'owner')
  if (userRole.role !== 'organizer' || userRole.role !== 'owner') {
    return { status: "error", message: "invalid permissions" }; //checks to see if the user is even an owner
  }
  console.log('passed security check')
  try {
    users.map(async (user) => {
      await updateUserRole(user, eventSlug, "organizer");
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
