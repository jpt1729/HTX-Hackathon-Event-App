import URLComponent from "@/components/pages/layout/urlComponent";
import ThemedText from "@/components/ThemedText";
import { PageMenu } from "@/components/pages/event/menu";
import CustomCalendar from "@/components/pages/event/activity/calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {
    getEventData,
    getActivities,
  } from "@/utils/backend-event";

export default async function Activity({ params }) {
    const { eventId } = params;

    const eventData = await getEventData(eventId);
    const activitiesData = await getActivities(eventData.id);
  return (
    <main className="w-full">
    <div>
        <ThemedText type="heading">{eventData.title}</ThemedText>
        <URLComponent />
        <div className="bg-red-accent h-1 w-2/5 rounded-full"> </div>
      </div>
      <div className="w-full h-[calc(100vh-40px-32px-68px)] pt-5">
        <CustomCalendar activities={activitiesData} eventData={eventData} />
      </div>
      <PageMenu/>
    </main>
  );
}
