import ThemedText from "@/components/ThemedText";
import Image from "next/image";

import { TrashIcon } from "@heroicons/react/24/outline";

export default function ParticipantCard({ user }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Image
          src={user?.image}
          alt={`${user.name}'s profile picture`}
          width={60}
          height={60}
          className="rounded-full"
        />
        <div>
          <ThemedText type="paragraph" className="font-bold">
            {user.name}
          </ThemedText>
          <ThemedText type="subtext" className="">
            Participant
          </ThemedText>
        </div>
      </div>
      <div>
        <TrashIcon className="size-6"/>
      </div>
    </div>
  );
}
