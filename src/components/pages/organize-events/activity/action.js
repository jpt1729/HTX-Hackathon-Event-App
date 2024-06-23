import { auth } from "@/auth";

export default async function createActivityAction(prevState, formData) {
  const title = formData.get("title"); // test too long

  const description = formData.get("description");
  const startTime = new Date(formData.get("start-time"));
  const endTime = new Date(formData.get("end-time"));

  const slug = formData.get("slug");
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
  if (description.length > 250) {
    state.status = "error";
    state.errors["description"] = "Description too long";
  }
  const session = await auth();
  return {
    status: "",
    message: "",
    errors: {},
  };
}
