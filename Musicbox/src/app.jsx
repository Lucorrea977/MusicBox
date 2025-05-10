import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Library from "./views/Library";
import Config from "./views/Config";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";

function App() {
  const { theme, color } = useSelector((state) => state.settings);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/config" element={<Config />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
