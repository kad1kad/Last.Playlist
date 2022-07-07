import { useState } from "react";
import MusicList from "./MusicList";
import periods from "../utils/periods";
import { motion } from "framer-motion";

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
      `http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${formInput}&limit=20&period=${selectedPeriod}&api_key=dd0a78c04c8e1bd9d7719ab1ef184ad1&format=json`
    );
    const musicItems = await res.json();
    setSearchResult(musicItems);
  };

  const [selectedPeriod, setSelectedPeriod] = useState("overall");

  function handlePeriod(e) {
    const period = e.target.value;
    setSelectedPeriod(period);
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 50, duration: 1 }}
      className="py-4 flex flex-col justify-center items-center min-h-[88vh] scroll-smooth"
    >
      <motion.form
        layout
        transition={{ type: "spring", duration: 1.4 }}
        onSubmit={search}
      >
        <input
          id="userInput"
          type="text"
          className="border-black rounded-full border-2 mr-5 py-4 px-8 text-slate-900 bg-blue-50"
          onChange={handleInput}
          placeholder="Search for username"
        />
        <button
          type="submit"
          className="bg-blue-300 tracking-widest text-slate-900 px-8 py-4 rounded-full hover:scale-105 transition-all active:scale-95 w-26"
        >
          Submit
        </button>
      </motion.form>

      <select
        onChange={handlePeriod}
        className="text-slate-900 rounded-md mt-3"
      >
        {periods.map((period, index) => (
          <option key={index} value={period}>
            {period}
          </option>
        ))}
      </select>

      <MusicList musicItems={searchResult} />
    </motion.main>
  );
}

export default UserSelector;
