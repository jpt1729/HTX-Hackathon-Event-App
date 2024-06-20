"use client";

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
import BulletList from '@tiptap/extension-bullet-list'
import {
  LeftAlignIcon,
  CenterAlignIcon,
  RightAlignIcon,
  BulletListIcon,
  OrderedListIcon,
  UndoIcon,
  RedoIcon,
} from "./icons";
function TipTapEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Typography,
      Document,
      Paragraph,
      Text,
      Heading,
      BulletList,
      OrderedList,
      ListItem,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "<p>Hello World! 🌎️</p>",
  });

  return (
    <div className="flex flex-col gap-1">
      <menu className="py-1 bg-white text-black shadow flex gap-1 rounded px-2 fill-black">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="font-semibold"
        >
          <UndoIcon className="size-6 " />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="font-semibold"
        >
          <RedoIcon className="size-6 " />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className="font-semibold"
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="font-semibold"
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className="font-semibold"
        >
          H3
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <BulletListIcon className="size-6 " />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <OrderedListIcon className="size-6 " />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <LeftAlignIcon className="size-6 " />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <CenterAlignIcon className="size-6 " />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <RightAlignIcon className="size-6 " />
        </button>
        <button
          onClick={() => {
            console.log(editor.getHTML());
          }}
        >
          save
        </button>
      </menu>
      <EditorContent editor={editor} className="bg-white p-2 rounded shadow" />
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
          </div>
        </BubbleMenu>
      )}
    </div>
  );
}

export default TipTapEditor;
