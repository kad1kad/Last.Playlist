import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";
import useSpotify from "../hooks/useSpotify";

function CreatePlaylist({ songTitle, artist }) {
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  const d = new Date();
  let h = addZero(d.getHours());
  let m = addZero(d.getMinutes());
  let time = h + ":" + m;

  console.log([songTitle, artist]);

  const { data: session, status } = useSession();

  const spotifyApi = useSpotify();
  const idList = [];

  const buildPlaylist = () => {
    // Create Playlist
    spotifyApi
      .createPlaylist(`Playlist ${time}`, {
        description: "My description",
        public: false,
      })
      .then(
        function (data) {
          console.log("Created playlist!");
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );

    // Convert last.fm song data in to spoity IDs
    for (let i = 0; i < 20; i++) {
      if (spotifyApi.getAccessToken()) {
        spotifyApi
          .searchTracks(`track:${songTitle[i]} artist:${artist[i]}`)
          .then((res) => {
            const spotifyId = res.body.tracks.items[0]?.id;
            idList.push(`spotify:track:${spotifyId}`);
          });
      }
    }

    console.log(idList);

    // Get Id from generated Playlist
    setTimeout(() => {
      spotifyApi.getUserPlaylists(session.user.name).then(
        function (data) {
          const generatedPlaylistId = data.body.items[0].id;
          console.log("Generated Playlist ID:", generatedPlaylistId);

          // Add tracks to generated playlist
          spotifyApi.addTracksToPlaylist(generatedPlaylistId, idList).then(
            function (data) {
              console.log("Added tracks to playlist!");
            },
            function (err) {
              console.log("Something went wrong!", err);
            }
          );
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
    }, 1000);
  };

  return (
    <div>
      <button
        className="bg-[#18D860] tracking-wider text-gray-50 px-9 py-4 rounded-full hover:scale-105  active:scale-95 transition-all"
        onClick={buildPlaylist}
      >
        Create Spotify Playlist
      </button>
    </div>
  );
}

export default CreatePlaylist;
