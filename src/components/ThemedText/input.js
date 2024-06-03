import React from "react";
import PropTypes from "prop-types";

/**
 * This component renders themed text to keep app text styles consistent.
 *
 * @param {Object} props The props for the component.
 * @param {('paragraph'|'heading'|'subheading'|'subtext')} props.type The type of text to render.
 * Possible values are:
 * - "paragraph": Renders a paragraph element.
 * - "heading": Renders a heading level 1 element.
 * - "subheading": Renders a heading level 2 element.
 * - "subtext": Renders a span element with subtext styling.
 * @param {string} [props.className] Additional class names for custom styling.
 * @param {React.ReactNode} props.children The content to be rendered inside the text element.
 * @returns {React.ReactNode} A React element that renders themed text.
 */
export default function ThemedInput({
  type = "text",
  className = "",
  children,
  ...props
}) {
  switch (type) {
    case "text":
      return (
        <input
          type="text"
          className={`flex-grow border py-1 rounded-full px-4 border-gray active:border-red-accent focus:border-red-accent outline-none transition-colors ${className}`}
          {...props}
        >
          {children}
        </input>
      );
    case "submit":
      return (
        <input
          type="submit"
          className={`font-bold text-red-accent hover:underline ${className}`}
          {...props}
        />
      );
    case "radio":
      return (
          <input
            type="radio"
            className={`hidden ${className}`}
            {...props}
          />
      );
    case "subtext":
      return (
        <label className={`text-gray text-base ${className}`} {...props}>
          {children}
        </label>
      );
    default:
      return null;
  }
}

ThemedInput.propTypes = {
  /**
   * The type of text to render.
   * One of 'paragraph', 'heading', 'subheading', or 'subtext'.
   */
  type: PropTypes.oneOf(["text", "submit", "radio", "subtext"]),

  /**
   * Additional class names for custom styling.
   */
  className: PropTypes.string,

  /**
   * The content to be rendered inside the text element.
   */
  children: PropTypes.node.isRequired,
};
