import { useState, useEffect } from "react";
import { supabase } from "../../../supabase/client";
import { User } from "@supabase/supabase-js";

export default function LoginScreen() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");

  async function signUpNewUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      /*options: {
        emailRedirectTo: "./home",
      },*/
      //email_confirm: false,
    });
    if (error) {
      console.error("Error signing up:", error.message);
    } else if (data.user?.identities?.length === 0) {
      console.error("User already exists", data);
    } else {
      console.log("User signed up:", data);
      createUsername(event);
    }
  }

  async function signInWithEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.error("Error signing up:", error.message);
    } else {
      console.log("User Logged In:", data);
    }
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error signing out:", error.message);
    window.location.reload();
  }

  async function createUsername(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!user) {
      console.error("User must be authenticated to create a username.");
      return;
    }

    console.log("User:", user); // Debugging line
    console.log("New Username:", newUsername); // Debugging line

    const { data, error } = await supabase
      .from("profile")
      .insert([{ id: user?.id, username: newUsername }]);

    if (error) {
      console.error("Error creating username:", error.message);
    } else {
      console.log("Username created:", newUsername);
      const username =
        data?.user?.raw_user_meta_data?.username ?? "Default Name";
      setUsername(newUsername);
      setNewUsername("");
    }
  }

  async function changeUsername(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("User:", user); // Debugging line
    console.log("New Username:", newUsername); // Debugging line
    const { error } = await supabase
      .from("profile")
      .update({
        username: newUsername,
      })
      .eq("id", user?.id);
    if (error) {
      console.error("Error changing username:", error.message);
    } else {
      console.log("Username changed:", newUsername);
      setUsername(newUsername);
      setNewUsername("");
    }
  }

  useEffect(() => {
    async function getProfile() {
      const { data, error } = await supabase
        .from("profile")
        .select()
        .eq("id", user?.id);
      if (error) {
        console.error("Error getting profile:", error.message);
      } else {
        console.log("Profile:", data);
        setUsername(data[0]?.username);
      }
    }
    getProfile();
  });

  // Explain what's happening here
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session as null);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session as null);
    });

    return () => subscription.unsubscribe();
  }, []);

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

  // eslint-disable-next-line prefer-const
  let handleSubmit = isSignUp ? signUpNewUser : signInWithEmail;
  let handleUsername = username ? changeUsername : createUsername;

  if (!session) {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <input type="submit" value={isSignUp ? "Sign Up" : "Login"} />
          <button onClick={() => setIsSignUp(!isSignUp)}>
            Switch to {isSignUp ? "Login" : "Sign Up"}
          </button>
        </form>
      </>
    );
  } else {
    return (
      <>
        <div>
          <div>Logged in!</div>
          <button onClick={signOut}>Sign out</button>
        </div>
        <form onSubmit={handleUsername}>
          <label>
            New Username:
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              required
            />
          </label>
          <input
            type="submit"
            value={username ? "Change Username" : "Create Username"}
          />
        </form>
        <p>Welcome {username}</p>
      </>
    );
  }
}
