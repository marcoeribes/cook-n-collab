import { useState, useEffect } from "react";
import { supabase } from "../../../supabase/client";

export default function LoginScreen() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  async function signUpNewUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: "./home",
      },
    });
    if (error) {
      console.error("Error signing up:", error.message);
    } else if (data.user?.identities?.length === 0) {
      console.error("User already exists", data);
    } else {
      setUser(data.user);
      console.log("User signed up:", data);
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
      setUser(data.user);
      console.log("User signed up:", data);
    }
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error signing out:", error.message);
  }

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

  // eslint-disable-next-line prefer-const
  let handleSubmit = isSignUp ? signUpNewUser : signInWithEmail;

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
      <div>
        <div>Logged in!</div>
        <button onClick={signOut}>Sign out</button>
      </div>
    );
  }
}
