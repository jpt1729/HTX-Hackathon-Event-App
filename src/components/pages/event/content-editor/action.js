"use server";
import { auth } from "@/auth";
import sanitizeHtml from 'sanitize-html';
import { updateEventContent, getUserEventRole } from "@/utils/event-backend";

//TODO: add errors to front end + build backend protection.
export async function editEventContent(prevState, formData) {
  const session = await auth();
  const userId = session?.userId;
  const eventId = formData.get("eventId");
  const userRole = getUserEventRole(userId, eventId)

  if (!(userRole.role === 'organizer' || userRole.role === 'owner')){
    return;
  }

  const dirtyContent = formData.get("content");
  const cleanContent = sanitizeHtml(dirtyContent)
  const res = await updateEventContent(userId, eventId, cleanContent);
  return res
}