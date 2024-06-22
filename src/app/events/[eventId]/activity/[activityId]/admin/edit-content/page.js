import React from "react";

import ThemedText from "@/components/ThemedText";
import ThemedLabels from "@/components/ThemedText/labels";
import ThemedInput from "@/components/ThemedText/input";

import URLComponent from "@/components/pages/layout/urlComponent";

import { getActivityContentById } from "@/utils/backend-event";
import { PageMenu } from "@/components/pages/event/menu";

const EditMC = ({ activityContent }) => {
  const options = activityContent?.content?.options
    ? activityContent?.content?.options
    : [];
  return (
    <form>
      <ThemedLabels type="subheading">Title</ThemedLabels>
      <br />
      <ThemedInput type="text" defaultValue={activityContent.title} />
      <br />
      <br />
      <ThemedLabels type="subheading" className="font-bold">
        Options
      </ThemedLabels>
      <br />
      <div className="flex flex-col gap-5">
        {options.map((option, _i) => {
          return (
            <div key={_i}>
              <ThemedLabels>Option {_i + 1}: </ThemedLabels>
              <ThemedInput type="text" defaultValue={option} />
            </div>
          );
        })}
        <div>
          <ThemedLabels>Option {options.length + 1}: </ThemedLabels>
          <ThemedInput type="text" placeholder="New option"/>
        </div>
      </div>
      <ThemedInput type="submit" value="save" />
    </form>
  );
};
export default async function ViewActivityContentPage({
  params,
  searchParams,
}) {
  const { activityId } = params;
  const { id } = searchParams;
  const activityContent = await getActivityContentById(id);
  console.log(activityContent);
  return (
    <main className="w-full">
      <div>
        <ThemedText type="heading">Edit Content</ThemedText>
        <URLComponent />
        <div className="bg-red-accent h-1 w-2/5 rounded-full"> </div>
      </div>
      <div className="pt-5 h-[calc(100vh-40px-32px-68px)]">
        <EditMC activityContent={activityContent} />
      </div>
      <PageMenu />
    </main>
  );
}
