"use client";
import React from "react";
import { Fira_Code } from "next/font/google";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-markdown";
import "prismjs/themes/prism.css";

const FiraCode = Fira_Code({ subsets: ["latin"] });

export default function MarkdownEditor({ md, setMd }) {
  return (
    <Editor
      value={md}
      onValueChange={(md) => setMd(md)}
      highlight={(md) => highlight(md, languages.md, 'markdown')}
      padding={10}
      className={`${FiraCode.className} selection:bg-black selection:text-white`}
      name='markdown'
    />
  );
}
