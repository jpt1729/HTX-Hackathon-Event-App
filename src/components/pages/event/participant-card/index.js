"use client";
import ThemedText from "@/components/ThemedText";
import Image from "next/image";
// TODO: make it so that the owner can remove organizers but not vice versa

export default function ParticipantCard({ user }) {
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
    </div>
  );
}
