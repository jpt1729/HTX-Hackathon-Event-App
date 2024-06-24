"use server";
import { deleteActivityResponses } from "@/utils/backend-event"

export async function deleteResponses(responseIds){
    deleteActivityResponses(responseIds)
}