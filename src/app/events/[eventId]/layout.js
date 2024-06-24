import AlertNotification from '@/components/Notifications/alert'
import { EventProvider } from '@/utils/context/EventContext';

export default function EventLayout({ params, children }) {
  const { eventId } = params;
  //todo: implement error bound
  const notifications = [
    {
      id: '123',
      content: 'JavaScript programmer spotted. These programmers turn feral when others talk about any other language',
      type: 'alert'
    }
  ]
  return (
    <EventProvider eventSlug={eventId}>
      {children}
      {notifications && notifications.map((notification) => {
        <AlertNotification key={notification.id} close={() => {
          notifications.pop(0)
        }}>
          {notification.content}
        </AlertNotification>
      })}
    </EventProvider>
  );
}
