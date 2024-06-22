"use server";
import { createActivityContentResponse } from '@/utils/backend-event'
import { auth } from "@/auth"

export async function QAAction(prevState, formData){
    const response = formData.get('question-response')
    const id = formData.get('id')
    const session = await auth()

    if (response === ""){
        return {
            status: "error",
            message: "Blank response",
        }
    }
    createActivityContentResponse(id, session.user.id, response)
    return {
        status: "",
        message: ""
    }
}
export async function OptionsAction(prevState, formData){

}