"use server";
import { auth } from "@/auth";
import {
  getOrganizerEventsForUser,
  updateUserRole,
} from "@/utils/backend-organizer-events";

export async function promoteUserAction(prevState, formData) {
  const session = await auth();
  if (!session) return { status: "error", message: "invalid permissions" }; // checks to see if the user is logged in
  const organizerEvents = await getOrganizerEventsForUser(session?.user?.id);
  const userId = formData.get("userId");
  const eventSlug = formData.get("eventSlug");
  if (!organizerEvents.some((event) => event.slug === eventSlug))
    return { status: "error", message: "invalid permissions" }; //checks to see if the user is even an owner
  const res = await updateUserRole(userId, eventSlug, "organizer");
  
  return { status: "success", message: "" }
}

export async function removeUserAction(prevState, formData) {
  const session = await auth();
  if (!session) return { status: "error", message: "invalid permissions" }; // checks to see if the user is logged in
  const organizerEvents = await getOrganizerEventsForUser(session?.user?.id);
  const userId = formData.get("userId");
  const eventSlug = formData.get("eventSlug");
  if (!organizerEvents.some((event) => event.slug === eventSlug))
    return { status: "error", message: "invalid permissions" }; //checks to see if the user is even an owner
  const res = await updateUserRole(userId, eventSlug, "banned");
  
  return { status: "success", message: "" }
}
