/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";

import {
  getProfile,
  getFollowers,
  getFollowees,
} from "../../../supabase/profileFunctions";
import {
  fetchAvatarImage,
  fetchAvatarUrl,
} from "../../../supabase/avatarFunctions";
import Avatar from "../../components/avatar/Avatar";
import SessionProps from "../../interfaces/auth.interface";
import arraysEqual from "../../utils/arraysEqual";

export default function ProfileScreen({
  userProps,
  sessionProps,
}: SessionProps) {
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState<User | null>(userProps);
  const [session, setSession] = useState<Session | null>(sessionProps);
  const [username, setUsername] = useState("");
  const [followers, setFollowers] = useState<string[]>([]);
  const [followees, setFollowees] = useState<string[]>([]);

  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [avatarImage, setAvatarImage] = useState<string>("");

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
      });
    }
  }, [username]);

  useEffect(() => {
    if (user) {
      getFollowers(user).then((data) => {
        const newFollowers = data?.map((follower) => follower.follower_id);
        if (newFollowers && !arraysEqual(newFollowers, followers))
          setFollowers(newFollowers);
      });
    }
  }, [followers, user]);

  useEffect(() => {
    if (user) {
      getFollowees(user).then((data) => {
        const newFollowees = data?.map((followee) => followee.followee_id);
        if (newFollowees && !arraysEqual(newFollowees, followees))
          setFollowees(newFollowees);
      });
    }
  }, [followees]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Profile</h1>
          <Avatar imageUrl={avatarUrl + avatarImage} />
          <p>Username: {username}</p>
          <p>Followers: {followers.length}</p>
          <p>Followees: {followees.length}</p>
        </>
      )}
    </>
  );
}
