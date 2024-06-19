"use client";
import ThemedText from "@/components/ThemedText";
import Image from "next/image";
import { useModal } from "@/utils/context/ModalContext";

import PromoteUser from "./promote-user";

import { TrashIcon, UserPlusIcon } from "@heroicons/react/24/outline";
// TODO: make it so that the owner can remove organizers but not vice versa

export default function ParticipantCard({ user, owner }) {
  const { showModal } = useModal();
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
        {user.role === "participant"  && (
          <>
            <PromoteUser user={user} />
            <button
              onClick={() => {
                showModal(<>Remove User?</>);
              }}
            >
              <TrashIcon className="size-6 hover:stroke-warning transition-colors" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
