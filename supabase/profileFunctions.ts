import { supabase } from "../supabase/client";
import { User } from "@supabase/supabase-js";

export async function getProfile(user: User) {
  const { data, error } = await supabase
    .from("profile")
    .select()
    .eq("id", user?.id);
  if (error) {
    console.error("Error getting profile:", error.message);
  } else {
    console.log("Profile in profileFunctions:", data);
    return data;
  }
}

export async function getFollowers(user: User) {
  const { data, error } = await supabase
    .from("follow_relationship")
    .select("follower_id")
    .eq("followee_id", user?.id);
  if (error) {
    console.error("Error getting followers:", error.message);
  } else {
    return data;
  }
}

export async function getFollowees(user: User) {
  const { data, error } = await supabase
    .from("follow_relationship")
    .select("followee_id")
    .eq("follower_id", user?.id);
  if (error) {
    console.error("Error getting followees:", error.message);
  } else {
    return data;
  }
}

export async function updateProfile(
  user: User,
  newUsername?: string,
  newBio?: string,
  newAvatarUrl?: string
) {
  const { error } = await supabase
    .from("profile")
    .update({
      username: newUsername,
      bio: newBio,
      avatar_url: newAvatarUrl,
    })
    .eq("id", user?.id);
  if (error) {
    console.error("Error changing username & bio:", error.message);
  } else {
    console.log("username updated:", newUsername);
    console.log("bio updated:", newBio);
  }
}

export async function getUsername(userId: string) {
  const { data, error } = await supabase
    .from("profile")
    .select("username")
    .eq("id", userId);
  if (error) {
    console.error("Error getting username:", error.message);
  } else {
    console.log("Username:", data);
    return data;
  }
}
