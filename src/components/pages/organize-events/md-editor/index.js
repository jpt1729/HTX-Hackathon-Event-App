"use client";
import React, { useState, useRef } from "react";
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

import { editEventContent } from "./action";

import { Inter } from "next/font/google";

import styles from "./mdxeditor.module.css";

import ThemedInput from "@/components/ThemedText/input";

const inter = Inter({ subsets: ["latin"] });

// Only import this to the next file
export default function CustomMDXEditor({
  editorRef,
  markdown,
  eventId,
  ...props
}) {
  console.log(markdown);
  const [changeStatus, setChangeStatus] = useState(false);
  const [formMd, setFormMd] = useState(markdown);
  const [state, formAction] = useFormState(editEventContent, {
    message: "",
  });
  if (state.message !== "") {
    alert(state.message);
  }
  const internalEditorRef = useRef(null);
  return (
    <form action={formAction}>
      <MDXEditor
        plugins={[
          // Example Plugin Usage
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          linkDialogPlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <div className="flex w-full">
                <UndoRedo />
                <Separator />
                <BoldItalicUnderlineToggles />
                <Separator />
                <CodeToggle />
                <CreateLink />
                <Separator />
                <ListsToggle />
                <Separator />
                <ThemedInput
                  type="submit"
                  value="Save"
                  className="px-2 "
                />
              </div>
            ),
          }),
        ]}
        contentEditableClassName={`${styles.mdxEditor} ${inter.className}`}
        markdown={markdown}
        onChange={(md) => {
          setChangeStatus(true);
          setFormMd(md);
        }}
        ref={editorRef || internalEditorRef}
        {...props}
      />
      <input className="hidden" type="hidden" name="eventId" value={eventId} />
      <input className="hidden" type="hidden" name="markdown" value={formMd} />
    </form>
  );
}
