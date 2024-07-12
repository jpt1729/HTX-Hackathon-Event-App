import AlertNotification from "@/components/Notifications/alert";

import { getUserEventRole, getEventData } from "@/utils/event-backend";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function EventLayout({ params, children }) {
  const { eventId } = params;
  const notifications = [
    {
      id: "123",
      content:
        "JavaScript programmer spotted. These programmers turn feral when others talk about any other language",
      type: "alert",
    },
  ];

  const session = await auth();
  if (!session) {
    redirect('/sign-in');
  }
  const eventData = await getEventData(eventId)
  if (!eventData){
    notFound()
  }
  const userRole = await getUserEventRole(session?.user?.id, undefined, eventId);

  if (!eventData.published && (userRole.role !== 'organizer' || userRole.role !== 'owner')){
    notFound();
  }
  if (!userRole) {
    redirect(`/join/${eventId}`)
  }
  if (userRole.role === 'banned'){
    notFound();
  }
  return (
    <>
      {children}
      {notifications &&
        notifications.map((notification) => {
          <AlertNotification
            key={notification.id}
            close={() => {
              notifications.pop(0);
            }}
          >
            {notification.content}
          </AlertNotification>;
        })}
    </>
  );
}
