import { auth } from "@/auth";

import { notFound } from "next/navigation";

import { getActivityData, getUserActivityRole } from "@/utils/backend-event";

const checkPermission = async (userId, activityId) => {
  const res = await getUserActivityRole(userId, activityId);
  return res?.role === "organizer" || res?.role === "owner";
};

export default async function EventLayout({ params, children }) {
  //todo: implement error bound
  const { activityId } = params;

  const activityData = await getActivityData(activityId);

  const session = await auth();
  if (!session) {
    return notFound();
  }
  const userPermissions = await checkPermission(session?.user?.id, activityData.id)
  if (!userPermissions) {
    return notFound();
  }
  return (
    <>
      {children}
    </>
  );
}
