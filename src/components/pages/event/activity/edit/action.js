"use server";
import { updateActivityContent } from "@/utils/activity-backend";
import sanitizeHtml from 'sanitize-html';

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
    const dirtyContent = formData.get("content")
    const activityContentId = formData.get("id")
    
    const session = await auth();
    if (!session) {
        return {
            status: "error",
            message: "You must be logged in",
        }
    }
    const cleanContent = sanitizeHtml(dirtyContent)
    const updatedMD = {
        title: title ? title : "",
        content: {
            markdown: cleanContent
        }
    }
    const res = await updateActivityContent(activityContentId, session?.user?.id, updatedMD)
    console.log(res)
    return {
        status: "success",
        message: "Successfully updated markdown",
        errors: {}
    }
}