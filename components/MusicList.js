import MusicItem from "./MusicItem";

function MusicList({ musicItems }) {
  console.log(musicItems);
  return (
    <section className="my-5">
      <ul>
        {musicItems.toptracks?.track.map((item, index) => (
          <MusicItem key={index} item={item} />
        ))}
      </ul>
    </section>
  );
}

export default MusicList;
