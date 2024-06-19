"use client"
import ThemedText from "@/components/ThemedText";
import Image from "next/image";
import { useModal } from "@/utils/context/ModalContext";

import PromoteUser from "./promote-user";

import { TrashIcon, UserPlusIcon } from "@heroicons/react/24/outline";

export default function ParticipantCard({ user, owner }) {
  const { showModal } = useModal()
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
            {owner ? "Owner" : "Participant"}
          </ThemedText>
        </div>
      </div>
      <div className="flex justify-center gap-2">
        {!owner && (
          <>
            <PromoteUser user={user}/>
            <button onClick = {() => {
              showModal(<>Remove User?</>)
            }}>
              <TrashIcon className="size-6 hover:stroke-warning transition-colors" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
