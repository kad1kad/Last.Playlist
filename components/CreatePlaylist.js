import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import useSpotify from "../hooks/useSpotify";

function CreatePlaylist({ songTitle, artist, selectedPeriod, userName }) {
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  //   Generate current date and time

  const d = new Date();
  let h = addZero(d.getHours());
  let m = addZero(d.getMinutes());
  let time = h + ":" + m;

  const today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  const date = dd + "/" + mm + "/" + yyyy;

  const { data: session, status } = useSession();

  const spotifyApi = useSpotify();
  const idList = [];

  const [buttonText, setButtonText] = useState("Create Spotify Playlist");

  const buildPlaylist = () => {
    if (session) {
      // Create Playlist
      spotifyApi
        .createPlaylist(`${userName} ${selectedPeriod} most played`, {
          description: `Generated: ${date} ${time}`,
          public: false,
        })
        .then(
          function (data) {
            console.log("Created playlist!");
            // Loading Text
            setButtonText(
              <div className="flex items-center gap-2">
                Generating Playlist
                <FontAwesomeIcon
                  className="fa-solid fa-spinner fa-spin-pulse fa-lg"
                  icon={faSpinner}
                />
              </div>
            );
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
              // console.log(res);

              const spotifyId = res.body.tracks.items[0]?.id;

              //  Push to arr if song found
              if (res.body.tracks.items.length > 0) {
                idList.push(`spotify:track:${spotifyId}`);
              }
            });
        }
      }

      console.log([idList]);

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

                setButtonText(
                  <div className="flex items-center gap-2">
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
    } else {
      signIn();
    }
  };

  return (
    <div>
      <button
        className="bg-[#18D860] tracking-wider text-gray-50 px-9 py-4 rounded-full hover:scale-105  active:scale-95 transition-all w-72 flex gap-2 justify-center items-center"
        onClick={buildPlaylist}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default CreatePlaylist;
