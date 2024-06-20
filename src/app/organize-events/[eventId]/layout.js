import { getUserRole } from '@/utils/backend-organizer-events';
import { auth } from '@/auth';
import AlertNotification from '@/components/Notifications/alert'

const checkPermission = async (userId, eventSlug) => {
  const res = await getUserRole(userId, undefined, eventSlug)
  return (res.role === 'organizer' || res.role === 'owner')
}

export default function EventLayout({ params, children }) {
  //todo: implement error bound
  const { eventId } = params;
  const session = auth()

  if(!checkPermission(session.id, eventId)) return <h1>Not allowed {':('}</h1>;

  const notifications = [
    {
      id: '123',
      content: 'JavaScript programmer spotted. These programmers turn feral when others talk about any other language',
      type: 'alert'
    }
  ]
  return (
    <>
      {children}
      {notifications && notifications.map((notification) => {
        <AlertNotification key={notification.id} close={() => {
          notifications.pop(0)
        }}>
          {notification.content}
        </AlertNotification>
      })}
    </>
  );
}
