"use server";
import { createNewEvent } from "@/utils/backend-organizer-events";

import { redirect } from "next/navigation";
import { auth } from "@/auth";

const dummyFunction = (
  userId,
  title,
  description,
  startTime,
  endTime,
  address,
  googleMapsLink,
  slug
) => {
  console.log("run");
};

export async function createEventAction(prevState, formData) {
  console.log("running");
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
  try {
    const res = await createNewEvent(
      session?.user?.id,
      title,
      description,
      startTime,
      endTime,
      address,
      googleMapsLink,
      slug
    );
    
  } catch (error) {
    console.log(error);
    return {
      state: "error",
      message: error,
      ...state,
    };
  }
  if (state.status === "success") {
    redirect(`/organize-events/${slug}`);
  }
  return state;
}
