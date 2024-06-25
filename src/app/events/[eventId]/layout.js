import AlertNotification from "@/components/Notifications/alert";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function EventLayout({ params, children }) {
  //todo: implement error bound
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
    redirect('/sign-in')
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
