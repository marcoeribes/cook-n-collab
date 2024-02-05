import { Route, Routes } from "react-router-dom";

import "./App.css";
import Navbar from "./components/navbar/Navbar.tsx";
import AboutScreen from "./pages/AboutScreen.tsx";
import HomeScreen from "./pages/Home/HomeScreen.tsx";
import RecipesScreen from "./pages/Recipes/RecipesScreen.tsx";
import RecipeScreen from "./pages/Recipe/RecipeScreen.tsx";
import LoginScreen from "./pages/Login/Login.tsx";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/recipes" element={<RecipesScreen />} />
          <Route path="/recipe/:id" element={<RecipeScreen />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
