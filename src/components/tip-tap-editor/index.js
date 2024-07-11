"use client";
import styles from "./tiptap.module.css";

import Menu, { CustomBubbleMenu } from "./menu";
import { UnlinkIcon } from "./icons";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import Typography from "@tiptap/extension-typography";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import Link from "@tiptap/extension-link";

function TipTapEditor({ content, changeContent}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Typography,
      Document,
      Paragraph.configure({
        HTMLAttributes: {
          class: "w-full",
        },
      }),
      Text,
      Heading,
      BulletList,
      OrderedList,
      ListItem,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      changeContent(editor.getHTML())
    }
  });

  return (
    <div className="flex flex-col gap-1">
      <Menu editor={editor} />
      <EditorContent
        editor={editor}
        className={`bg-white shadow p-5 ${styles.editor} content`}
      />
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="px-2 py-1 flex gap-2 rounded bg-white shadow ">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`${
                editor.isActive("bold") ? "!bg-red-accent text-white" : ""
              } flex gap-1 hover:bg-gray rounded px-1 transition-colors`}
            >
              <span className="font-extrabold">B</span>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`${
                editor.isActive("italic") ? "!bg-red-accent text-white" : ""
              } flex gap-1 hover:bg-gray rounded px-1 transition-colors`}
            >
              <span className="italic">I</span>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`${
                editor.isActive("strike") ? "!bg-red-accent text-white" : ""
              } flex gap-1 hover:bg-gray rounded px-1 transition-colors`}
            >
              <span className="line-through">S</span>
            </button>
            <button
              onClick={() => editor.chain().focus().unsetLink().run()}
              disabled={!editor.isActive("link")}
              className={`${editor.isActive("link") ? "fill-black transition-colors hover:fill-red-accent":"fill-gray" }`}
            >
              <UnlinkIcon className='size-4'/>
            </button>
          </div>
        </BubbleMenu>
      )}
    </div>
  );
}

export default TipTapEditor;
