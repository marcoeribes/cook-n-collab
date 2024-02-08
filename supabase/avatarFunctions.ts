import { supabase } from "../supabase/client";
import { User } from "@supabase/supabase-js";

// Need URL to display avatar image
export async function fetchAvatarImage(user: User) {
  const { data } = await supabase.storage.from("avatars").list(user?.id + "/");
  console.log("avatarData", data);
  return data;
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
