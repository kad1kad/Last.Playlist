import { useState } from "react";
import MusicList from "./MusicList";
import periods from "../utils/periods";

function UserSelector() {
  const [formInput, setFormInput] = useState({});
  const [searchResult, setSearchResult] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(false);
    setSearchResult(musicItems);
  };

  const [selectedPeriod, setSelectedPeriod] = useState("overall");

  function handlePeriod(e) {
    const period = e.target.value;
    setSelectedPeriod(period);
  }

  return (
    <main className="px-8 py-4">
      <form onSubmit={search}>
        <input
          type="text"
          className="border-slate-900 rounded-lg border-2 mr-5 py-1 px-3"
          onChange={handleInput}
          placeholder="Search for username"
        />
        <button
          type="submit"
          className="bg-slate-900 tracking-wider text-gray-50 px-4 py-[.4rem] rounded-2xl hover:scale-105  active:scale-95 transition-all"
        >
          Submit
        </button>
      </form>

      <select onChange={handlePeriod}>
        {periods.map((period, index) => (
          <option key={index} value={period}>
            {period}
          </option>
        ))}
      </select>

      <MusicList musicItems={searchResult} />
    </main>
  );
}

export default UserSelector;
