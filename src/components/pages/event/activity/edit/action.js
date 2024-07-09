"use server";
import { updateActivityContent } from "@/utils/event-backend";
import { auth } from "@/auth";

export async function editMCAction(prevState, formData){
    const activityContentId = formData.get("id")
    const optionsNames = [];
    
    for (let [name] of formData) {
      if (!optionsNames.includes(name) && !(name === 'title') && !(name === 'id') && name.includes("option-")) {
        optionsNames.push(name);
      }
    }
    const title = formData.get("title")
    if (title === "") {
        return {
            status: "error",
            message: "",
            errors: {
                title: "Must have title"
            }
        }
    }
    const updatedMC = {
        title: title,
        content: {
            options: optionsNames.map((optionName) => {
                return formData.get(optionName)
            })
        }
    }
    const session = await auth();
    if (!session) {
        return {
            status: "error",
            message: "You must be logged in",
        }
    }
    const res = await updateActivityContent(activityContentId, session?.user?.id, updatedMC)
    return {
        status: "success",
        message: "Successfully updated multiple choice",
        errors: {}
    }
}
export async function editQAAction(prevState, formData){
    const title = formData.get("title")
    const question = formData.get("question")
    const activityContentId = formData.get("id")
    if (title === "") {
        return {
            status: "error",
            message: "",
            errors: {
                title: "Must have title"
            }
        }
    }
    const updatedQA = {
        title: title,
        content: {
            question: question
        }
    }
    const session = await auth();
    if (!session) {
        return {
            status: "error",
            message: "You must be logged in",
        }
    }
    const res = await updateActivityContent(activityContentId, session?.user?.id, updatedQA)
    return {
        status: "success",
        message: "Successfully updated question and answer",
        errors: {}
    }
}

export async function editMDAction(prevState, formData){
    const title = formData.get("title")
    const markdown = formData.get("markdown")
    const activityContentId = formData.get("id")
    if (title === "") {
        return {
            status: "error",
            message: "",
            errors: {
                title: "Must have title"
            }
        }
    }
    const updatedMD = {
        title: title,
        content: {
            markdown: markdown
        }
    }
    const session = await auth();
    if (!session) {
        return {
            status: "error",
            message: "You must be logged in",
        }
    }
    const res = await updateActivityContent(activityContentId, session?.user?.id, updatedMD)
    return {
        status: "success",
        message: "Successfully updated markdown",
        errors: {}
    }
}