import { getUserRole } from "@/utils/backend-organizer-events";
import { auth } from "@/auth";

import { notFound } from "next/navigation";

import AlertNotification from "@/components/Notifications/alert";

const checkPermission = async (userId, eventSlug) => {
  const res = await getUserRole(userId, undefined, eventSlug);
  return res.role === "organizer" || res.role === "owner";
};

export default async function EventLayout({ params, children }) {
  //todo: implement error bound
  const { eventId } = params;
  
  const session = await auth();
  if (!session) {
    return notFound();
  }
  const userPermissions = await checkPermission(session?.user?.id, eventId)
  if (!userPermissions) {
    return notFound();
  }

  const notifications = [
    {
      id: "123",
      content:
        "JavaScript programmer spotted. These programmers turn feral when others talk about any other language",
      type: "alert",
    },
  ];
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
