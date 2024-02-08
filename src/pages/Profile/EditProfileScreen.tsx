/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

import { getProfile, updateProfile } from "../../../supabase/profileFunctions";
import {
  fetchAvatarImage,
  fetchAvatarUrl,
} from "../../../supabase/avatarFunctions";
import Avatar from "../../components/avatar/Avatar";
import SessionProps from "../../interfaces/auth.interface";

export default function ProfileScreen({
  userProps,
  sessionProps,
}: SessionProps) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(userProps);
  const [session, setSession] = useState<Session | null>(sessionProps);

  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");

  const [bio, setBio] = useState("");
  const [newBio, setNewBio] = useState("");

  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [avatarImage, setAvatarImage] = useState<string>("");

  const navigateToProfile = () => {
    navigate("/profile");
  };

  const handleProfileUpdate = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    setIsLoading(true);
    if (user && newUsername !== username) {
      event.preventDefault();
      await updateProfile(user, newUsername, undefined);
      setUsername(newUsername);
    }
    if (user && newBio !== bio) {
      event.preventDefault();
      await updateProfile(user, undefined, newBio);
      setBio(newBio);
    }
    navigateToProfile();
  };

  useEffect(() => {
    setSession(sessionProps);
    setUser(userProps);
  }, [session, sessionProps, user, userProps]);

  useEffect(() => {
    if (user)
      fetchAvatarUrl(user).then((data) => {
        if (data) setAvatarUrl(data);
      });
  }, [user, avatarUrl]);

  useEffect(() => {
    if (user) {
      fetchAvatarImage(user).then((data) => {
        if (data && data.length > 0) setAvatarImage(data[0]?.name);
        setIsLoading(false);
      });
    }
  }, [user, avatarImage]);

  useEffect(() => {
    if (user) {
      getProfile(user).then((data) => {
        setUsername(data && data[0]?.username);
        setBio(data && data[0]?.bio);
        setNewUsername(username);
        setNewBio(bio);
      });
    }
  }, [username, bio, user]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Edit Profile</h1>
          <Avatar imageUrl={avatarUrl + avatarImage} />
          <form onSubmit={handleProfileUpdate}>
            <label>
              New Username:
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                required
              />
            </label>
            <label>
              New Bio:
              <input
                type="text"
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
                required
              />
            </label>
            <br />
            <input type="submit" value={"Save"} />
            <button onClick={navigateToProfile}>Cancel</button>
          </form>
        </>
      )}
    </>
  );
}
