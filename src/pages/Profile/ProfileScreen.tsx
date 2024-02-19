import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import {
  deleteFollow,
  getFolloweesById,
  getFollowersById,
  getProfileByUsername,
  insertFollow,
} from "../../../supabase/profileFunctions";
import Avatar from "../../components/avatar/Avatar";
import { Session, User } from "@supabase/supabase-js";
import SessionProps from "../../interfaces/auth.interface";
import arraysEqual from "../../utils/arraysEqual";
import { signOut } from "../../../supabase/auth.functions";
import Button from "../../components/button/Button";
import "./ProfleScreen.css";

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

  const [isFollowing, setIsFollowing] = useState<boolean>(false);

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

  async function handleSignOut() {
    signOut()
      .then(() => {
        console.log("User Logged Out");
        navigate("/");
      })
      .then(() => {
        window.location.reload();
      });
  }

  async function handleFollow() {
    console.log("Followed");
    if (isFollowing && user?.id && id) {
      await deleteFollow(user.id, id);
    } else if (!isFollowing && user?.id && id) {
      await insertFollow(user.id, id);
    }
    if (id) {
      getFollowersById(id).then((data) => {
        const newFollowers = data?.map((follower) => follower.follower_id);
        if (newFollowers && !arraysEqual(newFollowers, followers)) {
          setFollowers(newFollowers);
        }
      });
    }
  }

  useEffect(() => {
    setSession(sessionProps);
    setUser(userProps);
  }, [session, sessionProps, user, userProps]);

  useEffect(() => {
    if (param) {
      getProfileByUsername(param).then((data) => {
        setId(data && data[0]?.profile_id);
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
        if (user?.id && followers.includes(user.id)) {
          setIsFollowing(true);
        } else {
          setIsFollowing(false);
        }
      });
    }
  }, [isFollowing, followers, id]);

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
    <div className="profile-page">
      {isLoading ? (
        <p>Loading...</p>
      ) : id == null ? (
        <h1>No user found</h1>
      ) : (
        <>
          <h1>Profile</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "50px",
              backgroundColor: "green",
            }}
          >
            <Avatar imageUrl={avatarUrl} size={300} />
            <div
              style={{
                backgroundColor: "blue",
                alignItems: "center",
                justifyContent: "left",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "2rem",
                  backgroundColor: "orange",
                  justifyContent: "left",
                }}
              >
                <h2
                  className="profile-username"
                  style={{ justifyContent: "left" }}
                >
                  {username}
                </h2>
                {id === user?.id ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "right",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <Button
                      text="Edit Profile"
                      onClick={navigateToEditProfile}
                      style="button"
                    />
                    <Button
                      text="Log Out"
                      onClick={handleSignOut}
                      style="button"
                    />
                  </div>
                ) : (
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    {isFollowing ? (
                      <button onClick={handleFollow}>Unfollow</button>
                    ) : (
                      <button onClick={handleFollow}>Follow</button>
                    )}
                    <br />
                    <br />
                    <button onClick={goBack}>Go Back</button>
                  </div>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "left",
                  backgroundColor: "red",
                  gap: "2rem",
                }}
              >
                <h4 onClick={navigateToFollowers} style={{ cursor: "pointer" }}>
                  {followers.length} Followers
                </h4>
                <h3 onClick={navigateToFollowees} style={{ cursor: "pointer" }}>
                  {followees.length} Following
                </h3>
              </div>
              <p
                style={{
                  display: "flex",
                  justifyContent: "left",
                  backgroundColor: "yellow",
                }}
              >
                Bio: {bio}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
