import Card from "./index.js";
import ThemedText from "../ThemedText";
import { MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { formatTime } from "@/utils/index.js";

import Link from "next/link";

/*
{
    id: '',
    creator: '',
    title: '',
    description: '',
    eventTime: {
        startTime: new Date(),
        endTime: new Date(),
    },
    location: {
      address: '',
      googleMapsLink: ''
    },
  }
*/

const dateOption = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
}

export default function EventCard({
  id,
  title,
  description,
  eventTime,
  location,
}) {
  return (
    <Card>
      <ThemedText type="subheading">{title}</ThemedText>
      <ThemedText type="paragraph">{description}</ThemedText>
      <div className="flex gap-2">
        <div className="flex gap-1">
          <CalendarDaysIcon className="size-6" />
          <ThemedText icon="location_on" type="paragraph">
            {formatTime(eventTime.startTime)} - {formatTime(eventTime.endTime)}
          </ThemedText>
        </div>
        <div className="flex gap-1">
          <MapPinIcon className="size-6" />
          <ThemedText icon="location_on" type="paragraph">
            {location.googleMapsLink ? (
              <Link href={location.googleMapsLink}>{location.address}</Link>
            ) : (
              location.address
            )}
          </ThemedText>
        </div>
      </div>
    </Card>
  );
}
