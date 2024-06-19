"use server";
import { auth } from "@/auth";

import { changeEventContent } from "@/utils/backend-organizer-events";
//TODO: add errors to front end + build backend protection.
export async function editEventContent(prevState, formData) {
  const session = await auth();
  const userId = session?.userId;
  const eventId = formData.get("eventId");
  
  const markdown = formData.get("markdown");
  const res = await changeEventContent(userId, eventId, markdown);
  console.log(res)
  return res
}
