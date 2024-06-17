"use client";

import {
  useEditor,
  EditorContent,
  BubbleMenu,
} from "@tiptap/react";
import Typography from "@tiptap/extension-typography";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";

function TipTapEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Typography,
      Document,
      Paragraph,
      Text,
      Heading,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "<p>Hello World! 🌎️</p>",
  });

  return (
    <>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="px-2 py-1 flex gap-2 rounded bg-white shadow">
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
      <menu>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          L
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          C
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          R
        </button>
        <button onClick={() => {
          console.log(editor.getHTML())
        }}>
          save 
        </button>
      </menu>
      <EditorContent editor={editor} />
    </>
  );
}

export default TipTapEditor;
