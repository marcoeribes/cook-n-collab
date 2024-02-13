/*import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from "../../components/avatar/Avatar";
import {
  getProfile,
  getProfileByUsername,
} from "../../../supabase/profileFunctions";

export default function FollowerProfileScreen({}) {
  const { username } = useParams();

  const [avatarUrl, setAvatarUrl] = useState<string>("");

  useEffect(() => {
    if (username) {
      getProfileByUsername(username).then((data) => {
        setAvatarUrl(data && data[0]?.avatar_url);
      });
    }
  });

  return (
    <div>
      <div>
        <div>
          <strong>Id: {id}</strong>
        </div>
        <div>
          <strong>Name:</strong>
        </div>
        <Avatar imageUrl={avatarUrl} size={300} />
      </div>
    </div>
  );
}*/

//export default ViewUserDetails;

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { getProfileByUsername } from "../../../supabase/profileFunctions";
import Avatar from "../../components/avatar/Avatar";
import Profile from "../../interfaces/profile.interface";

export default function FollowerProfileScreen({}) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  //const [id, setId] = useState<string | undefined>(profileId);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  const [followers, setFollowers] = useState<string[]>([]);
  const [followees, setFollowees] = useState<string[]>([]);

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (id) {
      getProfileByUsername(id).then((data) => {
        setUsername(data && data[0]?.username);
        setBio(data && data[0]?.bio);
        setAvatarUrl(data && data[0]?.avatar_url);
        setIsLoading(false);
      });
    }
  }, [id, username, bio, avatarUrl]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Profile</h1>
          <Avatar imageUrl={avatarUrl} size={300} />
          <p>Username: {username}</p>
          <p>Bio: {bio}</p>
          <button onClick={goBack}>Go Back</button>
        </>
      )}
    </>
  );
}
