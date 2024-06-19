"use server";
import { auth } from "@/auth";
import {
  getOrganizerEventsForUser,
  addUserToEventOrganizers,
} from "@/utils/backend-organizer-events";

export async function promoteUserAction(prevState, formData) {
  const session = await auth();
  if (!session) return { status: "error", message: "invalid permissions" }; // checks to see if the user is logged in
  const organizerEvents = await getOrganizerEventsForUser(session?.user?.id);
  const userId = formData.get("userId");
  const eventSlug = formData.get("eventSlug");
  if (!organizerEvents.some((event) => event.slug === eventSlug))
    return { status: "error", message: "invalid permissions" }; //checks to see if the user is even an owner
  const res = await addUserToEventOrganizers(userId, eventSlug);
  
  return { status: "success", message: "" }
}

export async function removeUserAction(formData) {}
