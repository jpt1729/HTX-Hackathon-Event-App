import ThemedText from "@/components/ThemedText";
import URLComponent from "@/components/pages/layout/urlComponent";

import { getActivityResponses } from "@/utils/backend-event";

import Image from "next/image";

import ResponseViewTable from "@/components/pages/event/activity/response-view";
import { PageMenu } from "@/components/pages/event/menu";

export default async function AdminPage({ params, searchParams }) {
  const { activityId } = params;
  const { id, sort } = searchParams;

  const search = {
    id: id,
    sort: sort,
  }

  const activityResponses = await getActivityResponses(activityId, search);
  return (
    <main className="w-full">
      <div>
        <ThemedText type="heading">Admin Panel</ThemedText>
        <URLComponent />
        <div className="bg-red-accent h-1 w-2/5 rounded-full"> </div>
      </div>
      <div className="pt-4 overflow-y-scroll h-[calc(100vh-56px-68px)]">
        <ResponseViewTable activityResponses={activityResponses} searchParams={searchParams}/>
      </div>
      <PageMenu/>
    </main>
  );
}
