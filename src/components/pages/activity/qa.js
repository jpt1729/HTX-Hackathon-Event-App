"use client";
import ThemedLabels from "@/components/ThemedText/labels";
import ThemedInput from "@/components/ThemedText/input";
import PropTypes from 'prop-types'

/**
 * This component renders a Q&A Prompt
 *
 * @param {Object} props - Component properties
 * @param {string} [props.id] id of the question
 * @param {string} [props.title] title of the question
 * @param {string} [props.question] question of the question
 * @returns {React.ReactNode} A React element that renders a Q&A prompt
 */
export default function QA({ id, title, question }) {
  const onSubmit = (e) => {
    e.preventDefault();
    // TODO connect to backend
  };
  return (
    <form onSubmit={onSubmit}>
      <ThemedLabels type="paragraph" className="font-bold" htmlFor={title}>
        {title}
      </ThemedLabels>
      <br />
      <div className="flex gap-2">
        <ThemedInput
          type="text"
          className="flex-grow border py-1 rounded-full px-4 border-gray active:border-red-accent focus:border-red-accent outline-none transition-colors"
          placeholder={question}
        />
        <input
          type="submit"
          className="font-bold text-red-accent hover:underline"
        />
      </div>
    </form>
  );
}
QA.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  question: PropTypes.string
};