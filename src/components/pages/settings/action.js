"use server";
import { auth } from "@/auth";
import { updateUser } from "@/utils/user-backend";

export async function updateSettingsAction(prevState, formData) {
    let state = {
        status: "",
        message: "",
        errors: {},
      };

  const name = formData.get("name");
  const description = formData.get("description");

  if (description.length < 500) {
    state.status = "error";
    state.errors["description"] = "Description too long";
  }
  if (name.length < 120) {
    state.status = "error";
    state.errors["name"] = "Name cannot be longer than 120 characters";
  }
  const session = await auth();

  if (!session) {
    state.status = "error";
    state.message = "You must be logged in"
  }
  try {
    await updateUser(session?.userId, name, description)
  } catch (error) {
    state.status = "error"
    state.message = "an unknown error has happened"
    console.log(error)
  }
  return state
}
