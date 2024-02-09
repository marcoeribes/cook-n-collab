import { supabase } from "../supabase/client";

export async function signUpNewUser(
  email: string,
  password: string,
  url?: string
) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: url,
    },
  });
  if (error) {
    console.error("Error signing up:", error.message);
  } else if (data.user?.identities?.length === 0) {
    console.error("User already exists", data);
  } else {
    console.log("User signed up:", data);
    return data;
  }
}

export async function logInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    console.error("Error signing up:", error.message);
    return false;
  } else {
    console.log("User Logged In:", data);
    return true;
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) console.error("Error signing out:", error.message);
}
