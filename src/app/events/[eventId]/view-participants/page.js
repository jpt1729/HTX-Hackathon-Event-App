import React from "react";

import ThemedText from "@/components/ThemedText";
import URLComponent from "@/components/pages/layout/urlComponent";
import ParticipantCard from "@/components/pages/event/participant-card/";
import { PageMenu } from "@/components/pages/event/menu";
import ParticipantTable from "@/components/pages/event/participant-card/participant-table";

import { auth } from "@/auth";
import { getEventParticipants, getUserEventRole } from "@/utils/event-backend";

export default async function ViewParticipantsPage({ params, searchParams }) {
  const { eventId } = params;
  const { userRole, joined, query } = searchParams;

  let search = {
    role: userRole,
    sort: joined,
    search: query
  }

  const session = await auth();
  const userEventRole = await getUserEventRole(session?.user?.id);
  const eventParticipants = await getEventParticipants(undefined, eventId, search=search);
  //TODO: allow owner to add people as an owner, invite users, and remove users!
  return (
    <main className="w-full">
      <div>
        <ThemedText type="heading">Participants</ThemedText>
        <URLComponent />
        <div className="bg-red-accent h-1 w-2/5 rounded-full"> </div>
      </div>
      <div className="pt-5 flex flex-col gap-2 h-[calc(100vh-40px-32px-68px)]">
        {(userEventRole.role === 'participant') && eventParticipants &&
          eventParticipants.map((user, _i) => {
            return (
              <ParticipantCard
                key={_i}
                user={user}
                currentUser={userEventRole}
                admin={
                  userEventRole.role === "organizer" ||
                  userEventRole.role === "owner"
                }
              />
            );
          })}
          {(userEventRole.role === 'owner' || userEventRole.role === 'organizer') && eventParticipants && <ParticipantTable eventParticipants={eventParticipants}/>}
      </div>
      <PageMenu />
    </main>
  );
}
