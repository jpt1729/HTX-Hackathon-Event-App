"use server";
import { auth } from "@/auth";

import { addEventToUser } from "@/utils/backend-event";
//TODO: add errors to front end + build backend protection.
export async function addEvent(prevState, formData) {
  const session = await auth();
  const userId = session.userId;
  const eventId = formData.get("eventId");
  if ((eventId.length !== 25) && (eventId[0] !== 'c')){
    return {
      message: 'Invalid id'
    }
  }
  const res = await addEventToUser(userId, eventId);
  return res
}
