import UserSelector from "../components/UserSelector";
import LoginDisplay from "../components/LoginDisplay";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black w-full text-slate-50 min-h-[100vh] pt-5">
      <header className="px-4 flex justify-between items-center">
        <div>
          <Link href="/">
            <a>
              <h1 className="text-lg tracking-widest font-bold text-blue-300">
                Last.Playlist
              </h1>
            </a>
          </Link>
          <h2 className="text-sm font-light tracking-wider">
            Last.fm to Spotify playlist
          </h2>
        </div>

        <LoginDisplay />
      </header>

      <UserSelector />
    </div>
  );
}
