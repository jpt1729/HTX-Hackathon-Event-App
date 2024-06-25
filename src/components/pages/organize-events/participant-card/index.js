"use client";
import ThemedText from "@/components/ThemedText";
import Image from "next/image";

import PromoteUser from "./promote-user";
import DemoteUser from "./demote-user";
import RemoveUser from "./remove-user";

export default function ParticipantCard({ user, currentUser }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        {user?.image && (
          <Image
            src={user?.image}
            alt={`${user.name}'s profile picture`}
            width={60}
            height={60}
            className="rounded-full"
          />
        )}
        <div>
          <ThemedText type="paragraph" className="font-bold">
            {user.name}
          </ThemedText>
          <ThemedText type="subtext" className="">
            {user.role}
          </ThemedText>
        </div>
      </div>
      <div className="flex justify-center gap-2">
            {currentUser.role === 'owner' && user.role === "participant" && <PromoteUser user={user} />}
            {currentUser.role === 'owner' && user.role === "organizer" && <DemoteUser user={user} />}
            {((user.role === "organizer" && currentUser.role === "owner") || user.role==="organizer" || user.role === "participant") &&  <RemoveUser user={user}/>}
      </div>
    </div>
  );
}
