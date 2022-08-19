import MusicItem from "./MusicItem";
import { AnimatePresence, motion } from "framer-motion";

function MusicList({ musicItems }) {
  console.log(musicItems);
  return (
    <section className="my-5">
      <AnimatePresence>
        <ul>
          {musicItems.toptracks?.track.map((item, index) => (
            <MusicItem key={index} item={item} />
          ))}
        </ul>
      </AnimatePresence>
    </section>
  );
}

export default MusicList;
