import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

function LoginDisplay() {
  const { data: session } = useSession();
  return (
    <div>
      {!session && (
        <>
          <h1 className="text-red-500 text-lg">You are not signed in</h1> <br />
          <button className=" bg-red-500 p-5 rounded-xl " onClick={signIn}>
            Sign in
          </button>
        </>
      )}

      {session && (
        <>
          <h1>Signed in as {session.user.email} </h1> <br />
          <h2>
            Go to your{" "}
            <Link href="/userselect">
              <a>Last.fm Top Tracks</a>
            </Link>{" "}
          </h2>
          <button onClick={signOut}>Sign out</button>
        </>
      )}
    </div>
  );
}

export default LoginDisplay;
