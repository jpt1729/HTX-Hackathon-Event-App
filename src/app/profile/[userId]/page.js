import { notFound } from "next/navigation";
import ThemedText from "@/components/ThemedText";

import Image from "next/image";

import { getUserInfo } from "@/utils/user-backend";
import Render from "@/components/tip-tap-editor/render";

export default async function Profile({ params }) {
  const { userId } = params;
  const user = await getUserInfo(userId);
  if (!user) {
    return notFound()
  }
  return (
    <main>
      <div className="flex items-center gap-5">
        <Image
          src={user?.image}
          alt={`${user?.name}'s profile picture`}
          width={180}
          height={180}
          className="rounded-full"
        />
        <div>
            <ThemedText type="heading">{user?.name}</ThemedText>
            <ThemedText type="subtext">{userId}</ThemedText>
            <Render html={user.description}/>
        </div>
      </div>
    </main>
  );
}
