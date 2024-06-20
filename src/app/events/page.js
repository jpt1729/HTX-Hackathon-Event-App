import EventCard from "@/components/Card/Event";
import URLComponent from "@/components/pages/layout/urlComponent";
import ThemedText from "@/components/ThemedText";

import AddEvent from "@/components/pages/event/add-event";

import ThisComponentThrowsAnError from '@/components/ErrorBound/throw-error'

import { getEventsForUser } from "@/utils/backend-event";
import { auth } from "@/auth";

export default async function Events() {
  const session = await auth();

  const userEvents = await getEventsForUser(session?.user?.id);
  return (
    <main className="w-full">
      <div>
        <ThemedText type="heading">Your Events</ThemedText>
        <URLComponent />
      </div>
      <div className="flex flex-col gap-4 pt-4 overflow-y-scroll h-[calc(100vh-40px-64px-16px)]">
        {userEvents &&
          userEvents.map((eventData) => {
            return (
              <EventCard
                key={eventData.id}
                id={eventData.slug}
                title={eventData.title}
                description={eventData.description}
                eventTime={eventData.eventTime}
                location={eventData.location}
              />
            );
          })}
      </div>
      <AddEvent userId = {session?.user?.id}/>
    </main>
  );
}
