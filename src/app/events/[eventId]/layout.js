import AlertNotification from '@/components/Notifications/alert'
export default function EventLayout({ children }) {
  //todo: implement error bound
  return (
    <div>
      {children}
      <AlertNotification>
        JavaScript programmer spotted. These programmers turn feral when others talk about any other language
      </AlertNotification>
    </div>
  );
}
