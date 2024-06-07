"use server";
import { auth } from "@/auth";

import { addEventToUser } from "@/utils/backend-event";
//TODO: add errors to front end + build backend protection.
export async function addEvent(prevState, formData) {
  const session = await auth();
  const userId = session.userId;
  const eventId = formData.get("eventId");
  const res = await addEventToUser(userId, eventId);
  console.log(res)
  return {message: 'hey'}
}
