import { Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "../supabase/client";

import "./App.css";
import Navbar from "./components/navbar/Navbar.tsx";
import HomeScreen from "./pages/Home/HomeScreen.tsx";
import RecipesScreen from "./pages/Recipes/RecipesScreen.tsx";
import RecipeScreen from "./pages/Recipe/RecipeScreen.tsx";
import LoginScreen from "./pages/Login/LoginScreen.tsx";
import EditProfileScreen from "./pages/Profile/EditProfileScreen.tsx";
import FollowersScreen from "./pages/Followers/FollowersScreen.tsx";
import ProfileScreen from "./pages/Profile/ProfileScreen.tsx";
import EditRecipeScreen from "./pages/Recipe/EditRecipeScreen.tsx";
import ResetPasswordScreen from "./pages/Login/ResetPasswordScreen.tsx";
import NewPasswordScreen from "./pages/Login/NewPasswordScreen.tsx";

import Profile from "./interfaces/profile.interface.ts";
import { getProfile } from "../supabase/profileFunctions.ts";
import Footer from "./components/footer/Footer.tsx";
import AddRecipeScreen from "./pages/Recipe/AddRecipeScreen.tsx";

function App() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

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

  useEffect(() => {
    if (user) {
      getProfile(user).then((data) => {
        data && setProfile(data[0]);
        console.log("profile in app", profile);
      });
    }
  }, [user]);

  return (
    <>
      {!currentPath.startsWith("/login") && <Navbar profile={profile} />}
      <main className="container">
        <Routes>
          <Route path="/*" element={<h1>Not Found</h1>} />
          <Route path="/*/*" element={<h1>Recipe Not Found</h1>} />
          <Route path="/profile" element={<h1>Not Accessible</h1>} />

          <Route path="/" element={<HomeScreen />} />
          <Route path="/recipes" element={<RecipesScreen />} />

          <Route
            path="/add-recipe"
            element={
              <AddRecipeScreen
                userProps={user as User}
                sessionProps={session as Session}
              />
            }
          />
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
            path="/login/reset"
            element={
              <ResetPasswordScreen
                userProps={user as User}
                sessionProps={session as Session}
              />
            }
          />
          <Route
            path="/login/new-password"
            element={
              <NewPasswordScreen
                userProps={user as User}
                sessionProps={session as Session}
              />
            }
          />
          <Route
            path=":usernameParam"
            element={
              <ProfileScreen
                userProps={user as User}
                sessionProps={session as Session}
              />
            }
          ></Route>
          <Route
            path="/:usernameParam/:recipeParam"
            element={
              <RecipeScreen
                userProps={user as User}
                sessionProps={session as Session}
              />
            }
          />
          <Route
            path="/:usernameParam/:recipeParam/edit"
            element={
              <EditRecipeScreen
                userProps={user as User}
                sessionProps={session as Session}
              />
            }
          />
          <Route
            path=":param/followers"
            element={
              <FollowersScreen
                userProps={user as User}
                sessionProps={session as Session}
              />
            }
          />
          <Route
            path=":param/followees"
            element={
              <FollowersScreen
                userProps={user as User}
                sessionProps={session as Session}
              />
            }
          />
          <Route
            path="profile/edit"
            element={
              <EditProfileScreen
                userProps={user as User}
                sessionProps={session as Session}
              />
            }
          />
        </Routes>
      </main>
      {!currentPath.startsWith("/login") && <Footer />}
    </>
  );
}

export default App;
