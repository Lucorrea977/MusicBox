import { useSelector } from "react-redux";
import SongCard from "../components/SongCard";
import SearchBar from "../components/SearchBar";

function Home() {
  const songs = useSelector(state => state.songs.list);

  return (
    <div className="p-4">
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {songs.map(song => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
}

export default Home;
