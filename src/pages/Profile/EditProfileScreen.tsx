/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

import { getProfile, updateProfile } from "../../../supabase/profileFunctions";
import {
  fetchAvatarImage,
  fetchAvatarUrl,
  uploadAvatar,
  deleteAvatar,
} from "../../../supabase/avatarFunctions";
import Avatar from "../../components/avatar/Avatar";
import SessionProps from "../../interfaces/auth.interface";

export default function ProfileScreen({
  userProps,
  sessionProps,
}: SessionProps) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(true); // Questionable, might need to change to false

  const [user, setUser] = useState<User | null>(userProps);
  const [session, setSession] = useState<Session | null>(sessionProps);

  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");

  const [bio, setBio] = useState("");
  const [newBio, setNewBio] = useState("");

  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [avatarImage, setAvatarImage] = useState<string>("");
  const [numOfAvatars, setNumOfAvatars] = useState<number>(0);

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

  async function handleUploadAvatar(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    if (user) {
      setIsLoadingAvatar(true);
      uploadAvatar(user, event).then(() => {
        if (numOfAvatars > 1 && user && avatarImage) {
          deleteAvatar(user, avatarImage).then(() => {
            fetchAvatarImage(user).then((data) => {
              fetchRecentAvatar(data).then(() => {
                setIsLoadingAvatar(false);
              });
            });
          });
        }
      });
    }
  }

  async function handleDeleteAvatar() {
    if (numOfAvatars > 1 && user && avatarImage) {
      deleteAvatar(user, avatarImage).then(() => {
        fetchAvatarImage(user).then((data) => {
          fetchRecentAvatar(data);
        });
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function fetchRecentAvatar(data: any) {
    if (data && data.length > 0) {
      setAvatarImage(data[0]?.name);
      setNumOfAvatars(data.length);
    }
  }

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
        fetchRecentAvatar(data);
        setIsLoading(false);
        setIsLoadingAvatar(false); // Questionable
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
          {isLoadingAvatar ? null : (
            <div>
              <input
                type="file"
                onChange={(e) => {
                  handleUploadAvatar(e);
                }}
              />
              <button onClick={handleDeleteAvatar}>Delete Avatar</button>
            </div>
          )}
          <br />
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
            <br />
            <br />
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
            <br />
            <input type="submit" value={"Save"} />
            <button onClick={navigateToProfile}>Cancel</button>
          </form>
        </>
      )}
    </>
  );
}
