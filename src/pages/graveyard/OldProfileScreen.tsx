/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { useNavigate, useParams } from "react-router-dom";

import {
  getProfile,
  getFollowers,
  getFollowees,
} from "../../../supabase/profileFunctions";
import Avatar from "../../components/avatar/Avatar";
import SessionProps from "../../interfaces/auth.interface";
import arraysEqual from "../../utils/arraysEqual";

export default function ProfileScreen({
  userProps,
  sessionProps,
}: SessionProps) {
  const navigate = useNavigate();
  const { userProfile } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState<User | null>(userProps);
  const [session, setSession] = useState<Session | null>(sessionProps);

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profileAvatarUrl, setProfileAvatarUrl] = useState<string>("");

  const [followers, setFollowers] = useState<string[]>([]);
  const [followees, setFollowees] = useState<string[]>([]);

  const navigateToEditProfile = () => {
    navigate("/profile/edit");
  };

  const navigateToFollowers = () => {
    navigate("/followers");
  };

  useEffect(() => {
    setSession(sessionProps);
    setUser(userProps);
  }, [session, sessionProps, user, userProps]);

  useEffect(() => {
    if (user) {
      getProfile(user).then((data) => {
        setUsername(data && data[0]?.username);
        setBio(data && data[0]?.bio);
        setProfileAvatarUrl(data && data[0]?.avatar_url);
        setIsLoading(false);
      });
    }
  }, [user, username, bio]);

  useEffect(() => {
    user && getProfile;
  });

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Profile</h1>
          <Avatar imageUrl={profileAvatarUrl} size={300} />
          <p>Username: {username}</p>
          <p>Bio: {bio}</p>
          <button onClick={navigateToFollowers}>
            Followers: {followers.length}
          </button>
          <p>Followees: {followees.length}</p>
          {userProfile === username ? null : (
            <button onClick={navigateToEditProfile}>Edit Profile</button>
          )}
        </>
      )}
    </>
  );
}