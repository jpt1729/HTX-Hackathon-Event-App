import { auth } from "@/auth";
import ThemedText from "@/components/ThemedText";
import Image from "next/image";

import { SignOut } from "../auth/sign-out";

export default async function Profile({}) {
  const session = await auth();
  return (
    <div className="flex justify-between">
      <div className="flex gap-2 items-center">
        <Image
          src={session?.user?.image}
          alt={`${session?.user?.name}'s profile picture`}
          width={30}
          height={30}
          className="rounded-full"
        />
        <ThemedText type="paragraph" className="font-bold">
          {session?.user?.name}
        </ThemedText>
      </div>
      <SignOut />
    </div>
  );
}
