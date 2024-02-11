import { useEffect, useState } from "react";
import SessionProps from "../../interfaces/auth.interface";
import {
  getFollowers,
  getProfileById,
} from "../../../supabase/profileFunctions";
import Profile from "../../interfaces/profile.interface";
import Avatar from "../../components/avatar/Avatar";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Followers Screen</h1>
      <p>Followers</p>
      {followerProfiles.map((profile, index) => (
        <div
          style={{
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: "green",
            width: 100,
            margin: 10,
          }}
        >
          <p key={index}>{profile.username}</p>
          <Avatar imageUrl={profile.avatarUrl} size={50} />
        </div>
      ))}
    </div>
  );
}
