import CreateEventForm from "@/components/pages/organize-events/create-event/create-event-form";
import ThemedText from "@/components/ThemedText";
import URLComponent from "@/components/pages/layout/urlComponent";

export default function CreateEvent({}) {
  return (
    <main className="w-full">
      <div>
        <ThemedText type="heading">Create an Event</ThemedText>
        <URLComponent />
        <div className="bg-red-accent h-1 w-2/5 rounded-full"> </div>
      </div>
      <div className="pt-4 overflow-y-scroll h-[calc(100vh-56px-68px)]">
        <CreateEventForm />
      </div>
    </main>
  );
}
