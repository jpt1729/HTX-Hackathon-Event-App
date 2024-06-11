"use client";
import React, { useState } from "react";
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
  BlockTypeSelect,
} from "@mdxeditor/editor";

import { editEventContent } from "./action";

import { Inter } from "next/font/google";

import styles from "./mdxeditor.module.css";

import ThemedInput from "@/components/ThemedText/input";

const inter = Inter({ subsets: ["latin"] });

// Only import this to the next file
export default function CustomMDXEditor({ editorRef, markdown, eventId, ...props }) {
  console.log(markdown)
  const [changeStatus, setChangeStatus] = useState(false)
  const [formMd, setFormMd] = useState(markdown)
  const [state, formAction] = useFormState(editEventContent, {
    message: "",
  });
  if (state.message !== ""){
    alert(state.message)
  }
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
              <>
                {" "}
                <UndoRedo /> <BoldItalicUnderlineToggles /> <CodeToggle />
                <CreateLink />
                <ListsToggle />
                <BlockTypeSelect />
                <ThemedInput type="submit" value='Save' disabled={!changeStatus}/>
              </>
            ),
          }),
        ]}
        contentEditableClassName={`${styles.mdxEditor} ${inter.className}`}
        markdown={markdown}
        onChange = {(md) => {
          setChangeStatus(true)
          setFormMd(md)
        }}
        ref={editorRef}
        {...props}
      />
      <input className="hidden" type='hidden' name='eventId' value={eventId}/>
      <input className="hidden" type='hidden' name='markdown' value={formMd}/>
      
    </form>
  );
}
