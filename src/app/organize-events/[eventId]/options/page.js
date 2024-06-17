import React from "react";

import ThemedText from "@/components/ThemedText";
import URLComponent from "@/components/pages/layout/urlComponent";
import ParticipantCard from "@/components/pages/organize-events/participantCard";

import { getEventData } from "@/utils/backend-event";
import { getEventParticipants } from "@/utils/backend-event";

export default async function EditContentPage({ params }) {
  const { eventId } = params;

  const eventData = await getEventData(eventId);
  const eventParticipants = await getEventParticipants(eventData.id)

  //TODO: allow owner to add people as an owner, invite users, and remove users!
  return (
    <main className="w-full">
      <div>
        <ThemedText type="heading">Options</ThemedText>
        <URLComponent />
        <div className="bg-red-accent h-1 w-2/5 rounded-full"> </div>
      </div>
      <div className="pt-4">
        
      </div>
    </main>
  );
}
