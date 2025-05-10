import { useDispatch } from "react-redux";
import { setTheme } from "../redux/slices/settingsSlice";

function Settings() {
  const dispatch = useDispatch();

  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Configuraciones</h2>
      <div className="flex gap-2">
        <button onClick={() => dispatch(setTheme("black"))} className="bg-black text-white p-2 rounded border border-blue-500">
          Fondo Negro
        </button>
        <button onClick={() => dispatch(setTheme("white"))} className="bg-white text-black p-2 rounded border border-blue-500">
          Fondo Blanco
        </button>
        <button onClick={() => dispatch(setTheme("gray"))} className="bg-gray-500 text-white p-2 rounded border border-blue-500">
          Fondo Tenue
        </button>
      </div>
    </div>
  );
}

export default Settings;
