import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addPlaylist, removePlaylist } from "../redux/slices/playlistsSlice";

function PlaylistManager() {
  const playlists = useSelector(state => state.playlists);
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (name.trim() !== "") {
      dispatch(addPlaylist(name));
      setName("");
    }
  };

  const handleDelete = (id) => {
    dispatch(removePlaylist(id));
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-2">Tus Playlists</h2>
      <div className="flex gap-2">
        <input 
          type="text"
          placeholder="Nombre de playlist"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded-md bg-gray-800 text-white border border-blue-500 w-full"
        />
        <button 
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded"
        >
          Crear
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {playlists.map(pl => (
          <div key={pl.id} className="p-4 bg-gray-900 rounded shadow-md flex justify-between items-center">
            <span>{pl.name}</span>
            <button 
              onClick={() => handleDelete(pl.id)}
              className="text-red-500 hover:text-red-700"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaylistManager;
