import URLComponent from "@/components/pages/layout/URLComponent.js";
import ThemedText from "@/components/ThemedText";

import { MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import Link from 'next/link'
import { formatTime } from "@/utils/index.js";
import styles from './event.module.css'

const EventInfo = {
  id: "a8L101jkia",
  creator: "John",
  title: "Average Event Title In my Opinion",
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui
        vivamus arcu felis bibendum ut. Praesent elementum facilisis leo vel
        fringilla. Tellus integer feugiat scelerisque varius. Habitasse platea
        dictumst quisque sagittis purus sit amet volutpat. Et leo duis ut diam
        quam nulla porttitor massa id.`,
  eventTime: {
    startTime: new Date(2024, 4, 12, 16, 10, 10),
    endTime: new Date(2024, 5, 13, 10, 10, 10),
  },
  location: {
    address: "401 Franklin St, Houston, TX 77201, USA",
    googleMapsLink: "https://maps.app.goo.gl/WWfBrhsYFanNg8ZK8",
  },
};
export default function EventsPage() {
  return (
    <main>
      <div>
        <ThemedText type="heading">{EventInfo.title}</ThemedText>
        <URLComponent />
        <div>
        <div className="flex gap-1">
          <CalendarDaysIcon className="size-6" />
          <ThemedText icon="location_on" type="paragraph">
            {formatTime(EventInfo.eventTime.startTime)} - {formatTime(EventInfo.eventTime.endTime)}
          </ThemedText>
        </div>

        {EventInfo.location.googleMapsLink ? (
          <Link href={EventInfo.location.googleMapsLink} className={`flex gap-1 ${styles.Location}`}>
            <MapPinIcon className="size-6" />
            <ThemedText icon="location_on" type="paragraph">
              {EventInfo.location.address}
            </ThemedText>
          </Link>
        ) : (
          <div className="flex gap-1">
            <MapPinIcon className="size-6" />
            <ThemedText icon="location_on" type="paragraph">
              {EventInfo.location.address}
            </ThemedText>
          </div>
        )}
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-4"></div>
    </main>
  );
}
