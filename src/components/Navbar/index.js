import { CalendarDaysIcon, Cog8ToothIcon } from "@heroicons/react/24/solid";

import { auth } from "@/auth";
import Link from "next/link";
import { SignInNavbar } from "../auth/sign-in";
import ThemedText from "../ThemedText";

import Profile from "./Profile";

export default async function Navbar({}) {
  const session = await auth();
  return (
    <nav className="min-w-[254px] h-full flex flex-col justify-between">
      <div className="flex flex-col gap-2">
        <Link href="/events" className="flex items-center gap-2 hover:underline hover:!text-red-accent">
          <CalendarDaysIcon className="size-6"/>
          <span className="font-bold">My Events</span>
        </Link>
        <Link href="/organize-events" className="flex items-center gap-2 hover:underline hover:!text-red-accent">
          <Cog8ToothIcon className="size-6"/>
          <span className="font-bold">Events Organized by Me</span>
        </Link>
      </div>
      <div>{session ? <Profile session={session}/> : <SignInNavbar />}</div>
    </nav>
  );
}
