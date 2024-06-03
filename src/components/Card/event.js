import { MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import Card from "./index.js";
import ThemedText from "../ThemedText";
import { formatTime } from "@/utils/index.js";
import styles from './event.module.css'

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
        <div className="flex gap-1">
          <CalendarDaysIcon className="size-6" />
          <ThemedText icon="location_on" type="paragraph">
            {formatTime(eventTime.startTime)} - {formatTime(eventTime.endTime)}
          </ThemedText>
        </div>

        {location.googleMapsLink ? (
          <Link href={location.googleMapsLink} className={`flex gap-1 ${styles.Location}`}>
            <MapPinIcon className="size-6" />
            <ThemedText icon="location_on" type="paragraph">
              {location.address}
            </ThemedText>
          </Link>
        ) : (
          <div className="flex gap-1">
            <MapPinIcon className="size-6" />
            <ThemedText icon="location_on" type="paragraph">
              {location.address}
            </ThemedText>
          </div>
        )}
      </div>
    </Card>
  );
}
