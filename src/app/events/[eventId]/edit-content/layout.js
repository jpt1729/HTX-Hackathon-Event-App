import { notFound } from "next/navigation";
import { getEventData, getUserEventRole } from "@/utils/event-backend";

import { auth } from "@/auth";

export default async function ProtectedLayout({ children, params }) {
  const { eventId } = params;
  const eventData = await getEventData(eventId);

  const session = await auth();

  const userEventRole = await getUserEventRole(session?.user?.id, eventData.id);
  if (!(userEventRole.role === "organizer" || userEventRole.role === "owner")) {
    return notFound();
  }
  return <>{children}</>;
}
