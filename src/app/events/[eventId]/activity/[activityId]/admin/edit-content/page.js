import React from "react";
import { MinusIcon } from "@heroicons/react/24/outline";

import ThemedText from "@/components/ThemedText";
import ThemedLabels from "@/components/ThemedText/labels";
import ThemedInput from "@/components/ThemedText/input";

import URLComponent from "@/components/pages/layout/urlComponent";

import { getActivityContentById } from "@/utils/event-backend";
import { PageMenu } from "@/components/pages/event/menu";

import EditMC from "@/components/pages/event/activity/edit/edit-mc";
import EditQA from "@/components/pages/event/activity/edit/edit-qa";
import EditMD from "@/components/pages/event/activity/edit/edit-md";
const RenderEditor = ({ activityContent }) => {
  switch (activityContent.type) {
    case "MC":
      return <EditMC activityContent={activityContent} />;
    case "QA":
      return <EditQA activityContent={activityContent} />;
    case "md":
      return <EditMD activityContent={activityContent} />;
  }
};

export default async function ViewActivityContentPage({
  params,
  searchParams,
}) {
  const { activityId } = params;
  const { id } = searchParams;
  if (!id) {
    return <></>;
  }
  const activityContent = await getActivityContentById(id);

  return (
    <main className="w-full">
      <div>
        <ThemedText type="heading">Edit Content</ThemedText>
        <URLComponent />
        <div className="bg-red-accent h-1 w-2/5 rounded-full"> </div>
      </div>
      <div className="pt-5 h-[calc(100vh-40px-32px-68px)] overflow-y-scroll">
        <RenderEditor activityContent={activityContent} />
      </div>
      <PageMenu />
    </main>
  );
}
