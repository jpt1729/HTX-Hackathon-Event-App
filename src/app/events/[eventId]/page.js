import URLComponent from "@/components/pages/layout/urlComponent";
import ThemedText from "@/components/ThemedText";

import LocationWidget from "@/components/Card/Event/location-widget";
import CalendarWidget from "@/components/Card/Event/calendar-widget";

import ActivityCard from "@/components/Card/Activity";

import CustomMarkdown from "@/components/pages/markdown";

import styles from "./event.module.css";

const EventInfo = {
  id: "houston-hackathon",
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
  content: [
    {
      id: "swe-qa-panel",
      type: "md", // different types of content. Markdown (md), Q&A, Polls
      content: "",
    },
  ],
};

// for debugging purposes
const fiveMinutesFromNow = () => {
  const now = new Date();
  return new Date(now.getTime() + 5 * 60 * 1000);
};
export default function EventsPage({ params }) {
  const { eventId } = params;

  return (
    <main className="h-[calc(100vh-40px)] overflow-y-scroll">
      <div>
        <ThemedText type="heading">{EventInfo.title}</ThemedText>
        <URLComponent />
        <div className="flex gap-2">
          <CalendarWidget eventTime={EventInfo.eventTime} />
          <LocationWidget location={EventInfo.location} />
        </div>
        <div className="bg-red-accent h-1 w-2/5 rounded-full"> </div>
      </div>
      <div className={`grid ${styles.EventGrid} gap-4 h-[calc(100vh-136px)]`}>
        <div className={`${styles.md}`}>
          <CustomMarkdown
            source={`
          ## Welcome to our event

          We are so happy you are here. Before we can have some fun here is a checklist.
          - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porttitor rhoncus dolor purus non enim. 
          - Massa ultricies mi quis hendrerit dolor magna eget est lorem. Enim ut tellus elementum sagittis vitae. Eu mi bibendum neque egestas congue. 
          - Vel facilisis volutpat est velit. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. In hac habitasse platea dictumst quisque sagittis. 
          - Facilisi morbi tempus iaculis urna id volutpat. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas.
        `}
          />
        </div>
        <div className={`${styles.act} overflow-y-scroll pr-1`}>
          <ThemedText type="subheading">Upcoming Activities</ThemedText>
          <div className="flex flex-col gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((_i) => (
              <ActivityCard
                key={_i}
                id="swe-qa-panel"
                eventId={eventId}
                title="SWE Q&A Panel"
                eventTime={fiveMinutesFromNow()}
                description={
                  "Q&A Panel w/ Software Engineers from around the Area. Come and ask questions!"
                }
                mandatory={true}
              />
            ))}
          </div>
        </div>
        <div className={`${styles.rad}`}>
          <ThemedText type="subheading">Event Radio</ThemedText>
          <div>
            <iframe
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/playlist/37i9dQZF1E8Ow52yxxSpp5?utm_source=generator"
              width="100%"
              height="152"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
}
