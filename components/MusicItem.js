import { motion } from "framer-motion";
import Link from "next/link";

function MusicItem({ item }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      exit={{ delay: 2, opacity: 0 }}
      key={item.name}
      src={item.name}
    >
      <Link href={item.url}>
        <a>
          <li className="leading-8 text-center">
            <h3 className="inline "> {item.artist.name} – </h3>
            <p className="inline">{item.name} </p>
          </li>
        </a>
      </Link>
    </motion.div>
  );
}

export default MusicItem;
