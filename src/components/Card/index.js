import Link from "next/link";
import PropTypes from "prop-types";

/**
 * This component renders a Themed Card
 *
 * @param {Object} props The props for the component.
 * @param {boolean} [props.active] whether or not the card is active. Active highlights the side bar.
 * @param {string} [props.className] Additional class names for custom styling.
 * @param {string} [props.href] Additional class names for custom styling.
 * @param {React.ReactNode} props.children The content to be rendered inside the text element.
 * @returns {React.ReactNode} A React element that renders a themed card.
 */
export default function Card({
  children,
  active = false,
  href,
  className,
  ...props
}) {
  if (href) {
    return (
      <Link href={href} className={`flex gap-3 ${className}`} {...props}>
        <div className={`min-w-1 rounded-full min-h-full ${active ? 'bg-red-accent' : 'bg-gray'}`} />
        <div className={`flex flex-col gap-1 w-full`}>{children}</div>
      </Link>
    );
  }
  return (
    <div className={`flex gap-3 ${className}`} {...props}>
      <div className={`min-w-1 rounded-full min-h-full ${active ? 'bg-red-accent' : 'bg-gray'}`} />
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}
Card.propTypes = {
  active: PropTypes.bool,
  href: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};