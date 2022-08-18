import { useState } from "react";
import MusicList from "./MusicList";
import periods from "../utils/periods";
import { motion } from "framer-motion";
import CreatePlaylist from "./CreatePlaylist";

function UserSelector() {
  const [formInput, setFormInput] = useState({});
  const [searchResult, setSearchResult] = useState([]);

  function handleInput(e) {
    const userInput = e.target.value;
    setFormInput(userInput);
  }

  const search = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${formInput}&limit=20&period=${selectedPeriod}&api_key=dd0a78c04c8e1bd9d7719ab1ef184ad1&format=json`
    );
    const musicItems = await res.json();
    setSearchResult(musicItems);
  };

  const songTitle = searchResult.toptracks?.track.map((item) => item.name);
  const artist = searchResult.toptracks?.track.map((item) => item.artist.name);

  const [selectedPeriod, setSelectedPeriod] = useState("overall");

  function handlePeriod(e) {
    const period = e.target.value;
    setSelectedPeriod(period);
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 20, duration: 0.5 }}
      className="py-4 flex flex-col justify-center items-center min-h-[88vh] scroll-smooth"
    >
      <motion.form
        layout
        transition={{ type: "spring", duration: 1.3 }}
        onSubmit={search}
      >
        <input
          id="userInput"
          type="text"
          className="rounded-full border-2 mr-5 py-4 px-8 text-slate-900 bg-white tracking-wide"
          onChange={handleInput}
          placeholder="Last.fm User"
          spellCheck="false"
          required
        />
        <button
          type="submit"
          className="bg-[#101113] tracking-widest text-neutral-200 px-8 py-4 rounded-full hover:scale-105 transition-all active:scale-95 w-26"
        >
          Submit
        </button>
      </motion.form>
      <div className="flex items-center mt-4 gap-3">
        <p>Top Tracks period:</p>
        <select onChange={handlePeriod} className="text-slate-900 rounded-md ">
          {periods.map((period, index) => (
            <option key={index} value={period}>
              {period}
            </option>
          ))}
        </select>
      </div>

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
    </motion.main>
  );
}

export default UserSelector;
