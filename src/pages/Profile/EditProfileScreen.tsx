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
  fetchDefaultAvatarUrl,
} from "../../../supabase/avatarFunctions";
import Avatar from "../../components/avatar/Avatar";
import SessionProps from "../../interfaces/auth.interface";
import Button from "../../components/button/Button";

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
  const [profileAvatarUrl, setProfileAvatarUrl] = useState<string>("");

  const navigateToProfile = () => {
    navigate(`/${username}`);
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
    setIsLoading(false);
  };

  async function handleUploadAvatar(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!user) return;

    setIsLoadingAvatar(true);
    const success = await uploadAvatar(user, event);
    if (user && success) {
      await deleteAvatar(user, avatarImage);
      await updateProfileAvatar();
      setIsLoadingAvatar(false);
    } else setIsLoadingAvatar(false);
  }

  async function handleDeleteAvatar() {
    if (user && avatarImage) {
      await deleteAvatar(user, avatarImage);
      await updateProfileAvatar();
    }
  }

  async function updateProfileAvatar() {
    if (!user) return;

    const location = await fetchAvatarUrl(user);
    const avatarUrl = location ? location : "";
    setAvatarUrl(avatarUrl);

    const data = await fetchAvatarImage(user);
    const avatarName = data ? data[0]?.name : "";
    setAvatarImage(avatarName);

    if (avatarName) {
      setProfileAvatarUrl(avatarUrl + avatarName);
    } else {
      const defaultUrl = await fetchDefaultAvatarUrl();
      defaultUrl && setProfileAvatarUrl(defaultUrl);
    }
    await updateProfile(user, undefined, undefined, profileAvatarUrl);
  }

  useEffect(() => {
    setSession(sessionProps);
    setUser(userProps);
  }, [session, sessionProps, user, userProps]);

  useEffect(() => {
    if (user)
      fetchAvatarUrl(user).then((data) => {
        data && setAvatarUrl(data);
      });
  }, [user, avatarUrl]);

  useEffect(() => {
    if (user) {
      fetchAvatarImage(user).then(() => {
        setIsLoading(false);
        setIsLoadingAvatar(false);
      });
      updateProfileAvatar();
    }
  }, [user, avatarImage]);

  useEffect(() => {
    if (user) {
      getProfile(user).then((data) => {
        setUsername(data && data[0]?.username);
        setBio(data && data[0]?.bio);
        setProfileAvatarUrl(data && data[0]?.avatar_url);

        setNewUsername(username);
        setNewBio(bio);

        setIsLoading(false);
        setIsLoadingAvatar(false);
      });
    }
  }, [user, username, bio]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Edit Profile</h1>

          <section className="profile-info">
            <div>
              <Avatar imageUrl={profileAvatarUrl} size={160} />
              {isLoadingAvatar ? null : (
                <div className="upload-avatar-buttons">
                  <input
                    id="file-upload"
                    type="file"
                    onChange={(e) => {
                      handleUploadAvatar(e);
                    }}
                  />
                  <div
                    className="button tertiary-button"
                    style={{ paddingTop: 4, paddingBottom: 4 }}
                  >
                    <label htmlFor="file-upload">Upload</label>
                  </div>
                  <Button
                    text="Delete"
                    onClick={handleDeleteAvatar}
                    style="button secondary-button"
                  />
                </div>
              )}
            </div>

            <div className="edit-profile-input-section">
              <form
                onSubmit={handleProfileUpdate}
                className="edit-profile-form"
              >
                <label>
                  New Username:
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="text-input"
                    required
                  />
                </label>
                <label>
                  New Bio:
                  <textarea
                    value={newBio}
                    onChange={(e) => setNewBio(e.target.value)}
                    className="text-input"
                    style={{
                      resize: "vertical",
                      width: "100%",
                      minHeight: 96,
                    }}
                    required
                  />
                </label>
                <input
                  type="submit"
                  value={"Save"}
                  className="button tertiary-button"
                  style={{ marginRight: 20, marginTop: 10 }}
                />
                <Button
                  text="Cancel"
                  onClick={navigateToProfile}
                  style="button secondary-button"
                />
              </form>
            </div>
          </section>
        </>
      )}
    </>
  );
}
