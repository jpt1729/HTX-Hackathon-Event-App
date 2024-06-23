import ThemedText from "@/components/ThemedText";
import URLComponent from "@/components/pages/layout/urlComponent";

import { getActivityResponses } from "@/utils/backend-event";

import Image from "next/image";

import ResponseViewTable from "@/components/pages/activity/response-view";

export default async function AdminPage({ searchParams }) {
  const { id } = searchParams;
  if (!id) {
    return (
      <main className="w-full">
        <div>
          <ThemedText type="heading">Admin Panel</ThemedText>
          <URLComponent />
          <div className="bg-red-accent h-1 w-2/5 rounded-full"> </div>
        </div>
        <div className="pt-4 overflow-y-scroll h-[calc(100vh-56px-68px)]"></div>
      </main>
    );
  }
  const activityResponses = await getActivityResponses(id);
  console.log(activityResponses)
  return (
    <main className="w-full">
      <div>
        <ThemedText type="heading">Admin Panel</ThemedText>
        <URLComponent />
        <div className="bg-red-accent h-1 w-2/5 rounded-full"> </div>
      </div>
      <div className="pt-4 overflow-y-scroll h-[calc(100vh-56px-68px)]">
        <ResponseViewTable activityResponses={activityResponses}/>
      </div>
    </main>
  );
}
