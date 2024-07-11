import { signOutAction } from "./action";

export function SignOut({ children, ...props }) {
  return (
    <form
      action={async () => {
        await signOutAction();
      }}
      className="flex items-center"
    >
      <button name="Sign Out" type="submit" {...props}>
        {children ? children : "Sign Out"}
      </button>
    </form>
  );
}
