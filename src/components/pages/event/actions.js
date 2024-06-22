"use server";
import { auth } from "@/auth";

import { addEventToUser } from "@/utils/backend-event";
import { updateUserRole, getUserRole } from "@/utils/backend-organizer-events";
//TODO: add errors to front end + build backend protection.
export async function addEventAction(prevState, formData) {
  const session = await auth();
  const userId = session?.user?.id;
  const eventSlug = formData.get("event-slug");
  const res = await addEventToUser(userId, eventSlug);
  
  if (res) {
    return {
      status: 'success',
      message: ''
    }
  }
  return {
    status: '',
    message: ''
  }
}
export async function leaveEventAction(eventId){
  const session = await auth();
  //check if user is banned or is owner
  const userRole = await getUserRole(session.user.id, eventId)
  if (userRole.role === 'banned' || userRole.role === 'owner') {
    return;
  }
  const res = await updateUserRole(session.user.id, undefined, "left", eventId);
  console.log(res)
}