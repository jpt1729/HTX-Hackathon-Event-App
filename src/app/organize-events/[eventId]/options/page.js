import React from "react";
import OptionsForm from "@/components/pages/organize-events/options/options-form";
import ThemedText from "@/components/ThemedText";
import ThemedLabels from "@/components/ThemedText/labels";
import ThemedInput from "@/components/ThemedText/input";

import URLComponent from "@/components/pages/layout/urlComponent";

import { getEventData } from "@/utils/backend-event";

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
      <div className="pt-4 overflow-y-scroll h-[calc(100vh-56px-68px)]">
        <OptionsForm eventData={eventData} />
      </div>
    </main>
  );
}
