"use server";
import { deleteActivityResponses } from "@/utils/event-backend"

export async function deleteResponses(responseIds){
    deleteActivityResponses(responseIds)
}