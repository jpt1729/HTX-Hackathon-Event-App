"use server";
import { createActivityContentResponse } from '@/utils/backend-event'
import { auth } from "@/auth"

export async function QAAction(prevState, formData){
    const response = formData.get('question-response')

    if (response === ""){
        return {
            status: "error",
            message: "Blank response",
        }
    }

    const id = formData.get('id')
    const session = await auth()
    
    createActivityContentResponse(id, session.user.id, response)
    return {
        status: "success",
        message: ""
    }
}
export async function OptionsAction(prevState, formData){
    const option = formData.get('option')
    if(!option){
        return {
            status: "error",
            message: "Select an option"
        }
    }
    const id = formData.get('id')
    const session = await auth()
    createActivityContentResponse(id, session.user.id, option)
    return {
        status: "success",
        message: ""
    }
}