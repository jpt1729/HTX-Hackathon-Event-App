"use client";
import { useState, Suspense } from "react";
import { useFormState } from "react-dom";
import dynamic from "next/dynamic";

import ThemedText from "@/components/ThemedText";
import ThemedLabels from "@/components/ThemedText/labels";
import ThemedInput from "@/components/ThemedText/input";
import { editMDAction } from "./action";

import TipTapEditor from "@/components/tip-tap-editor";

export default function EditMD({ activityContent }) {
  const [newContent, setNewContent] = useState(
    activityContent?.content?.markdown
  );
  const [state, formAction] = useFormState(editMDAction, {
    status: "",
    message: "",
    errors: {},
  });
  return (
    <>
      {((state.status === "error" && state.message) ||
        (state.status === "success" && state.message)) && (
        <ThemedText className={`${state.status === "error" && "text-warning"}`}>
          {state.message}
        </ThemedText>
      )}
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
          <TipTapEditor
            content={newContent}
            changeContent={setNewContent}
          />
        </Suspense>
        <textarea
          className="hidden"
          name="content"
          value={newContent}
          readOnly
        />
        <input
          type="text"
          className="hidden"
          name="id"
          value={activityContent.id}
          readOnly
        />
      </form>
    </>
  );
}
