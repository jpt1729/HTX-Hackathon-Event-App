"use client"
import { useState } from "react"
import { useFormState } from "react-dom";

import { editEventContent } from "./action";

import TipTapEditor from "@/components/tip-tap-editor"

export default function EventContentEditor({ content, eventId }){
    const [newContent, setNewContent] = useState(content)
    const [state, formAction] = useFormState(editEventContent, {
        status: '',
        message: ''
      });
    return (
        <form action={formAction}>
            <TipTapEditor content={newContent} changeContent={setNewContent}/>
            <input type='text' name='content' className="hidden" readOnly value={newContent}/>
            <input type='text' name='eventId' className="hidden" readOnly value={eventId}/>
        </form>
    )
}