"use server";

export async function action(prevState, formData){

    const title = formData.get("title")

    return {
        status: "success",
        message: ""
    }
}