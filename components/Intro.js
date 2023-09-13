import { useState } from "react";

function Intro() {
  const [toggleInfo, setToggleInfo] = useState(false);
  const [toggleHowTo, setToggleHowTo] = useState(false);
  return (
    <div className="px-4 py-2">
      <h3
        className="mb-2 text-3xl font-medium cursor-pointer "
        onClick={() => setToggleInfo((prevState) => !prevState)}
      >
        App Info +
      </h3>
      <section
        className={`flex mb-8 flex-col gap-2 text-2xl ${
          toggleInfo ? "block" : "hidden"
        }`}
      >
        <p>
          This is a web app to port your or your friends most listened tracks
          into a Spotify playlist.
        </p>
        <p>
          It uses the{" "}
          <a className="underline" href="https://www.last.fm/api/">
            Last.fm API
          </a>{" "}
          to fetch music listening data of any specified user and integrates
          with the{" "}
          <a
            className="underline"
            href="https://github.com/thelinmichael/spotify-web-api-node"
          >
            Spotify Web API
          </a>{" "}
          to generate playlists on your Spotify account.
        </p>
        <p>
          If you want to learn more about the technical side of this app, you
          can check out the{" "}
          <a
            className="underline"
            href="https://github.com/kad1kad/Last.Playlist"
          >
            GitHub Repository
          </a>
          .
        </p>
      </section>
      <h3
        className="mb-2 text-3xl font-medium cursor-pointer "
        onClick={() => setToggleHowTo((prevState) => !prevState)}
      >
        How to...? +
      </h3>
      <section
        onClick={() => setToggleHowTo((prevState) => !prevState)}
        className={`flex flex-col gap-2 text-2xl ${
          toggleHowTo ? "block" : "hidden"
        }`}
      >
        <p>
          There are only a few easy steps to generate playlists on your Spotify
          account.
        </p>
        <p>
          If you don&apos;t have a Last.fm account to fetch the relevant data,
          search for this username to try it out: Brauzepulver.
        </p>
        <ul>
          <li>1. Login with your Spotify Account</li>
          <li>2. Type in a Last.fm username</li>
          <li>3. Select a period for the top tracks</li>
          <li>4. Hit Submit & Create Spotify Playlist!</li>
        </ul>
      </section>
    </div>
  );
}

export default Intro;
