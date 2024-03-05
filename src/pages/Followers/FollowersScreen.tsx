import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
  deleteFollow,
  getFollowRelationship,
  getFolloweesById,
  getFollowersById,
  getProfileById,
  getProfileByUsername,
  insertFollow,
} from "../../../supabase/profileFunctions";
import Profile from "../../interfaces/profile.interface";
import FollowerCard from "../../components/followerCard/FollowerCard";
import Button from "../../components/button/Button";
import SessionProps from "../../interfaces/auth.interface";
import { Session, User } from "@supabase/supabase-js";

export default function FollowersScreen({
  userProps,
  sessionProps,
}: SessionProps) {
  const { param } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const user = userProps as User;
  const session = sessionProps as Session;

  const [id, setId] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  const [follows, setFollows] = useState<string[]>([]);
  const [followProfiles, setFollowProfiles] = useState<Profile[]>([]);
  const [suffix, setSuffix] = useState<string>("");

  const [isFollowing, setIsFollowing] = useState<boolean[]>([]);

  ///const [isFollowing, setIsFollowing] = useState<boolean>(false);

  async function handleFollow(index: number) {
    if (isFollowing[index] === true && user) {
      await deleteFollow(user.id, follows[index]);
      setIsFollowing((prevArray) => {
        let newArray = [...prevArray];
        newArray[index] = false;
        return newArray;
      });
    } else if (isFollowing[index] === false && user) {
      await insertFollow(user.id, follows[index]);
      setIsFollowing((prevArray) => {
        let newArray = [...prevArray];
        newArray[index] = true;
        return newArray;
      });
    }
  }

  useEffect(() => {
    if (param) {
      getProfileByUsername(param).then((data) => {
        setId(data && data[0]?.profile_id);
        setUsername(data && data[0]?.username);
        setAvatarUrl(data && data[0]?.avatar_url);
        setSuffix(location.pathname.slice(-9));
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
      Promise.all(follows.map((followId) => getProfileById(followId))).then(
        (profiles) => {
          const listOfFollows = profiles.flat().map((userObj) => ({
            id: userObj.id,
            username: userObj.username,
            avatarUrl: userObj.avatar_url,
          }));
          setFollowProfiles(listOfFollows);
        }
      );
    }
  }, [follows]);

  useEffect(() => {
    if (follows && id) {
      Promise.all(
        follows.map((followId) => getFollowRelationship(id, followId))
      ).then((followRelationships: any) => {
        const followStatus = followRelationships.map(
          (relationship: any) => relationship.length > 0
        );
        setIsFollowing((prevArray) => [...prevArray, ...followStatus]);
      });
    }
  }, [follows, id]);

  useEffect(() => {
    if (user && session) {
      console.log("OK");
    }
  }, [user, session]);

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: 60,
      }}
    >
      {suffix === "followers" ? <h1>Followers</h1> : <h1>Following</h1>}
      {followProfiles.map((profile, index) => (
        <section
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            margin: 20,
            width: "400px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <FollowerCard
              avatarUrl={profile.avatarUrl}
              username={profile.username}
              onClick={() => {
                navigate(`/${profile.username}`, {
                  state: { followerProfiles: profile },
                });
              }}
            />
            {isFollowing[index] ? (
              <Button
                text="Unfollow"
                onClick={() => handleFollow(index)}
                style="button secondary-button"
              />
            ) : (
              <Button
                text="Follow"
                onClick={() => handleFollow(index)}
                style="button tertiary-button"
              />
            )}
          </div>
        </section>
      ))}
    </section>
  );
}
