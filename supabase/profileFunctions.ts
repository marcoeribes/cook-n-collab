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
    console.log("Followers:", data);
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
    console.log("Followees:", data);
    return data;
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
