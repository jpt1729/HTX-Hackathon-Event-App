import EventCard from "@/components/Card/event";

const eventCards = [
  {
    id: 'a8L101jkia',
    creator: 'John',
    title: 'Average Event Title In my Opinion',
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
      address: '401 Franklin St, Houston, TX 77201, USA',
      googleMapsLink: 'https://maps.app.goo.gl/WWfBrhsYFanNg8ZK8'
    },
  }
]

export default function Home() {
  return (
    <main className="">
      <EventCard {...eventCards[0]}/>
    </main>
  );
}
