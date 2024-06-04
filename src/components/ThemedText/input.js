import React from "react";
import PropTypes from "prop-types";

import styles from './input.module.css'

/**
 * This component renders themed text to keep app text styles consistent.
 *
 * @param {Object} props The props for the component.
 * @param {('text'|'submit'|'radio')} props.type The type of text to render.
 * Possible values are:
 * - "text": Renders a text input element.
 * - "submit": Renders a submit input element.
 * - "radio": Renders a radio input element. This should be paired with the radio ThemedLabel
 * @param {string} [props.className] Additional class names for custom styling.
 * @param {React.ReactNode} props.children The content to be rendered inside the text element.
 * @returns {React.ReactNode} A React element that renders themed input.
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
            className={`hidden ${className} ${styles.radio}`}
            {...props}
          />
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
  type: PropTypes.oneOf(["text", "submit", "radio"]),

  /**
   * Additional class names for custom styling.
   */
  className: PropTypes.string,

  /**
   * The content to be rendered inside the text element.
   */
  children: PropTypes.node.isRequired,
};
