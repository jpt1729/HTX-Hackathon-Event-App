import { getUserEventRole, getEventData } from "@/utils/event-backend";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function JoinLayout({ params, children }) {
  const { eventSlug } = params;
  const session = await auth();
  if (!session) {
    redirect("/sign-in");
  }
  const eventData = await getEventData(eventSlug);
  if (!eventData && !eventData.published) {
    notFound();
  }
  const userRole = await getUserEventRole(
    session?.user?.id,
    undefined,
    eventSlug
  );
  if (userRole){
    redirect(`/events/${eventSlug}`)
  }
  if (userRole.role === "banned") {
    notFound();
  }

  return <>{children}</>;
}
