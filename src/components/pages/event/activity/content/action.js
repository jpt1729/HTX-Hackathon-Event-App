"use server";
import { createActivityContentResponse, deleteActivityContent, createNewActivityContent, updateActivityContentOrder } from '@/utils/activity-backend'
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

export async function deleteContent(id){
    const session = await auth();
    if (!session) {
        return;
    }
    await deleteActivityContent(id, session?.user?.id)
}

export async function createActivityContent(id, type){
    const session = await auth();
    if (!session) {
        return;
    }
    let content = {};
    let title = ""
    if (type === 'MC'){
        content = {"options":["Atom","VS Code","Repl.it","Subline Text"]}
        title = 'What is your favorite code editor?'
    } else if (type === 'QA') {
        content = {"question":"Share your favorite programming languages!"}
        title = 'What is your favorite programming language?'
    } else if (type === 'md') {
        content = {"markdown": `## The start of greatness!`}
    } else {
        return;
    }
    await createNewActivityContent(id, content, type, title)
}
export async function updateContentOrder(id, change){
    const session = await auth();
    if (!session) {
        return;
    }
    await updateActivityContentOrder(id, change)
}