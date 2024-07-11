import EditBar from "@/components/pages/event/activity/content/edit-bar";

import { notFound } from "next/navigation";

import ThemedText from "@/components/ThemedText";
import URLComponent from "@/components/pages/layout/urlComponent";
import Render from "@/components/tip-tap-editor/render";
import QA from "@/components/pages/event/activity/content/qa";
import Options from "@/components/pages/event/activity/content/options";
import ActivityMenu from "@/components/pages/event/activity/menu";
import CalendarWidget from "@/components/Card/Event/calendarWidget";

import { auth } from "@/auth";
import { getActivityData, getUserActivityRole } from "@/utils/activity-backend";

import { CreateContentBar } from "@/components/pages/event/activity/content/create-content";

import { RenderActivityContent } from "@/components/pages/event/activity/content/render";

export default async function ActivityPage({ params }) {
  const { activityId } = params;
  const session = await auth();
  const activityData = await getActivityData(activityId);
  if (!activityData) {
    notFound();
  }
  const userActivityRole = await getUserActivityRole(
    session?.user?.id,
    activityData.id
  );
  const admin =
    userActivityRole?.role === "organizer" ||
    userActivityRole?.role === "owner";
  return (
    <main className="w-full">
      <div>
        <ThemedText type="heading">{activityData.title}</ThemedText>
        <URLComponent />
        <div className="flex justify-between">
          <div className="flex gap-2">
            <CalendarWidget
              event={activityData}
              eventTime={activityData.eventTime}
            />
          </div>
        </div>
        <div className="bg-red-accent h-1 w-2/5 rounded-full"> </div>
      </div>
      <div className="flex flex-col gap-4 w-full h-[calc(100vh-172px)] overflow-y-scroll pr-3 pt-4">
        <RenderActivityContent activityData={activityData} admin={admin} />
      </div>
      <ActivityMenu admin={admin} />
    </main>
  );
}
