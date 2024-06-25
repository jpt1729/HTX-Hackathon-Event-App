import ThemedText from "@/components/ThemedText";
import URLComponent from "@/components/pages/layout/urlComponent";

import CreateActivityForm from "@/components/pages/organize-events/activity/create-activity";

export default function CreateActivity({ params, searchParams }) {
  const { eventId } = params;
  const { start, end } = searchParams;
  return (
    <main className="w-full">
      <div>
        <ThemedText type="heading">Create an Activity</ThemedText>
        <URLComponent />
        <div className="bg-red-accent h-1 w-2/5 rounded-full"> </div>
      </div>
      <div className="pt-4 overflow-y-scroll h-[calc(100vh-56px-68px)]">
        <CreateActivityForm start={start} end={end} eventSlug={eventId}/>
      </div>
    </main>
  );
}
