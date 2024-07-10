"use client";
import styles from './tiptap.module.css'

import Menu, { CustomBubbleMenu } from './menu';

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
      <Menu editor={editor}/>
      <EditorContent editor={editor} className={`bg-white shadow p-5 ${styles.editor}`} />
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
