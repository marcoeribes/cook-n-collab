import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
  getFolloweesById,
  getFollowersById,
  getProfileById,
  getProfileByUsername,
} from "../../../supabase/profileFunctions";
import Profile from "../../interfaces/profile.interface";
import Avatar from "../../components/avatar/Avatar";

export default function FollowersScreen() {
  const { param } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const [id, setId] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  const [follows, setFollows] = useState<string[]>([]);
  const [followProfiles, setFollowProfiles] = useState<Profile[]>([]);
  const [suffix, setSuffix] = useState<string>("");

  useEffect(() => {
    if (param) {
      getProfileByUsername(param).then((data) => {
        setId(data && data[0]?.profile_id);
        setUsername(data && data[0]?.username);
        setAvatarUrl(data && data[0]?.avatar_url);
        setSuffix(location.pathname.slice(-9));
        setIsLoading(false);
      });
    }
  }, [location, param, id, username, avatarUrl]);

  useEffect(() => {
    if (id && suffix === "followers") {
      getFollowersById(id).then((data) => {
        const followers = data?.map((follower) => follower.follower_id);
        followers && setFollows(followers);
      });
    }
  }, [id, suffix]);

  useEffect(() => {
    if (id && suffix === "followees") {
      getFolloweesById(id).then((data) => {
        const followees = data?.map((followee) => followee.followee_id);
        followees && setFollows(followees);
      });
    }
  }, [id, suffix]);

  useEffect(() => {
    if (follows) {
      Promise.all(follows.map((followId) => getProfileById(followId)))
        .then((profiles) => {
          console.log("profiles", profiles);
          const listOfFollows = profiles.flat().map((userObj) => ({
            id: userObj.id,
            username: userObj.username,
            avatarUrl: userObj.avatar_url,
          }));
          console.log("followerUsernames", listOfFollows);
          setFollowProfiles(listOfFollows);
          setIsLoading(false);
        })
        .catch((error) =>
          console.log("Error fetching follower profiles: ", error)
        );
    }
  }, [follows]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>{suffix} screen</h1>
      {followProfiles.map((profile, index) => (
        <button
          key={profile.id || index}
          onClick={() =>
            navigate(`/${profile.username}`, {
              state: { followerProfiles: profile },
            })
          }
          style={{
            justifyContent: "center",
            alignContent: "center",
            width: 100,
            margin: 10,
          }}
        >
          <p key={index}>{profile.username}</p>
          <Avatar imageUrl={profile.avatarUrl} size={50} />
        </button>
      ))}
    </div>
  );
}
