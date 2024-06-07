import { auth } from "@/auth";

import { SignInNavbar } from "../auth/sign-in";

import Profile from "./Profile";

export default async function Navbar({}) {
  const session = await auth();
  return (
    <nav className="min-w-[254px] h-full flex flex-col justify-between">
      <div></div>
      <div>{session ? <Profile /> : <SignInNavbar />}</div>
    </nav>
  );
}
