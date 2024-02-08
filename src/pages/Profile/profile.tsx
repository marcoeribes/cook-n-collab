import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";

import {
  getProfile,
  getFollowers,
  getFollowees,
} from "../../../supabase/profileFunctions";
import SessionProps from "../../interfaces/auth.interface";
import arraysEqual from "../../utils/arraysEqual";

export default function ProfileScreen({
  userProps,
  sessionProps,
}: SessionProps) {
  const [user, setUser] = useState<User | null>(userProps);
  const [session, setSession] = useState<Session | null>(sessionProps);
  const [username, setUsername] = useState("");
  const [followers, setFollowers] = useState<string[]>([]);
  const [followees, setFollowees] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      getProfile(user).then((data) => {
        setUsername(data && data[0]?.username);
      });
    }
  }, [user, username]);

  useEffect(() => {
    if (user) {
      getFollowers(user).then((data) => {
        const newFollowers = data?.map((follower) => follower.follower_id);
        if (newFollowers && !arraysEqual(newFollowers, followers))
          setFollowers(newFollowers);
      });
    }
  }, [user, followers]);

  useEffect(() => {
    if (user) {
      getFollowees(user).then((data) => {
        const newFollowees = data?.map((followee) => followee.followee_id);
        if (newFollowees && !arraysEqual(newFollowees, followees))
          setFollowees(newFollowees);
      });
    }
  }, [user, followees]);

  useEffect(() => {
    setSession(sessionProps);
    setUser(userProps);
  }, [session, sessionProps, user, userProps]);

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {username}</p>
      <p>Followers: {followers}</p>
      <p>Followees: {followees}</p>
    </div>
  );
}
