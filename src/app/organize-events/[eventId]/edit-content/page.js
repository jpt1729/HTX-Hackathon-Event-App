import React, { Suspense } from "react";

import ThemedText from "@/components/ThemedText";
import CalendarWidget from "@/components/Card/Event/calendarWidget";
import LocationWidget from "@/components/Card/Event/locationWidget";
import URLComponent from "@/components/pages/layout/urlComponent";

import MarkdownViewTabs from "@/components/pages/organize-events/edit-content/tabs";
import { getEventData, getActivities } from "@/utils/backend-event";

export default async function EditContentPage({ params }) {
  const { eventId } = params;

  const eventData = await getEventData(eventId);
  const activitiesData = await getActivities(eventData.id);

  return (
    <main>
      <div>
        <ThemedText type="heading">Edit Content</ThemedText>
        <URLComponent />
        <div className="flex justify-between">
          <div className="flex gap-2">
            <CalendarWidget event={eventData} eventTime={eventData.eventTime} />
            <LocationWidget location={eventData.location} />
          </div>
        </div>
        <div className="bg-red-accent h-1 w-2/5 rounded-full"> </div>
      </div>
      <Suspense fallback={<></>}>
      <MarkdownViewTabs eventData={eventData} />
      </Suspense>
    </main>
  );
}
