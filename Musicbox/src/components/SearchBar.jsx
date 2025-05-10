import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchSongs } from "../redux/slices/songsSlice";

function SearchBar() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(searchSongs(query));
  };

  return (
    <div className="flex items-center p-4 gap-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar canciones o artistas..."
        className="p-2 rounded-md bg-gray-800 text-white border border-blue-500 w-full"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded"
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
