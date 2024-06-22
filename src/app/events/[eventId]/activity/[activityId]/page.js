import ThemedText from "@/components/ThemedText";
import URLComponent from "@/components/pages/layout/urlComponent";
import CustomMarkdown from "@/components/pages/markdown";
import QA from "@/components/pages/activity/qa";
import Options from "@/components/pages/activity/options";

const ActivityInfo = {
  title: "SWE Q&A Panel",
  content: [
    {
      id: "content_md_001",
      type: "md",
      title: "Introduction to Markdown",
      content: {
        markdown:
          "# Welcome to Markdown\nMarkdown is a lightweight markup language with plain-text formatting syntax. Its design allows it to be converted to many output formats, but the original tool by the same name only supports HTML.",
      },
    },
    {
      id: "content_qa_001",
      type: "QA",
      title: "Ask the engineers questions!",
      content: {
        question: "Write your question for the engineers!",
      },
    },
    {
      id: "content_mc_001",
      type: "MC",
      title: "How many hours do you work daily?",
      content: {
        options: ["2-4 Hours", "6-8 Hours", "8-12 Hours"],
      },
    },
    {
      id: "content_md_002",
      type: "md",
      title: "Getting Started with Python",
      content: {
        markdown:
          "## Python Basics\nPython is an interpreted, high-level, general-purpose programming language. Created by Guido van Rossum and first released in 1991, Python's design philosophy emphasizes code readability with its notable use of significant whitespace.",
      },
    },
    {
      id: "content_qa_002",
      type: "QA",
      title: "What are your favorite programming languages?",
      content: {
        question: "Share your favorite programming languages!",
      },
    },
    {
      id: "content_mc_002",
      type: "MC",
      title: "Preferred Code Editor",
      content: {
        options: ["VS Code", "Sublime Text", "Atom", "PyCharm"],
      },
    },
    {
      id: "content_md_003",
      type: "md",
      title: "Advanced JavaScript Techniques",
      content: {
        markdown:
          "### Asynchronous JavaScript\nAsynchronous programming is a design pattern which ensures the non-blocking behavior of your code. JavaScript is single-threaded, and to ensure non-blocking behavior, we use asynchronous programming techniques.",
      },
    },
    {
      id: "content_qa_003",
      type: "QA",
      title: "What's your experience with AI?",
      content: {
        question: "Share your thoughts on artificial intelligence!",
      },
    },
    {
      id: "content_mc_003",
      type: "MC",
      title: "Favorite Cloud Platform",
      content: {
        options: ["AWS", "Google Cloud", "Azure", "IBM Cloud"],
      },
    },
  ],
};
const Render = ({ content }) => {
  return (
    <>
      {content &&
        content.map((contentPiece) => {
          switch (contentPiece.type) {
            case "QA":
              return (
                <QA
                  key={contentPiece.id}
                  title={contentPiece.title}
                  question={contentPiece.content.question}
                />
              );
            case "MC":
              return (
                <Options
                  key={contentPiece.id}
                  title={contentPiece.title}
                  options={contentPiece.content.options}
                />
              );
            case "md":
              return (
                <div key={contentPiece.id}>
                  <CustomMarkdown source={contentPiece.content.markdown} />
                </div>
              );
          }
        })}
    </>
  );
};
export default function Page() {
  return (
    <main>
      <div>
        <ThemedText type="heading">{ActivityInfo.title}</ThemedText>
        <URLComponent />
        <div className="bg-red-accent h-1 w-2/5 rounded-full"> </div>
      </div>
      <div className="flex flex-col gap-4 w-full h-[calc(100vh-172px)] overflow-y-scroll pr-3">
        <Render content={ActivityInfo.content} />
      </div>
    </main>
  );
}
