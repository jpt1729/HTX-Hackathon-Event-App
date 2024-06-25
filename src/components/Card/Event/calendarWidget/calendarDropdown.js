import { CalendarIcon } from "@heroicons/react/24/outline";
import { googleCalendarEventUrl } from "google-calendar-url";

import DropDown from "@/components/Dropdown";
import Link from "next/link";

import styles from './dropdown.module.css'

function formatDateToISO8601(date) {
  const pad = (num) => String(num).padStart(2, "0");

  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1); // Months are zero-based
  const day = pad(date.getUTCDate());
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());

  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

const generateCalendarLink = (event) => {
  const { title, eventTime, description, location } = event;
  return googleCalendarEventUrl({
    title: title,
    details: description,
    location: location?.googleMapsLink
      ? location?.googleMapsLink
      : location?.address,
    start: formatDateToISO8601(eventTime.startTime),
    end: formatDateToISO8601(eventTime.endTime),
  });
};

export default function CalendarDropDown({ event }) {
  const calendarURL = generateCalendarLink(event);
  return (
    <DropDown className={styles.DropDown}>
      <Link
        href={calendarURL}
        className="flex gap-2 items-center hover:stroke-red-accent hover:text-red-accent transition-colors"
      >
        <CalendarIcon className="size-6" />
        Add to Google Calendar
      </Link>
    </DropDown>
  );
}
