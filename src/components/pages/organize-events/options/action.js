"use server";
import {
  getUserRole,
  updateEventInfo,
  updateUserRole,
} from "@/utils/backend-organizer-events";
import { auth } from "@/auth";

export async function optionsFormAction(prevState, formData) {
  let state = {
    status: "success",
    message: "",
    errors: {},
  };
  const title = formData.get("title"); // test too long
  const description = formData.get("description"); // test too long
  const startTime = new Date(formData.get("start-time"));
  const endTime = new Date(formData.get("end-time"));
  const address = formData.get("address");
  const googleMapsLink = formData.get("google-maps-link");
  const slug = formData.get("slug");

  const eventId = formData.get("event-id");
  const session = await auth();
  const userRole = await getUserRole(session.user.id, eventId);

  if (!(userRole.role === "owner" || userRole.role === "organizer")) {
    state.status = "error";
    state.message = "Insufficient permission";
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    state.status = "error";
    state.errors["slug"] = "Invalid slug"
  }
  if (isNaN(startTime.getTime())) {
    state.status = "error";
    state.errors["start-time"] = "Invalid start time"
    // Handle error case, perhaps show a message to the user
  }
  if (isNaN(endTime.getTime())) {
    state.status = "error";
    state.errors["end-time"] = "Invalid end time"
    // Handle error case, perhaps show a message to the user
  }
  if (endTime <= startTime) {
    state.status = "error";
    state.errors["end-time"] = 'End time must be after start time';
    // Handle error case, perhaps show a message to the user
  }
  if (!/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(googleMapsLink)){
    state.status = "error";
    state.errors["google-maps-link"] = 'Invalid URL';
  }

  if (state.status === "success") {
    updateEventInfo(
      eventId,
      title,
      description,
      startTime,
      endTime,
      address,
      googleMapsLink,
      slug
    );
    return {
        status: 'success',
        message: '',
        errors: {}
    }
  }
  return state
}
