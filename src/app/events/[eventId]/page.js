import URLComponent from "@/components/pages/layout/urlComponent";
import ThemedText from "@/components/ThemedText";

import LocationWidget from "@/components/Card/Event/locationWidget";
import CalendarWidget from "@/components/Card/Event/calendarWidget";

import Menu from "@/components/pages/event/menu";

import ActivityCard from "@/components/Card/Activity";

import CustomMarkdown from "@/components/pages/markdown";

import styles from "./event.module.css";

import {
  getAllSlugs,
  getEventData,
  getActivities,
} from "@/utils/backend-event";

export default async function EventsPage({ params }) {
  const { eventId } = params;

  const eventData = await getEventData(eventId);
  const activitiesData = await getActivities(eventData.id);

  return (
    <main className="h-[calc(100vh-40px)] overflow-y-scroll w-full">
      <div>
        <ThemedText type="heading">{eventData.title}</ThemedText>
        <URLComponent />
        <div className="flex justify-between">
          <div className="flex gap-2">
            <CalendarWidget event={eventData} eventTime={eventData.eventTime} />
            <LocationWidget location={eventData.location} />
          </div>
        </div>
        <div className="bg-red-accent h-1 w-2/5 rounded-full"> </div>
      </div>
      <div className={`grid ${styles.EventGrid} gap-4 h-[calc(100vh-172px)]`}>
        <div className={`${styles.md} pt-1`}>
          <CustomMarkdown source={eventData.content} />
        </div>
        <div className={`${styles.act} overflow-y-scroll pr-1`}>
          <ThemedText type="subheading">Upcoming Activities</ThemedText>
          <div className="flex flex-col gap-2">
            {activitiesData &&
              activitiesData.map((activity, _i) => (
                <ActivityCard
                  key={_i}
                  id={activity.slug}
                  eventId={eventId}
                  title={activity.title}
                  eventTime={activity.eventTime}
                  description={activity.description}
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
      <Menu/>
    </main>
  );
}

export async function generateStaticParams() {
  const posts = await getAllSlugs();

  return posts.map((post) => ({
    eventId: post.slug,
  }));
}
