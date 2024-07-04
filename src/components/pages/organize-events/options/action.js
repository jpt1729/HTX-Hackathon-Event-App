"use server";
import {
  getUserRole,
  updateEventInfo,
  updateUserRole,
} from "@/utils/event-backend";

import { redirect } from "next/navigation";
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

  const userRole = await getUserRole(session.user.id, eventId, null, true);

  const oldEventData = userRole.event;

  if (!(userRole.role === "owner" || userRole.role === "organizer")) {
    state.status = "error";
    state.message = "Insufficient permission";
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    state.status = "error";
    state.errors["slug"] = "Invalid slug";
  }
  if (isNaN(startTime.getTime())) {
    state.status = "error";
    state.errors["start-time"] = "Invalid start time";
    // Handle error case, perhaps show a message to the user
  }
  if (isNaN(endTime.getTime())) {
    state.status = "error";
    state.errors["end-time"] = "Invalid end time";
    // Handle error case, perhaps show a message to the user
  }
  if (endTime <= startTime) {
    state.status = "error";
    state.errors["end-time"] = "End time must be after start time";
    // Handle error case, perhaps show a message to the user
  }
  if (!/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(googleMapsLink)) {
    state.status = "error";
    state.errors["google-maps-link"] = "Invalid URL";
  }
  if (description.length < 500) {
    state.status = "error";
    state.errors["description"] = "Description too long";
  }
  if (state.status === "success") {
    try {
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
      if (slug !== oldEventData.slug) {
        redirect(`/organize-events/${slug}/options?slug-change=true`);
      }
      return {
        status: "success",
        message: "Settings updated successfully!",
        errors: {},
      };
    } catch (error) {
      return {
        status: "error",
        message: error,
        errors: {},
      };
    }
  }
  return state;
}
