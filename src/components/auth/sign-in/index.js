import { signIn } from "@/auth";
import GitHubIcon from "@/components/CustomIcons/github";
import ThemedText from "@/components/ThemedText";
import Link from "next/link";

export function SignInGithub() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
      className="flex gap-2 bg-[#24292f] text-white py-2 px-4 w-full rounded items-center justify-center"
    >
      <GitHubIcon className="size-6" />
      <button type="submit">
        <ThemedText type="paragraph" className="font-semibold text-white">
          Sign in with GitHub
        </ThemedText>
      </button>
    </form>
  );
}

export function SignInSlack() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
      className="flex gap-2 bg-[#24292f] text-white py-2 px-4 w-full rounded items-center justify-center"
    >
      <GitHubIcon className="size-6" />
      <button type="submit">
        <ThemedText type="paragraph" className="font-semibold text-white">
          Sign in with GitHub
        </ThemedText>
      </button>
    </form>
  );
}

export function SignInNavbar() {
  return (
    <Link className="py-2 px-4 w-full rounded" href='/sign-in'>
      Sign In
    </Link>
  )
}