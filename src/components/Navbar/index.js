import { auth } from "@/auth";

import { SignInNavbar } from "../auth/sign-in";
import { SignOut } from "../auth/sign-out";
export default async function Navbar({}) {
  const session = await auth();
  return (
    <nav className="min-w-[254px] h-full flex flex-col justify-between">
      <div></div>
      <div>
        {session ? (
          <div>
            <p>{session.user.name}</p>
            <SignOut />
          </div>
        ) : (
          <SignInNavbar />
        )}
      </div>
    </nav>
  );
}
