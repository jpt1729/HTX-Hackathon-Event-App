import React from "react";

import ThemedText from "@/components/ThemedText";
import { PageMenu } from "@/components/pages/event/menu";

import URLComponent from "@/components/pages/layout/urlComponent";
import LeaveEvent from "@/components/pages/event/leave-event";

import { getEventData } from "@/utils/event-backend";


export default async function EditContentPage({ params }) {
  const { eventId } = params;

  const eventData = await getEventData(eventId);

  //TODO: allow owner to add people as an owner, invite users, and remove users!
  return (
    <main className="w-full">
      <div>
        <ThemedText type="heading">Options</ThemedText>
        <URLComponent />
        <div className="bg-red-accent h-1 w-2/5 rounded-full"> </div>
      </div>
      <div className="pt-4 overflow-y-scroll h-[calc(100vh-40px-32px-68px)]">
        <div>
          <ThemedText type="subheading">Developer Info</ThemedText>
          <ThemedText type="subtext">id: {eventData.id}</ThemedText>
        </div>
        <LeaveEvent eventId={eventData.id}/>
      </div>
      <PageMenu/>
    </main>
  );
}
