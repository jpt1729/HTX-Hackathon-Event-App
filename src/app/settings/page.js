import { auth } from "@/auth";
import ThemedText from "@/components/ThemedText";
import { SettingsForm } from "@/components/pages/settings";

export default async function UserSettingsPage({}) {
  const session = await auth();
  console.log(session)
  return (
    <main className="w-full">
      <div>
        <ThemedText type="heading">Settings</ThemedText>
        <div className="bg-red-accent h-1 w-2/5 rounded-full"> </div>
      </div>
      <div className="pt-4 overflow-y-scroll h-[calc(100vh-56px-68px)] w-full">
        <SettingsForm session={session}/>
      </div>
    </main>
  );
}
