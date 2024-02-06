import { useState, useEffect } from "react";
import { supabase } from "../../supabase/client";
import { User } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import Avatar from "../components/avatar/Avatar";

export default function AboutScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [avatarName, setAvatarName] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [arrLength, setArrLength] = useState<number>(0);

  // Upload file using standard upload

  async function deleteAvatar() {
    if (arrLength > 1) {
      const { data, error } = await supabase.storage
        .from("avatars")
        .remove([user?.id + "/" + avatarName]);
      if (error) {
        console.error("Error deleting image: ", error);
      } else {
        console.log("Image deleted successfully", data);
        fetchAvatar();
      }
    }
  }

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];
    const filePath = user?.id + "/" + uuidv4().substring(0, 8) + ".jpg";

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (error) {
      console.error("Error uploading image: ", error);
    } else {
      console.log("Image uploaded successfully", data);
      deleteAvatar();
      setAvatarUrl(filePath);
      fetchAvatar();
    }
  }

  async function fetchPublicUrl() {
    const { data } = await supabase.storage
      .from("avatars")
      .getPublicUrl(user?.id + "/");
    if (data) {
      console.log("Avatar URL:", data.publicUrl);
      setAvatarUrl(data.publicUrl);
    }
  }

  async function fetchAvatar() {
    const { data, error } = await supabase.storage
      .from("avatars")
      .list(user?.id + "/");

    if (data) {
      console.log("Avatar List:", data);
      console.log(data);
      console.log("arr length", data.length);
      setArrLength(data.length);
      setAvatarName(data[0]?.name);
      console.log("Avatar Name:", avatarName);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("user in login", user);
      setUser(user);
    }
    fetchData();
  }, []);

  useEffect(() => {
    fetchAvatar();
    fetchPublicUrl();
    console.log("Avatar URL:", avatarUrl);
  }, [avatarName]);

  return (
    <>
      <Avatar
        /*imageUrl={
          avatarUrl
            ? avatarUrl + avatarName
            : "https://pfrmlsmgjrdyiccuhyyi.supabase.co/storage/v1/object/public/avatars/0dd993f4-0adb-4b4e-a855-a32a13aa2313/7f99d95d-ecdc-409d-845f-88b7446d3600.jpg"
        }*/
        imageUrl={avatarUrl + avatarName}
        //imageUrl="https://pfrmlsmgjrdyiccuhyyi.supabase.co/storage/v1/object/public/avatars/0dd993f4-0adb-4b4e-a855-a32a13aa2313/7f99d95d-ecdc-409d-845f-88b7446d3600.jpg"
      />
      <input
        type="file"
        onChange={(e) => {
          uploadAvatar(e);
        }}
      />
      <button onClick={deleteAvatar}>Delete Avatar</button>
    </>
  );
}
