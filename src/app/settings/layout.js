import Navbar from "@/components/Navbar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function EventLayout({ children }) {
  const session = await auth()
  if (!session) redirect('/sign-in')
  return (
    <div className="flex gap-5 h-[calc(100vh-40px)] w-full">
      <Navbar/>
      {children}
    </div>
  );
}
