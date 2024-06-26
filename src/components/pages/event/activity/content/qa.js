"use client";
import { useRef } from "react";
import { useFormState } from "react-dom";
import EditBar from "./edit-bar";

import ThemedLabels from "@/components/ThemedText/labels";
import ThemedInput from "@/components/ThemedText/input";
import PropTypes from "prop-types";

import { QAAction } from "./action";

/**
 * This component renders a Q&A Prompt
 *
 * @param {Object} props - Component properties
 * @param {string} [props.id] id of the question
 * @param {string} [props.title] title of the question
 * @param {string} [props.question] question of the question
 * @returns {React.ReactNode} A React element that renders a Q&A prompt
 */
export default function QA({
  id,
  title,
  question,
  admin,
  index,
  contentLength,
  addOptimisticChange
}) {
  const [state, formAction] = useFormState(QAAction, {
    status: "",
    message: "",
  });
  const ref = useRef();
  return (
    <div className="flex gap-5 items-center w-full max-w-screen-sm">
      {admin && <EditBar id={id} index={index} contentLength={contentLength} addOptimisticChange={addOptimisticChange} />}
      <form
        ref={ref}
        action={async (formData) => {
          await formAction(formData);
          ref?.current?.reset();
        }}
        className="flex items-center gap-5 w-full"
      >
        <div className="w-full max-w-screen-sm ">
          <ThemedLabels type="paragraph" className="font-bold" htmlFor={title}>
            {title}
          </ThemedLabels>
          <br />
          <div className="flex gap-2">
            <div className="flex-grow">
              <ThemedInput
                type="text"
                name="question-response"
                className="w-full border py-1 rounded-full px-4 border-gray active:border-red-accent focus:border-red-accent outline-none transition-colors"
                placeholder={question}
                defaultValue={""}
                required
              />
              {state.status === "error" && (
                <ThemedLabels type="subtext" className="text-warning">
                  {state.message}
                </ThemedLabels>
              )}
            </div>
            <input
              type="submit"
              className="font-bold text-red-accent hover:underline"
            />
          </div>
          <input type="text" name="id" className="hidden" value={id} readOnly />
        </div>
      </form>
    </div>
  );
}
QA.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  question: PropTypes.string,
};
