import { useSelector } from "react-redux";
import SongCard from "./SongCard";

function Favorites() {
  const favorites = useSelector(state => state.favorites);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Tus Favoritos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {favorites.map(song => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
