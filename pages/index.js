import UserSelector from "../components/UserSelector";
import LoginDisplay from "../components/LoginDisplay";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" bg-neutral-100 w-full text-slate-900 min-h-[100vh]">
      <header className="px-4 flex justify-between items-center bg-[#101113] py-5">
        <div>
          <a>
            <h1 className="text-2xl tracking-widest font-bold text-neutral-200">
              Last.Playlist
            </h1>
          </a>

          <h2 className="text-sm font-light tracking-wider text-neutral-200">
            Last.fm to Spotify Playlist
          </h2>
        </div>

        <LoginDisplay />
      </header>

      <UserSelector />
    </div>
  );
}
