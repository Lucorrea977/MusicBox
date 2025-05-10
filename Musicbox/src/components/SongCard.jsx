import { useDispatch } from "react-redux";
import { addFavorite } from "../redux/slices/favoritesSlice";

function SongCard({ song }) {
  const dispatch = useDispatch();

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center">
      <h3 className="text-xl mb-2">{song.title}</h3>
      <p className="mb-4">{song.artist}</p>
      <audio controls src={song.url} className="mb-4"></audio>
      <button
        onClick={() => dispatch(addFavorite(song))}
        className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded"
      >
        Añadir a Favoritos
      </button>
    </div>
  );
}

export default SongCard;
