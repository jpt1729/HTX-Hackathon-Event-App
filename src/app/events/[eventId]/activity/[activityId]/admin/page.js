import ThemedText from "@/components/ThemedText";
import URLComponent from "@/components/pages/layout/urlComponent";

import { getActivityResponses } from "@/utils/backend-event";

import Image from "next/image";

import ResponseViewRow from "@/components/pages/activity/response-view";

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

  return (
    <main className="w-full">
      <div>
        <ThemedText type="heading">Admin Panel</ThemedText>
        <URLComponent />
        <div className="bg-red-accent h-1 w-2/5 rounded-full"> </div>
      </div>
      <div className="pt-4 overflow-y-scroll h-[calc(100vh-56px-68px)]">
        <table className="w-full border-spacing-y-5">
          <thead>
            <tr className="border-2 border-b-gray border-x-0 border-t-0">
              <th className="5%">{/*Left purposely blank*/}</th>
              <th className="w-[20%]">
                <ThemedText className="font-bold">id</ThemedText>
              </th>
              <th className="w-[60%]">
                <ThemedText className="font-bold">Response</ThemedText>
              </th>
              <th className="w-[15%]">
                <ThemedText className="font-bold">user</ThemedText>
              </th>
            </tr>
          </thead>
          <tbody className="border-spacing-y-1">
            {activityResponses &&
              activityResponses.map((activityResponse) => {
                return (
                  <ResponseViewRow key={activityResponse.id} activityResponse={activityResponse}/>
                );
              })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
