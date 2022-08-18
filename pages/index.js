import LoginDisplay from "../components/LoginDisplay";
import { useState } from "react";
import MusicList from "../components/MusicList";
import CreatePlaylist from "../components/CreatePlaylist";
import { motion } from "framer-motion";
import PeriodSelector from "../components/periodSelector";
import UserInputField from "../components/UserInputField";

export default function Home() {
  const [formInput, setFormInput] = useState({});
  const [searchResult, setSearchResult] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("overall");
  const [isActive, setIsActive] = useState(false);

  function handleInput(e) {
    const userInput = e.target.value;
    setFormInput(userInput);
  }

  function handlePeriod(e) {
    const period = e.target.value;
    setSelectedPeriod(period);
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
          <motion.div
            initial={{ opacity: 0, y: -300 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 20, duration: 0.3 }}
          >
            <CreatePlaylist
              songTitle={songTitle}
              artist={artist}
              selectedPeriod={selectedPeriod}
              userName={formInput}
            />
          </motion.div>
        )}
      </main>
    </div>
  );
}
