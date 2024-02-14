import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import {
  getFolloweesById,
  getFollowersById,
  getProfileByUsername,
} from "../../../supabase/profileFunctions";
import Avatar from "../../components/avatar/Avatar";
import { Session, User } from "@supabase/supabase-js";
import SessionProps from "../../interfaces/auth.interface";
import arraysEqual from "../../utils/arraysEqual";

export default function FollowerProfileScreen({
  userProps,
  sessionProps,
}: SessionProps) {
  const navigate = useNavigate();
  const { param } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState<User | null>(userProps);
  const [session, setSession] = useState<Session | null>(sessionProps);

  const [id, setId] = useState<string | undefined>("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  const [followers, setFollowers] = useState<string[]>([]);
  const [followees, setFollowees] = useState<string[]>([]);

  const goBack = () => {
    navigate(-1);
  };

  const navigateToEditProfile = () => {
    navigate("/profile/edit");
  };

  const navigateToFollowers = () => {
    navigate("followers");
  };

  const navigateToFollowees = () => {
    navigate("followees");
  };

  useEffect(() => {
    setSession(sessionProps);
    setUser(userProps);
  }, [session, sessionProps, user, userProps]);

  useEffect(() => {
    if (param) {
      getProfileByUsername(param).then((data) => {
        setId(data && data[0]?.id);
        setUsername(data && data[0]?.username);
        setBio(data && data[0]?.bio);
        setAvatarUrl(data && data[0]?.avatar_url);
        setIsLoading(false);
      });
    }
  }, [param, id, username, bio, avatarUrl, user?.id]);

  useEffect(() => {
    if (id) {
      getFollowersById(id).then((data) => {
        const newFollowers = data?.map((follower) => follower.follower_id);
        if (newFollowers && !arraysEqual(newFollowers, followers))
          setFollowers(newFollowers);
      });
    }
  }, [followers, id]);

  useEffect(() => {
    if (id) {
      getFolloweesById(id).then((data) => {
        const newFollowees = data?.map((followee) => followee.followee_id);
        if (newFollowees && !arraysEqual(newFollowees, followees))
          setFollowees(newFollowees);
      });
    }
  }, [followees, id]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : id == null ? (
        <h1>No user found</h1>
      ) : (
        <>
          <h1>Profile</h1>
          <Avatar imageUrl={avatarUrl} size={300} />
          <p>Username: {username}</p>
          <p>Bio: {bio}</p>
          <button onClick={navigateToFollowers}>
            Followers: {followers.length}
          </button>
          <br />
          <br />
          <button onClick={navigateToFollowees}>
            Following: {followees.length}
          </button>
          <br />
          <br />
          {id === user?.id ? (
            <button onClick={navigateToEditProfile}>Edit Profile</button>
          ) : (
            <button onClick={goBack}>Go Back</button>
          )}
        </>
      )}
    </>
  );
}
