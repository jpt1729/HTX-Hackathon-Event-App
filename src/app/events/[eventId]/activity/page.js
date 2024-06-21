import CustomCalendar from "@/components/pages/event/activity/calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {
    getAllSlugs,
    getEventData,
    getActivities,
  } from "@/utils/backend-event";

export default async function Activity({ params }) {
    const { eventId } = params;

    const eventData = await getEventData(eventId);
    const activitiesData = await getActivities(eventData.id);
  return (
    <main>
      <CustomCalendar activities={activitiesData} />
    </main>
  );
}
