"use server";
import { createNewEvent } from "@/utils/event-backend";

import { redirect } from "next/navigation";
import { auth } from "@/auth";

export async function createEventAction(prevState, formData) {
  let state = {
    status: "success",
    message: "",
    errors: {},
  };
  const title = formData.get("title"); // test too long

  const description = formData.get("description");
  const startTime = new Date(formData.get("start-time"));
  const endTime = new Date(formData.get("end-time"));
  const address = formData.get("address");
  const googleMapsLink = formData.get("google-maps-link");

  const slug = formData.get("slug");

  const session = await auth();

  if (!session) {
    state.status = "error";
    state.message = "You must be logged in";
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
  if (description.length > 500) {
    state.status = "error";
    state.errors["description"] = "Description too long";
  }
  const res = await createNewEvent({
    title,
    slug,
    description,
    startTime,
    endTime,
  })
  if (res.status !== 'error'){
    redirect(`/organize-events/${eventSlug}/activity/${slug}`)
  }
  if (res.status === 'error') {
    if (res.error.code === 'P2002') {
        state.status = "error";
        state.errors["slug"] = "slug in use!";
    }
  }
  return state;
}
