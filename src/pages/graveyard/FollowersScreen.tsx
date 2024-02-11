import { useEffect, useState } from "react";
import SessionProps from "../../interfaces/auth.interface";
import {
  getFollowers,
  getProfile,
  getProfileById,
} from "../../../supabase/profileFunctions";
import arraysEqual from "../../utils/arraysEqual";
import Profile from "../../interfaces/profile.interface";

export default function FollowersScreen({
  userProps,
  sessionProps,
}: SessionProps) {
  const user = userProps;
  const session = sessionProps;
  const [followers, setFollowers] = useState<string[]>([]);
  const [followerProfiles, setFollowerProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    console.log("Followers Screen");
  }, []);

  useEffect(() => {
    if (user) {
      getFollowers(user).then((data) => {
        const followers = data?.map((follower) => follower.follower_id);
        followers && setFollowers(followers);
      });
    }
  }, [user]);

  useEffect(() => {
    if (followers) {
      Promise.all(followers.map((followerId) => getProfileById(followerId)))
        .then((profiles) => {
          console.log("profiles", profiles);
          const listOfFollowers = profiles.flat().map((userObj) => ({
            username: userObj.username,
            avatarUrl: userObj.avatar_url,
          }));
          console.log("followerUsernames", listOfFollowers);
          setFollowerProfiles(listOfFollowers);
        })
        .catch((error) =>
          console.log("Error fetching follower profiles: ", error)
        );
    }
  }, [followers]);

  return (
    <div>
      <h1>Followers Screen</h1>
      <p>Followers</p>
      {followerProfiles.map((profile, index) => (
        <p key={index}>{profile.username}</p>
      ))}
    </div>
  );
}
