import { BubbleMenu } from "@tiptap/react";
import {
  LeftAlignIcon,
  CenterAlignIcon,
  RightAlignIcon,
  BulletListIcon,
  OrderedListIcon,
  UndoIcon,
  RedoIcon,
} from "./icons";

export default function Menu({ editor }) {
  return (
    <>
      {editor && (
        <menu className="py-1 bg-white text-black shadow flex rounded px-2 fill-black">
          <div className="flex gap-1 pr-1 border-r border-gray">
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
          </div>
          <div className="flex gap-1 px-1 border-x border-gray">
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
          <div className="flex gap-1 px-1 border-x border-gray">
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={`${
                editor.isActive("heading", { level: 1 })
                  ? "!bg-red-accent text-white"
                  : ""
              } flex gap-1 hover:bg-gray rounded px-1 transition-colors semibold`}
            >
              H1
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={`${
                editor.isActive("heading", { level: 2 })
                  ? "!bg-red-accent text-white"
                  : ""
              } flex gap-1 hover:bg-gray rounded px-1 transition-colors semibold`}
            >
              H2
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={`${
                editor.isActive("heading", { level: 3 })
                  ? "!bg-red-accent text-white"
                  : ""
              } flex gap-1 hover:bg-gray rounded px-1 transition-colors semibold`}
            >
              H3
            </button>
          </div>
          <div className="flex gap-1 px-1 border-x border-gray">
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`${
                editor.isActive("heading", { level: 3 })
                  ? "!bg-red-accent text-white"
                  : ""
              } flex gap-1 hover:bg-gray rounded px-1 transition-colors semibold`}
            >
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
          </div>
          <div className="flex gap-1 px-1 border-x border-gray">
            <button
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
            >
              <CenterAlignIcon className="size-6 " />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
            >
              <RightAlignIcon className="size-6 " />
            </button>
          </div>
          <button
            onClick={() => {
              console.log(editor.getHTML());
            }}
            className="pl-1 border-l border-gray"
          >
            save
          </button>
        </menu>
      )}
    </>
  );
}
export function CustomBubbleMenu({ editor }) {
  return (
    <>
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
    </>
  );
}
