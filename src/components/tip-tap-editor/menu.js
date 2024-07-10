import React, { useCallback, useState } from "react";
import { useModal } from "@/utils/context/ModalContext";

import { BubbleMenu } from "@tiptap/react";
import {
  LeftAlignIcon,
  CenterAlignIcon,
  RightAlignIcon,
  BulletListIcon,
  OrderedListIcon,
  UndoIcon,
  RedoIcon,
  LinkIcon,
} from "./icons";

import ThemedLabels from "../ThemedText/labels";
import ThemedInput from "../ThemedText/input";

export default function Menu({ editor }) {
  const { showModal, hideModal } = useModal();
  const [url, setUrl] = useState(null);
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;

    showModal(
      <form
        onSubmit={() => {
          // cancelled
          if (url === null) {
            hideModal();
          }

          // empty
          if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();

            hideModal();
          }

          // update link
          editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
          hideModal()
        }}
      >
        <ThemedLabels className="font-bold">Set URL</ThemedLabels>
        <br />
        <ThemedInput
          type="text"
          placeholder="https://hackclub.com"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        ></ThemedInput>
        <br/>
        <ThemedInput type="submit" value="save" />
      </form>
    );
  }, [editor, url, setUrl, hideModal, showModal]);
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
                editor.isActive("bulletList")
                  ? "!bg-red-accent text-white fill-white"
                  : ""
              } flex gap-1 hover:bg-gray rounded px-1 transition-colors semibold`}
            >
              <BulletListIcon className="size-6 " />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`${
                editor.isActive("orderedList")
                  ? "!bg-red-accent text-white fill-white"
                  : ""
              } flex gap-1 hover:bg-gray rounded px-1 transition-colors semibold`}
            >
              <OrderedListIcon className="size-6 " />
            </button>
          </div>
          <div className="flex gap-1 px-1 border-x border-gray">
            <button
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className={`${
                editor.isActive({ textAlign: "left" })
                  ? "!bg-red-accent text-white fill-white"
                  : ""
              } flex gap-1 hover:bg-gray rounded px-1 transition-colors semibold`}
            >
              <LeftAlignIcon className="size-6 " />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              className={`${
                editor.isActive({ textAlign: "center" })
                  ? "!bg-red-accent text-white fill-white"
                  : ""
              } flex gap-1 hover:bg-gray rounded px-1 transition-colors semibold`}
            >
              <CenterAlignIcon className="size-6 " />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={`${
                editor.isActive({ textAlign: "right" })
                  ? "!bg-red-accent text-white fill-white"
                  : ""
              } flex gap-1 hover:bg-gray rounded px-1 transition-colors semibold`}
            >
              <RightAlignIcon className="size-6 " />
            </button>
          </div>
          <div className="flex gap-1 px-1 border-x border-gray">
            <button
              onClick={setLink}
              className={`${
                editor.isActive({ textAlign: "right" })
                  ? "!bg-red-accent text-white fill-white"
                  : ""
              } flex gap-1 hover:bg-gray rounded px-1 transition-colors semibold`}
            >
              <LinkIcon className="size-6 " />
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
