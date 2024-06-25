import AlertNotification from "@/components/Notifications/alert";

export default function EventLayout({ params, children }) {
  //todo: implement error bound
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
