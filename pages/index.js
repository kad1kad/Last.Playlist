import LoginDisplay from "../components/LoginDisplay";
import { useState } from "react";
import MusicList from "../components/MusicList";
import CreatePlaylist from "../components/CreatePlaylist";
import PeriodSelector from "../components/PeriodSelector";
import UserInputField from "../components/UserInputField";
import Head from "next/head";

export default function Home() {
  const [formInput, setFormInput] = useState({});
  const [searchResult, setSearchResult] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("overall");
  const [isActive, setIsActive] = useState(false);

  function handleInput(e) {
    const userInput = e.target.value;
    setFormInput(userInput);
  }

  console.log(formInput);

  function handlePeriod(e) {
    const period = e.target.value;
    setSelectedPeriod(period);
  }

  function handleReset() {
    setSearchResult([]);
    setIsActive(false);
  }

  const search = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${formInput}&limit=20&period=${selectedPeriod}&api_key=dd0a78c04c8e1bd9d7719ab1ef184ad1&format=json`
    );
    const musicItems = await res.json();
    setSearchResult(musicItems);
    setIsActive(true);
  };

  const songTitle = searchResult.toptracks?.track.map((item) => item.name);
  const artist = searchResult.toptracks?.track.map((item) => item.artist.name);

  return (
    <div className="bg-neutral-100 w-full text-slate-900 min-h-[100vh] pb-5">
      <Head>
        <title>Last.Playlist</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Last.fm to Spotify Playlist generator"
        />
        <meta name="keywords" content="Last.fm, Spotify, Playlist" />
      </Head>

      <header className="px-4 flex justify-between items-center bg-[#101113] py-5">
        <div>
          <h1
            className="text-2xl tracking-widest font-bold text-neutral-200 cursor-pointer"
            onClick={handleReset}
          >
            Last.Playlist
          </h1>

          <h2 className="text-sm font-light tracking-wider text-neutral-200">
            Last.fm to Spotify Playlist
          </h2>
        </div>

        <LoginDisplay />
      </header>

      <main
        className={`justify-center items-center min-h-[88vh] ${
          isActive ? "flex-col" : "flex"
        }`}
      >
        <section className="flex-col justify-center">
          <UserInputField
            handleInput={handleInput}
            handlePeriod={handlePeriod}
            search={search}
          />

          <PeriodSelector handlePeriod={handlePeriod} search={search} />
        </section>

        <MusicList musicItems={searchResult} />

        {searchResult.length === undefined && formInput.length >= 1 && (
          <CreatePlaylist
            songTitle={songTitle}
            artist={artist}
            selectedPeriod={selectedPeriod}
            userName={formInput}
          />
        )}
      </main>
    </div>
  );
}
