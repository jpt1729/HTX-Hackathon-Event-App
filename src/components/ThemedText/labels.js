import React from "react";
import PropTypes from "prop-types";

/**
 * This component renders themed text to keep app text styles consistent.
 *
 * @param {Object} props The props for the component.
 * @param {('paragraph'|'heading'|'subheading'|'subtext'|'radio')} props.type The type of text to render.
 * Possible values are:
 * - "paragraph": Renders a paragraph element.
 * - "heading": Renders a heading level 1 element.
 * - "subheading": Renders a heading level 2 element.
 * - "subtext": Renders a span element with subtext styling.
 * @param {string} [props.className] Additional class names for custom styling.
 * @param {React.ReactNode} props.children The content to be rendered inside the text element.
 * @returns {React.ReactNode} A React element that renders themed text.
 */
export default function ThemedLabels({
  type = "paragraph",
  className = "",
  children,
  ...props
}) {
  switch (type) {
    case "paragraph":
      return (
        <label
          className={`text-base leading-7 text-black ${className}`}
          {...props}
        >
          {children}
        </label>
      );
    case "heading":
      return (
        <label
          className={`text-4xl font-bold text-black ${className}`}
          {...props}
        >
          {children}
        </label>
      );
    case "subheading":
      return (
        <label
          className={`text-2xl font-bold text-black ${className}`}
          {...props}
        >
          {children}
        </label>
      );
    case "subtext":
      return (
        <label className={`text-gray text-base ${className}`} {...props}>
          {children}
        </label>
      );
    case "radio":
      return (
        <label
          className={`rounded-full px-4 border border-gray active:border-red-accent focus:border-red-accent hover:border-red-accent aria-selected:border-red-accent selection:border-red-accent outline-none transition-colors ${className}`}
          
          {...props}
        >
          {children}
        </label>
      );
    default:
      return null;
  }
}

ThemedLabels.propTypes = {
  /**
   * The type of text to render.
   * One of 'paragraph', 'heading', 'subheading', or 'subtext'.
   */
  type: PropTypes.oneOf(["paragraph", "heading", "subheading", "subtext", 'radio']),

  /**
   * Additional class names for custom styling.
   */
  className: PropTypes.string,

  /**
   * The content to be rendered inside the text element.
   */
  children: PropTypes.node.isRequired,
};
