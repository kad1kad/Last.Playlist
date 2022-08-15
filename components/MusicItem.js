import Link from "next/link";

function MusicItem({ item }) {
  return (
    <>
      <Link href={item.url}>
        <a>
          <li className="leading-8 text-center transition-all ease-in-out hover:scale-105">
            <h3 className="inline "> {item.artist.name} – </h3>
            <p className="inline">{item.name} </p>
          </li>
        </a>
      </Link>
    </>
  );
}

export default MusicItem;
