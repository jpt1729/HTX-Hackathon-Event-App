"use client";
import { useFormState } from "react-dom"

import ThemedText from "@/components/ThemedText";
import ThemedLabels from "@/components/ThemedText/labels";
import ThemedInput from "@/components/ThemedText/input";

import { editQAAction } from "./action";

export default function EditQA({ activityContent }) {
    const [state, formAction] = useFormState(editQAAction, {
        status: "",
        message: ""
    })
  return (
    <form
      action={formAction}
      
      className="w-full"
    >
      <ThemedLabels type="subheading">Title</ThemedLabels>
      <br />
      <ThemedInput type="text" className = 'w-full' name="title" defaultValue={activityContent.title} />
      <br />
      <br />
      <ThemedLabels type="subheading" className="font-bold">
        Question
      </ThemedLabels>
      <br />
      <ThemedInput type="text" className = 'w-full' name="question" defaultValue={activityContent.content.question}/>
      <ThemedInput type="submit" value="save" />
    </form>
  );
}
