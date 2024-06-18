"use server";
import { auth } from "@/auth";

import { addEventToUser } from "@/utils/backend-event";
//TODO: add errors to front end + build backend protection.
export async function addEvent(prevState, formData) {
  const session = await auth();
  const userId = session.userId;
  const eventSlug = formData.get("event-slug");
  const res = await addEventToUser(userId, eventSlug);
  const success = userId === res.id // on success returns user object
  if (success) {
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
