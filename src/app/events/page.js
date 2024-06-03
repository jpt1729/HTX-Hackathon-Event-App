import EventCard from "@/components/Card/event";
import URLComponent from "@/components/pages/layout/URLComponent.js";
import ThemedText from '@/components/ThemedText'
const eventCards = [
  {
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
      startTime: new Date(2024, 6, 12, 16, 10, 10),
      endTime: new Date(2024, 6, 13, 10, 10, 10),
    },
    location: {
      address: "401 Franklin St, Houston, TX 77201, USA",
      googleMapsLink: "https://maps.app.goo.gl/WWfBrhsYFanNg8ZK8",
    },
  },
  {
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
  },
];

export default function Events() {
  return (
    <main className="">
      <div>
        <ThemedText type='heading'>
          Your Events
        </ThemedText>
        <URLComponent/>
      </div>
      <div className="flex flex-col gap-4 pt-4">
        <EventCard {...eventCards[0]} />
        <EventCard {...eventCards[1]} />
      </div>
    </main>
  );
}
