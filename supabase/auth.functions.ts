import { supabase } from "../supabase/client";

export async function signUpNewUser(
  email: string,
  password: string,
  username: string,
  url?: string
) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: url,
      data: {
        username: username,
      },
    },
  });
  if (error) {
    return { fail: false, error: error.message };
  } else if (data.user?.identities?.length === 0) {
    return { fail: false, error: "User already exists" };
  } else {
    return { success: true, data };
  }
}

export async function logInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    return { fail: false, error: error.message };
  } else {
    return { success: true, data };
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) console.error("Error signing out:", error.message);
}

export async function sendPasswordResetToEmail(email: string, url: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: url,
  });
  if (error) {
    console.log({ success: false, error: error });
    return { success: false, error: error };
  } else {
    console.log({ success: true, data: data });
    return { success: true, data: data, url: url };
  }
}

export async function updatePassword(newPassword: string) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (error) {
    console.log({ success: false, error: error });
    return { success: false, error: error };
  } else {
    console.log({ success: true, data: data });
    return { success: true, data: data };
  }
}
