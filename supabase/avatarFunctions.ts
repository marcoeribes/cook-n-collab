import { supabase } from "../supabase/client";
import { User } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

// Need URL to display avatar image
export async function fetchAvatarImage(user: User) {
  const { data, error } = await supabase.storage
    .from("avatars")
    .list(user?.id + "/");
  if (error) {
    console.error("Error fetching avatar image:", error);
  } else {
    console.log("avatarData", data);
    return data;
  }
}

export async function fetchAvatarUrl(user: User) {
  const { data } = await supabase.storage
    .from("avatars")
    .getPublicUrl(user?.id + "/");
  if (data) {
    console.log("Avatar URL:", data.publicUrl);
    return data.publicUrl;
  }
}

export async function fetchDefaultAvatarUrl() {
  const { data } = await supabase.storage
    .from("avatars")
    .getPublicUrl("default-avatar.jpg");
  if (data) {
    console.log("Default Avatar URL:", data.publicUrl);
    return data.publicUrl;
  }
}

export async function uploadAvatar(
  user: User,
  event: React.ChangeEvent<HTMLInputElement>
) {
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
    return data;
  }
}

export async function deleteAvatar(user: User, avatarImage: string) {
  const { data, error } = await supabase.storage
    .from("avatars")
    .remove([user?.id + "/" + avatarImage]);
  if (error) {
    console.error("Error deleting image: ", error);
  } else {
    console.log("Image deleted successfully", data);
    return data;
  }
}
