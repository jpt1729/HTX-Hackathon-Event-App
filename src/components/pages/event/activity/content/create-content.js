"use client";
import ThemedText from "@/components/ThemedText";
import {
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";

import { createActivityContent } from "./action";
import { useRouter } from "next/navigation";

export function CreateContentBar({ activityId }) {
  const router = useRouter();
  return (
    <>
      <div className="flex gap-3">
        <button
          onClick={async () => {
            await createActivityContent(activityId, "MC");
            router.refresh();
          }}
          name="Create quiz"
          className="px-5 border border-gray rounded-full flex gap-1 items-center hover:border-red-accent hover:text-red-accent hover:stroke-red-accent transition-colors"
        >
          <ClipboardDocumentListIcon className="size-5" />
          <ThemedText>Quiz</ThemedText>
        </button>
        <button
          onClick={async () => {
            await createActivityContent(activityId, "QA");
            router.refresh();
          }}
          name="Create question"
          className="px-5 border border-gray rounded-full flex gap-1 items-center hover:border-red-accent hover:text-red-accent hover:stroke-red-accent transition-colors"
        >
          <DocumentTextIcon className="size-5" />
          <ThemedText>Question</ThemedText>
        </button>
        <button
          onClick={async () => {
            await createActivityContent(activityId, "md");
            router.refresh();
          }}
          name="Create markdown"
          className="px-5 border border-gray rounded-full flex gap-1 items-center hover:border-red-accent hover:text-red-accent hover:stroke-red-accent transition-colors"
        >
          <DocumentIcon className="size-5" />
          <ThemedText>Markdown</ThemedText>
        </button>
      </div>
    </>
  );
}
