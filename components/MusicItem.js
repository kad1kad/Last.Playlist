function MusicItem({ item }) {
  return (
    <li className="leading-7">
      <span>{item["@attr"].rank}.</span>
      <h3 className="inline"> {item.artist.name} – </h3>
      <p className="inline">{item.name} </p>
    </li>
  );
}

export default MusicItem;
