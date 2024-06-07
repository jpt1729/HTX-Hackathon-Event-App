import { MapPinIcon } from "@heroicons/react/24/outline";
import ThemedText from "@/components/ThemedText";
import Link from "next/link";
import styles from '@/components/Card/event.module.css'
import PropTypes from "prop-types";
/**
 * EventTime Object
 * @typedef {Object} Location
 * @property {string} address - Address of location
 * @property {string} googleMapsLink - Google Maps Link
 */
/**
 * This component renders a location widget
 *
 * @param {Object} props - Component properties
 * @param {Location} [props.location] location of the Event
 * @returns {React.ReactNode} A React element that renders a location widget
 */
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
LocationWidget.propTypes = {
  location: PropTypes.Object,
};