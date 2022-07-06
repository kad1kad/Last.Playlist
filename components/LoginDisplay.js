import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

function LoginDisplay() {
  const { data: session } = useSession();
  return (
    <nav className="flex gap-5 px-8 py-5">
      {!session && (
        <>
          <h1 className="mr-5">You are not signed in</h1> <br />
          <button className=" " onClick={signIn}>
            Sign in
          </button>
        </>
      )}

      {session && (
        <>
          <h1 className="mr-5">Signed in as {session.user.name} </h1> <br />
          <button onClick={signOut}>Sign out</button>
        </>
      )}
    </nav>
  );
}

export default LoginDisplay;
