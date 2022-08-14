import { useSession } from "next-auth/react";
import { useEffect } from "react";
import useSpotify from "../hooks/useSpotify";

// // Create a private playlist
// spotifyApi
//   .createPlaylist("My playlist", {
//     description: "My description",
//     public: true,
//   })
//   .then(
//     function (data) {
//       console.log("Created playlist!");
//     },
//     function (err) {
//       console.log("Something went wrong!", err);
//     }
//   );

// // Add tracks to a playlist
// spotifyApi
//   .addTracksToPlaylist("5ieJqeLJjjI8iJWaxeBLuK", [
//     "spotify:track:4iV5W9uYEdYUVa79Axb7Rh",
//     "spotify:track:1301WleyT98MSxVHPZCA6M",
//   ])
//   .then(
//     function (data) {
//       console.log("Added tracks to playlist!");
//     },
//     function (err) {
//       console.log("Something went wrong!", err);
//     }
//   );

function CreatePlaylist({ songTitle, artist }) {
  console.log([songTitle, artist]);

  const { data: session, status } = useSession();

  const spotifyApi = useSpotify();

  const idList = [];

  useEffect(() => {
    for (let i = 0; i < 20; i++) {
      if (spotifyApi.getAccessToken()) {
        spotifyApi
          .searchTracks(`track:${songTitle[i]} artist:${artist[i]}`)
          .then((res) => {
            const spotifyId = res.body.tracks.items[0]?.id;
            idList.push(spotifyId);
          });
        console.log(idList);
      }
    }
  }, [songTitle, artist, session, spotifyApi]);

  return <div>CreatePlaylist</div>;
}

export default CreatePlaylist;
