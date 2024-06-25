import React, { Suspense } from "react";
import dynamic from "next/dynamic";

import ThemedText from "@/components/ThemedText";
import URLComponent from "@/components/pages/layout/urlComponent";

import { getEventData } from "@/utils/event-backend";

import { PageMenu } from "@/components/pages/event/menu";

const EditorComp = dynamic(
  () => import("@/components/pages/event/md-editor"),
  { ssr: false }
);

export default async function EditContentPage({ params }) {
  const { eventId } = params;

  const eventData = await getEventData(eventId);

  return (
    <main>
      <div>
        <ThemedText type="heading">Edit Content</ThemedText>
        <URLComponent />
        <div className="bg-red-accent h-1 w-2/5 rounded-full"> </div>
      </div>
      <div className="pt-5 h-[calc(100vh-40px-32px-68px)] w-full">
        <Suspense fallback={null}>
          <EditorComp markdown={eventData.content} eventId={eventData.id} />
        </Suspense>
      </div>
      <PageMenu/>
    </main>
  );
}
