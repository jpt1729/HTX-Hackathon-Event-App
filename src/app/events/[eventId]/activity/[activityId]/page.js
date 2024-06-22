import ThemedText from "@/components/ThemedText";
import URLComponent from "@/components/pages/layout/urlComponent";
import CustomMarkdown from "@/components/pages/markdown";
import QA from "@/components/pages/activity/qa";
import Options from "@/components/pages/activity/options";

import LocationWidget from "@/components/Card/Event/locationWidget";
import CalendarWidget from "@/components/Card/Event/calendarWidget";

import { getActivityData } from "@/utils/backend-event";

const Render = ({ activityData }) => {
  const content = activityData.activitycontent
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
                />
              );
            case "MC":
              return (
                <Options
                  id={contentPiece.id}
                  key={contentPiece.id}
                  title={contentPiece.title}
                  options={contentPiece.content.options}
                />
              );
            case "md":
              return (
                <div key={contentPiece.id}>
                  <CustomMarkdown id={contentPiece.id} source={contentPiece.content.markdown} />
                </div>
              );
          }
        })}
    </>
  );
};
export default async function ActivityPage({ params }) {
  const { activityId } = params
  const activityData = await getActivityData(activityId)
  return (
    <main>
      <div>
        <ThemedText type="heading">{activityData.title}</ThemedText>
        <URLComponent />
        <div className="flex justify-between">
          <div className="flex gap-2">
            <CalendarWidget event={activityData} eventTime={activityData.eventTime} />
          </div>
        </div>
        <div className="bg-red-accent h-1 w-2/5 rounded-full"> </div>
      </div>
      <div className="flex flex-col gap-4 w-full h-[calc(100vh-172px)] overflow-y-scroll pr-3 pt-4">
        <Render activityData={activityData} />
      </div>
    </main>
  );
}
