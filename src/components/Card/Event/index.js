import Card from "../index.js";
import ThemedText from "@/components/ThemedText";
import Link from "next/link";
import LocationWidget from "./location-widget.js";
import CalendarWidget from "./calendar-widget.js";
import styles from '../event.module.css'

const CheckDate = (eventTime) => {
  let startTime = new Date(eventTime.startTime.getTime() - 12 * 60 * 60 * 1000);
  let endTime = new Date(eventTime.endTime.getTime() + 12 * 60 * 60 * 1000);
  let currentTime = new Date();
  return currentTime >= startTime && currentTime <= endTime;
};

export default function EventCard({
  id,
  title,
  description,
  eventTime,
  location,
}) {
  return (
    <Card active={CheckDate(eventTime)} className = {`${styles.EventCard}`}>
      <ThemedText type="subheading">
        <Link href={`/events/${id}`}>
          {title}
        </Link>
      </ThemedText>
      <ThemedText type="paragraph">{description}</ThemedText>
      <div className="flex gap-2">
        <CalendarWidget eventTime={eventTime}/>
        <LocationWidget location={location}/>
      </div>
    </Card>
  );
}
