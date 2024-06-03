import React from 'react';
import PropTypes from 'prop-types';

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
export default function ThemedText({
  type = "paragraph",
  className = '',
  children,
  ...props
}) {
  switch (type) {
    case "paragraph":
      return (
        <p className={`text-base leading-7 text-black ${className}`} {...props}>
          {children}
        </p>
      );
    case "heading":
      return (
        <h1 className={`text-4xl font-bold text-black ${className}`} {...props}>
          {children}
        </h1>
      );
    case "subheading":
      return (
        <h2 className={`text-2xl font-bold text-black ${className}`} {...props}>
          {children}
        </h2>
      );
    case "subtext":
      return (
        <span className={`text-gray text-base ${className}`} {...props}>
          {children}
        </span>
      );
    default:
      return null;
  }
}

ThemedText.propTypes = {
  /**
   * The type of text to render.
   * One of 'paragraph', 'heading', 'subheading', or 'subtext'.
   */
  type: PropTypes.oneOf(['paragraph', 'heading', 'subheading', 'subtext']),
  
  /**
   * Additional class names for custom styling.
   */
  className: PropTypes.string,
  
  /**
   * The content to be rendered inside the text element.
   */
  children: PropTypes.node.isRequired,
};

ThemedText.defaultProps = {
  type: 'paragraph',
  className: '',
};
