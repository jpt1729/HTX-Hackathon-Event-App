"use client"
import ThemedText from "@/components/ThemedText";
import { XMarkIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

/**
 * This component renders an alert notification for users
 *
 * @param {Object} props The props for the component.
 * @param {function} [props.close] A function that will close the notification after the x is clicked
 * @param {string} [props.className] Additional class names for custom styling.
 * @param {React.ReactNode} props.children The content to be rendered inside the text element.
 * @returns {React.ReactNode} A React element that renders an Alert Notification.
 */
export default function AlertNotification({
  close = (() => {}),
  children,
  className,
  ...props
}) {
  //TODO: make it shrink the x mark button a bit on click. This may require framer motion
  return (
    <div
      className={`px-5 py-1 bg-warning fixed bottom-4 left-5 w-[calc(100%-40px)] rounded-full flex items-center gap-2 ${className}`}
      {...props}
    >
      <button
        aria-label="Close"
        name="Close Notification"
        onClick={(e) => {
          e.preventDefault();
          close();
        }}
      >
        <XMarkIcon className="size-6 stroke-white hover:scale-110 transition-transform" />
      </button>
      <ThemedText type="paragraph" className=" !text-white !leading-normal">
        <span className="font-bold">Alert: </span>
        {children}
      </ThemedText>
    </div>
  );
}
AlertNotification.propTypes = {
  close: PropTypes.Function,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
