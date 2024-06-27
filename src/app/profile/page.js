import ThemedText from "@/components/ThemedText";

import Image from "next/image";
import { auth } from "@/auth";

export default async function Profile({}) {
  const session = await auth();
  console.log(session)
  return (
    <main>
      <div className="flex items-center gap-5">
        <Image
          src={session.user?.image}
          alt={`${session.user?.name}'s profile picture`}
          width={180}
          height={180}
          className="rounded-full"
        />
        <div>
            <ThemedText type="heading">{session.user?.name}</ThemedText>
            <ThemedText type="subtext">{session.user?.id}</ThemedText>
        </div>
      </div>
    </main>
  );
}
