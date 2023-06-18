import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { motion } from "framer-motion";

function CreatePlaylist({ songTitle, artist, selectedPeriod, userName }) {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [buttonText, setButtonText] = useState("Create Spotify Playlist");

  const generateCurrentDateTime = () => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const formattedDate = now.toLocaleDateString();
    return { time: formattedTime, date: formattedDate };
  };

  const buildPlaylist = async () => {
    if (!session) {
      signIn();
      return;
    }

    try {
      const { time, date } = generateCurrentDateTime();

      // Create Playlist
      const playlistName = `${userName} ${selectedPeriod} most played`;
      const playlistDescription = `Generated: ${date} ${time}`;
      const { body: playlist } = await spotifyApi.createPlaylist(playlistName, {
        description: playlistDescription,
        public: false,
      });

      console.log("Created playlist!");

      // Loading Text
      setButtonText(
        <div className="flex justify-center gap-2">
          Generating Playlist
          <FontAwesomeIcon
            className="fa-solid fa-spinner fa-spin-pulse fa-lg"
            icon={faSpinner}
          />
        </div>
      );

      // Convert last.fm song data into Spotify IDs
      const searchPromises = songTitle.map((title, index) => {
        if (spotifyApi.getAccessToken()) {
          return spotifyApi.searchTracks(
            `track:${title} artist:${artist[index]}`
          );
        }
        return Promise.resolve(null);
      });

      const searchResults = await Promise.all(searchPromises);

      const idList = searchResults
        .filter((res) => res?.body.tracks.items.length > 0)
        .map((res) => res.body.tracks.items[0].uri);

      console.log(idList);

      if (idList.length === 0) {
        console.log("No tracks to add to the playlist.");
        return;
      }

      // Get generated Playlist ID
      const { body: userPlaylists } = await spotifyApi.getUserPlaylists(
        session.user.name
      );
      const generatedPlaylistId = userPlaylists.items[0].id;

      console.log("Generated Playlist ID:", generatedPlaylistId);

      // Add tracks to the generated playlist
      await spotifyApi.addTracksToPlaylist(generatedPlaylistId, idList);

      console.log("Added tracks to playlist!");

      setButtonText(
        <div className="flex justify-center gap-2">
          Playlist generated
          <FontAwesomeIcon
            className="fa-solid fa-spinner fa-beat fa-lg"
            icon={faCheck}
          />
        </div>
      );

      setTimeout(() => {
        setButtonText("Create Spotify Playlist");
      }, 4000);
    } catch (error) {
      console.log("Something went wrong!", error);
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center"
      initial={{ opacity: 0, y: -300 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 20, duration: 0.3 }}
    >
      <button
        className="bg-[#18D860] tracking-wider text-gray-50 px-9 py-4 rounded-full hover:scale-105 active:scale-95 transition-all w-72  gap-2"
        onClick={buildPlaylist}
      >
        {buttonText}
      </button>
    </motion.div>
  );
}

export default CreatePlaylist;
