import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "../supabase/client";

import "./App.css";
import Navbar from "./components/navbar/Navbar.tsx";
import AboutScreen from "./pages/graveyard/AvatarScreen.tsx";
import HomeScreen from "./pages/Home/HomeScreen.tsx";
import RecipesScreen from "./pages/Recipes/RecipesScreen.tsx";
import RecipeScreen from "./pages/Recipe/RecipeScreen.tsx";
import LoginScreen from "./pages/Login/LoginScreen.tsx";
import ProfileScreen from "./pages/Profile/ProfileScreen.tsx";
import EditProfileScreen from "./pages/Profile/EditProfileScreen.tsx";
import FollowersScreen from "./pages/graveyard/FollowersScreen.tsx";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("user in login", user);
      setUser(user as User);
    }
    fetchUser();
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
          <Route
            path="/login"
            element={
              <LoginScreen
                userProps={user as User}
                sessionProps={session as Session}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProfileScreen
                userProps={user as User}
                sessionProps={session as Session}
              />
            }
          />
          <Route
            path="/profile/edit"
            element={
              <EditProfileScreen
                userProps={user as User}
                sessionProps={session as Session}
              />
            }
          />
          <Route
            path="/followers"
            element={
              <FollowersScreen
                userProps={user as User}
                sessionProps={session as Session}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
