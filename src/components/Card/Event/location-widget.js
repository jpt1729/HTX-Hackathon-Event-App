import { MapPinIcon } from "@heroicons/react/24/outline";
import ThemedText from "@/components/ThemedText";
import Link from "next/link";
import styles from '../event.module.css'

export default function LocationWidget({ location }) {
  if (location.googleMapsLink) {
    return (
      <Link
        href={location.googleMapsLink}
        className={`flex gap-1 ${styles.Location}`}
      >
        <MapPinIcon className="size-6" />
        <ThemedText icon="location_on" type="paragraph">
          {location.address}
        </ThemedText>
      </Link>
    );
  }
  return (
    <div className="flex gap-1">
      <MapPinIcon className="size-6" />
      <ThemedText icon="location_on" type="paragraph">
        {location.address}
      </ThemedText>
    </div>
  );
}
