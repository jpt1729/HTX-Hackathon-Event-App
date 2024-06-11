import Card from "../index.js";
import ThemedText from "@/components/ThemedText";
import Link from "next/link";
import LocationWidget from "./locationWidget";
import CalendarWidget from "./calendarWidget";
import styles from "../event.module.css";
import PropTypes from "prop-types";

/*
Returns whether event date is within 12 hours
*/
const CheckDate = (eventTime) => {
  let startTime = new Date(eventTime.startTime.getTime() - 12 * 60 * 60 * 1000);
  let endTime = new Date(eventTime.endTime.getTime() + 12 * 60 * 60 * 1000);
  let currentTime = new Date();
  return currentTime >= startTime && currentTime <= endTime;
};
/**
 * EventTime Object
 * @typedef {Object} EventTime
 * @property {Date} startTime - Indicates start time
 * @property {Date} endTime - Indicates end time
 */
/**
 * EventTime Object
 * @typedef {Object} Location
 * @property {string} address - Address of location
 * @property {string} googleMapsLink - Google Maps Link
 */
/**
 * This component renders a Themed Event Card
 *
 * @param {Object} props The props for the component.
 * @param {string} [props.id] Event Card Id
 * @param {string} [props.title] Title of the Event
 * @param {string} [props.description] Description of the Event
 * @param {EventTime} [props.eventTime] Time of the Event
 * @param {Location} [props.location] location of the Event
 * @returns {React.ReactNode} A React element that renders a themed Event card.
 */
export default function OrganizerEventCard({
  id,
  title,
  description,
  eventTime,
  location,
  className = "",
  ...props
}) {
  return (
    <Card
      active={CheckDate(eventTime)}
      className={`${styles.EventCard} ${className}`}
      {...props}
    >
      <ThemedText type="subheading">
        <Link href={`/organize-events/${id}`}>{title}</Link>
      </ThemedText>
      <ThemedText type="paragraph">{description}</ThemedText>
      <div className="flex gap-2">
        <CalendarWidget
          event={{
            id,
            title,
            description,
            eventTime,
            location,
          }}
          eventTime={eventTime}
        />
        <LocationWidget location={location} />
      </div>
    </Card>
  );
}
OrganizerEventCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  description: PropTypes.string,
  eventTime: PropTypes.Object,
  location: PropTypes.Object,
  children: PropTypes.node.isRequired,
};
