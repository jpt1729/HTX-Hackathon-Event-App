import Image from "next/image";
import ThemedText from "@/components/ThemedText";

export default function UserCard({ user }){
  return (
    <div className="flex items-center gap-1">
      <Image
        className="rounded-full"
        alt={`Profile picture of ${user.name}`}
        src={user.image}
        width={20}
        height={20}
      />
      <ThemedText>{user.name}</ThemedText>
    </div>
  );
};
