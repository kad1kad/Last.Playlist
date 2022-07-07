import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

// const spotifyApi = new SpotifyWebApi({
//   clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
//   accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
// });

function MusicItem({ item }) {
  // useEffect(() => {
  //   spotifyApi.searchTracks(item.name).then((res) => {
  //     console.log(res);
  //   });
  // }, [item.name]);

  return (
    <>
      <li className="leading-8 text-center transition-all ease-in-out">
        {/* <span>{item["@attr"].rank}.</span> */}
        <h3 className="inline "> {item.artist.name} – </h3>
        <p className="inline">{item.name} </p>
      </li>
    </>
  );
}

export default MusicItem;
