import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Navbar from "./components/navbar/Navbar.tsx";
import AboutScreen from "./pages/AboutScreen.tsx";
import HomeScreen from "./pages/HomeScreen.tsx";
import RecipesScreen from "./pages/Recipes/RecipesScreen.tsx";
import RecipeScreen from "./pages/Recipe/RecipeScreen.tsx";
import LoginScreen from "./pages/Login/Login.tsx";

import { supabase } from "../supabase/client.ts";
import { User } from "@supabase/supabase-js";

function App() {
  const [user, setUser] = useState<User | null>(null); // Update the type of user state

  useEffect(() => {
    async function fetchData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("user", user);
      setUser(user); // Needs Type
    }
    fetchData();
  }, []);

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
