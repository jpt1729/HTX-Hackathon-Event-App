import { useRef } from "react";
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
import styles from './markdown.module.css'
import ThemedInput from "../ThemedText/input";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function CustomMarkdownEditor({markdown, setMarkdown, editorRef, ...props}) {
    const internalEditorRef = useRef(null); 
    return (
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
          setMarkdown(md);
        }}
        ref={editorRef || internalEditorRef}
        {...props}
      />
    )
}