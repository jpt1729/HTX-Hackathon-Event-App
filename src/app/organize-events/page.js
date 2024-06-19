import OrganizerEventCard from "@/components/Card/Event/organize";
import URLComponent from "@/components/pages/layout/urlComponent";
import ThemedText from "@/components/ThemedText";

import { getOrganizerEventsForUser } from "@/utils/backend-organizer-events";
import { auth } from "@/auth";

export default async function Events() {
  const session = await auth();

  const userEvents = await getOrganizerEventsForUser(session.user.id);
  return (
    <main className="w-full">
      <div>
        <ThemedText type="heading">Events Organized by Me</ThemedText>
        <URLComponent />
      </div>
      <div className="flex flex-col gap-4 pt-4 h-[calc(100vh-40px-64px-16px)]">
        {userEvents &&
          userEvents.map((eventData) => {
            return (
              <OrganizerEventCard
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
    </main>
  );
}
