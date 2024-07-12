import ThemedText from "@/components/ThemedText"
import { getEventData } from "@/utils/event-backend";
import JoinEventButton from "@/components/pages/event/join-event";
export default async function JoinPage({ params }){
    const { eventSlug } = params;
    const eventData = await getEventData(eventSlug);

    return (
        <main>
            <div className="absolute max-w-screen-sm w-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 p-5">
                <ThemedText type='heading'>Do you want to join <span className="text-red-accent">{eventData.title}</span>?</ThemedText>
                <JoinEventButton eventSlug={eventSlug}/>        
            </div>
        </main>
    )
}