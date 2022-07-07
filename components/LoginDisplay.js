import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

function LoginDisplay() {
  const { data: session } = useSession();
  return (
    <nav className="flex gap-3 text-xs">
      {!session && (
        <>
          <button
            className="border-white w-20 h-8 border-2 rounded-full"
            onClick={signIn}
          >
            Sign in
          </button>
        </>
      )}

      {session && (
        <>
          {/* <h1 className="mr-1">Signed in as {session.user.name} </h1> */}
          <button
            className="border-white w-20 h-8 border-2 rounded-full"
            onClick={signOut}
          >
            Sign out
          </button>
        </>
      )}
    </nav>
  );
}

export default LoginDisplay;
