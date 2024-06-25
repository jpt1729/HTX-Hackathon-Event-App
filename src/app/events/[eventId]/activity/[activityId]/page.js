import EditBar from "@/components/pages/activity/edit-bar";


import { notFound } from "next/navigation";

import ThemedText from "@/components/ThemedText";
import URLComponent from "@/components/pages/layout/urlComponent";
import CustomMarkdown from "@/components/pages/markdown";
import QA from "@/components/pages/activity/qa";
import Options from "@/components/pages/activity/options";
import ActivityMenu from "@/components/pages/activity/menu";
import CalendarWidget from "@/components/Card/Event/calendarWidget";

import { auth } from "@/auth";
import { getActivityData, getUserActivityRole } from "@/utils/backend-event";

import { CreateContentBar } from "@/components/pages/activity/create-content";

const Render = ({ activityData, admin }) => {
  const content = activityData.activitycontent;
  return (
    <>
      {content &&
        content.map((contentPiece) => {
          switch (contentPiece.type) {
            case "QA":
              return (
                <QA
                  id={contentPiece.id}
                  key={contentPiece.id}
                  title={contentPiece.title}
                  question={contentPiece.content.question}
                  admin={admin}
                />
              );
            case "MC":
              return (
                <Options
                  id={contentPiece.id}
                  key={contentPiece.id}
                  title={contentPiece.title}
                  options={contentPiece.content.options}
                  admin={admin}
                />
              );
            case "md":
              return (
                <div key={contentPiece.id} className="flex items-center gap-5">
                  {admin && <EditBar id={contentPiece.id} />}
                  <div>
                    <CustomMarkdown
                      id={contentPiece.id}
                      source={contentPiece.content.markdown}
                    />
                  </div>
                </div>
              );
          }
        })}
    </>
  );
};
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
        <Render activityData={activityData} admin={admin} />
        {admin && (
          <CreateContentBar activityId={activityData.id}/>
        )}
      </div>
      <ActivityMenu admin={admin} />
    </main>
  );
}
