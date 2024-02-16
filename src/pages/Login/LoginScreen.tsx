import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { getProfile } from "../../../supabase/profileFunctions";
import {
  logInWithEmail,
  signUpNewUser,
  signOut,
} from "../../../supabase/auth.functions";

interface LoginScreenProps {
  userProps: User;
  sessionProps: Session;
}

export default function LoginScreen({
  userProps,
  sessionProps,
}: LoginScreenProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [session, setSession] = useState(sessionProps);
  const [user, setUser] = useState<User | null>(userProps);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const [username, setUsername] = useState("");
  const [successfulSignUp, setSuccessfulSignUp] = useState(false);
  const url = "http://localhost:5173/profile/edit"; // might need to remove later

  const [passwordError, setPasswordError] = useState("");

  async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const signUpSuccessful = await signUpNewUser(
      email,
      password,
      username,
      url
    );
    if (signUpSuccessful) {
      console.log("VITE_SIGNIN_REDIRECT_URL", url);
      setSuccessfulSignUp(true);
    } else console.log("Sign up failed");
  }

  async function handleLogIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const loginSuccessful = await logInWithEmail(email, password);
    if (loginSuccessful) window.location.reload();
    else console.log("Login failed");
  }

  async function handleSignOut() {
    signOut().then(() => {
      console.log("User Logged Out");
      window.location.reload();
    });
  }

  useEffect(() => {
    if (user) {
      getProfile(user).then((data) => {
        setUsername(data && data[0]?.username);
      });
    }
  }, [user, username]);

  useEffect(() => {
    setSession(sessionProps);
    setUser(userProps);
  }, [session, sessionProps, user, userProps]);

  // eslint-disable-next-line prefer-const
  let handleSubmit = isSignUp ? handleSignUp : handleLogIn;

  if (successfulSignUp) {
    return <div>Check Email</div>;
  } else if (!session) {
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
          {isSignUp ? (
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          ) : null}
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value.length < 8) {
                  setPasswordError("Password must be at least 8 characters");
                } else {
                  setPasswordError("");
                }
              }}
              required
            />
            {passwordError && (
              <div style={{ color: "red" }}>{passwordError}</div>
            )}
          </label>
          <input type="submit" value={isSignUp ? "Sign Up" : "Login"} />
          <button onClick={() => setIsSignUp(!isSignUp)}>
            Switch to {isSignUp ? "Login" : "Sign Up"}
          </button>
        </form>
      </>
    );
  } else if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div>
          <div>Logged in!</div>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
        <p>Welcome {username}</p>
      </>
    );
  }
}
