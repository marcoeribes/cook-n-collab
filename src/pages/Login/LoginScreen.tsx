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
  const [isLoading, setIsLoading] = useState(true);

  const [session, setSession] = useState(sessionProps);
  const [user, setUser] = useState<User | null>(userProps);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const [username, setUsername] = useState("");
  const [successfulSignUp, setSuccessfulSignUp] = useState(false);
  const url = "http://localhost:5173/profile/edit"; // might need to remove later

  async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const signUpSuccessful = await signUpNewUser(email, password, url);
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
      setIsLoading(true);
      getProfile(user).then((data) => {
        setUsername(data && data[0]?.username);
        setIsLoading(false);
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
