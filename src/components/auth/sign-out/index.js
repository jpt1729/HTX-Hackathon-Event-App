import { signOut } from "@/auth"
 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
      className="flex items-center"
    >
      <button type="submit">Sign Out</button>
    </form>
  )
} 