"use client";
import React, { useState } from "react";

import MarkdownEditor from "./markdown-editor";
import CustomMarkdown from "@/components/pages/markdown";

export default function MarkdownViewTabs({ eventData }) {
  const [select, setSelect] = useState("markdown");
  const [md, setMd] = useState(eventData.content)
  return (
    <div className="w-full h-full">
      <div className="flex mt-2 rounded">
        <button
          onClick={() => {
            setSelect("markdown");
          }}
          className={`border border-gray rounded-l px-3 ${select === 'markdown' && 'bg-gray font-semibold'} transition-all`}
        >
          Markdown
        </button>
        <button
          onClick={() => {
            setSelect("view");
          }}
          className={`border border-gray rounded-r px-3 ${select === 'view' && 'bg-gray font-semibold'} transition-all`}
        >
          View
        </button>
      </div>
      <div className="w-full">
        {select === "markdown" ? (
          <MarkdownEditor md={md} setMd={setMd} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
