import Card from "../index.js";
import ThemedText from "@/components/ThemedText";
import styles from "../event.module.css";
import { formatTime } from "@/utils/index.js";
import PropTypes from 'prop-types'
/*
Takes in a date and returns a string that shows how far away that date is
*/
function getUpcomingEventMessage(eventDate) {
    const now = new Date();
    const timeDifference = eventDate.getTime() - now.getTime(); // difference in milliseconds

    if (timeDifference < 0) {
        return "The event has already passed.";
    }

    const minutesAway = Math.floor(timeDifference / (1000 * 60));
    const hoursAway = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysAway = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (minutesAway <= 30) {
        return `Upcoming in ${minutesAway} minute${minutesAway !== 1 ? 's' : ''}`;
    } else if (minutesAway <= 60) {
        return "Upcoming in less than an hour";
    } else if (hoursAway < 24) {
        return `Upcoming in ${hoursAway} hour${hoursAway !== 1 ? 's' : ''}`;
    } else {
        return `Upcoming in ${daysAway} day${daysAway !== 1 ? 's' : ''}`;
    }
}
/*
  Returns boolean that shows whether or not a time is in the next 5 minutes
*/
const CheckDate = (eventTime) => {
  const now = new Date();
  const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60 * 1000);

  return eventTime > now && eventTime <= fiveMinutesFromNow;
};
/**
 * This component renders a Themed Activity Card
 *
 * @param {Object} props The props for the component.
 * @param {string} [props.id] Activity Card Id
 * @param {string} [props.eventId] Activity's event Id
 * @param {string} [props.title] Title of the activity
 * @param {boolean} [props.mandatory] whether the activity is mandatory or not 
 * @param {string} [props.className] Additional class names for custom styling.
 * @param {string} [props.description] Description of the activity
 * @param {Date} [props.eventTime] Time of the Event
 * @param {React.ReactNode} props.children The content to be rendered inside the text element.
 * @returns {React.ReactNode} A React element that renders a themed activity card.
 */
export default function ActivityCard({ id, eventId, title, mandatory = false, description, eventTime, className='' }) {
  return (
    <Card active={CheckDate(eventTime)} className={`${styles.EventCard} ${className}`} href={`/events/${eventId}/activity/${id}`}>
      <div>
        <div className="flex justify-between">
            <ThemedText type="paragraph" className="font-bold" style={{ lineHeight: 1.5 }}>
                {title}
            </ThemedText>
            <ThemedText type="paragraph" className={`font-bold ${mandatory ? 'text-red-accent':'text-gray'}`}style={{ lineHeight: 1.5 }}>
                {mandatory ? 'Mandatory' : 'Optional'}
            </ThemedText>
        </div>
        <ThemedText type="paragraph" style={{ lineHeight: 1.5 }}>
          {description}
        </ThemedText>
        <div className="flex justify-between">
            <ThemedText type='subtext'>
                {getUpcomingEventMessage(eventTime)}
            </ThemedText>
            <ThemedText type='subtext'>
                {formatTime(eventTime)}
            </ThemedText>
        </div>
      </div>
    </Card>
  );
}
ActivityCard.propTypes = {
  id: PropTypes.string,
  eventId: PropTypes.string,
  title:PropTypes.string,
  mandatory:PropTypes.bool,
  className: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
};