import "./App.css";
import Navbar from "./components/navbar/Navbar.tsx";
import AboutScreen from "./pages/AboutScreen.tsx";
import HomeScreen from "./pages/HomeScreen.tsx";
import RecipesScreen from "./pages/RecipesScreen.tsx";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/recipes" element={<RecipesScreen />} />
          <Route path="/about" element={<AboutScreen />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
