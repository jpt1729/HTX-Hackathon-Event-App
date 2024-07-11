"use server";
import sanitizeHtml from 'sanitize-html';

export async function action(content, formData){
    const cleanHTML = sanitizeHtml(content)
}