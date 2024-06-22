"use client";
import { useState, useRef } from "react";
import { useFormState } from "react-dom";

import {
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
    MDXEditor,
    toolbarPlugin,
    UndoRedo,
    BoldItalicUnderlineToggles,
    CodeToggle,
    linkDialogPlugin,
    CreateLink,
    ListsToggle,
    Separator,
  } from "@mdxeditor/editor";

import styles from '@/components/pages/organize-events/md-editor/mdxeditor.module.css'
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import ThemedText from "@/components/ThemedText";
import ThemedLabels from "@/components/ThemedText/labels";
import ThemedInput from "@/components/ThemedText/input";
import CustomMDXEditor from "../../organize-events/md-editor";
import { editMDAction } from "./action";

export default function EditMD({ activityContent }) {
    const [markdown, setFormMarkdown] = useState(activityContent?.content?.markdown)
  const [state, formAction] = useFormState(editMDAction, {
    status: "",
    message: "",
    errors: {},
  });
  const internalEditorRef = useRef(null); 
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

      <ThemedInput type="submit" value="save" />
    </form>
  );
}
