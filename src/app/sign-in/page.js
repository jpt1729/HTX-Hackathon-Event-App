import { SignInGithub } from "@/components/auth/sign-in";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function SignInPage({}) {
  const session = await auth();
  if (session) redirect("/events");
  return (
    <main className="flex justify-center items-center">
      <div className="max-w-sm w-full">
        <SignInGithub />
      </div>
    </main>
  );
}
