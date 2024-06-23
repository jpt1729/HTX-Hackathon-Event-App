"use client";
import { useState, useRef, Suspense } from "react";
import { useFormState } from "react-dom";
import dynamic from "next/dynamic";

import { useModal } from "@/utils/context/ModalContext";

import ThemedText from "@/components/ThemedText";
import ThemedLabels from "@/components/ThemedText/labels";
import ThemedInput from "@/components/ThemedText/input";
import { editMDAction } from "./action";

const CustomMarkdownEditor = dynamic(
  () => import("@/components/pages/customMarkdownEditor"),
  { ssr: false }
);

export default function EditMD({ activityContent }) {
  const [markdown, setFormMarkdown] = useState(
    activityContent?.content?.markdown
  );
  const [state, formAction] = useFormState(editMDAction, {
    status: "",
    message: "",
    errors: {},
  });
  const { showModal } = useModal()
  if ((state.status === "error" && state.message) || (state.status === "success" && state.message)) {
    showModal(<ThemedText>{state.message}</ThemedText>)
  }
  return (
    <form action={formAction}>
      <ThemedLabels type="subheading">Title</ThemedLabels>
      <br />
      <ThemedInput
        type="text"
        name="title"
        defaultValue={activityContent.title}
      />
      <br />
      <br />
      <Suspense fallback={<></>}>
        <CustomMarkdownEditor
          markdown={markdown}
          setMarkdown={setFormMarkdown}
        />
      </Suspense>
      <textarea
        className="hidden"
        name="markdown"
        value={markdown}
        readOnly
      />
      <input type='text' className="hidden" name='id' value={activityContent.id} readOnly/>
    </form>
  );
}
