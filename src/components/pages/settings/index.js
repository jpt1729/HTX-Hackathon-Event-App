import ThemedInput from "@/components/ThemedText/input";
import ThemedLabels from "@/components/ThemedText/labels";
import Image from "next/image";

export function SettingsForm({ session }) {
  return (
    <form>
      <ThemedLabels className="font-bold">Name</ThemedLabels><br/>
      <ThemedInput type="text" name="name" defaultValue={session.user.name} /><br/>
      <br/>
      <ThemedLabels className="font-bold">Email</ThemedLabels><br/>
      <ThemedInput type="text" name="name" defaultValue={session.user.email} /><br/>
      <ThemedLabels className="font-bold">Profile Picture</ThemedLabels><br/>
      <Image src={session.user.image} alt='Your profile picture' width={120} height={120} className="rounded-full"/>
      <input type='file'/><br/>
    </form>
  );
}
