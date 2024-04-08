import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../../supabase/profileFunctions";
import {
  logInWithEmail,
  signUpNewUser,
  signOut,
} from "../../../supabase/auth.functions";
import "./LoginScreen.css";
import {
  usernameCharsRegex,
  usernameLengthRegex,
  passwordCharsRegex,
  passwordLengthRegex,
  emailRegex,
} from "../../utils/regex";

interface LoginScreenProps {
  userProps: User;
  sessionProps: Session;
}

export default function LoginScreen({
  userProps,
  sessionProps,
}: LoginScreenProps) {
  const navigate = useNavigate();
  const url = "https://cookncollab/profile/edit";

  const [session, setSession] = useState(sessionProps);
  const [user, setUser] = useState<User | null>(userProps);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const [username, setUsername] = useState("");
  const [successfulSignUp, setSuccessfulSignUp] = useState(false);

  const [authError, setAuthError] = useState("");

  async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationResult = await validationCheck(email, username, password);
    if (validationResult !== "") {
      setAuthError(validationResult);
      return; // Exit handleSignUp if validation fails
    }
    const response = await signUpNewUser(email, password, username, url);

    if (response.success === true) {
      console.log("VITE_SIGNIN_REDIRECT_URL", url);
      setSuccessfulSignUp(true);
    } else if (response.fail === false) setAuthError(response.error);
  }

  async function handleLogIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await logInWithEmail(email, password);
    console.log(response);
    if (response.success === true) {
      navigate(`/${username}`);
      window.location.reload();
    } else if (response.fail === false) setAuthError(response.error);
  }

  async function handleSignOut() {
    signOut().then(() => {
      console.log("User Logged Out");
      window.location.reload();
    });
  }

  async function validationCheck(
    emailInput: string,
    usernameInput: string,
    passwordInput: string
  ): Promise<string> {
    switch (true) {
      case emailInput.trim() === "" ||
        usernameInput.trim() === "" ||
        passwordInput.trim() === "":
        return "Please enter all fields";
      case !emailRegex.test(emailInput):
        return "Invalid email";
      case !usernameCharsRegex.test(usernameInput):
        return "Username can only contain letters and numbers";
      case !usernameLengthRegex.test(usernameInput):
        return "Username must be between 4 to 20 characters";
      case !passwordCharsRegex.test(passwordInput):
        return "Password must contain at least one digit, one lowercase letter, and one uppercase letter";
      case !passwordLengthRegex.test(passwordInput):
        return "Password must be at least 8 characters";
      default:
        return ""; // No error
    }
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
      <div className="screen">
        <form onSubmit={handleSubmit} className="box">
          <h2
            className="box-title"
            onClick={() => {
              navigate("/");
            }}
          >
            Cook 'n' Collab
          </h2>
          <label className="label">
            Email:
            <input
              type="text"
              value={email}
              className="text-input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          {isSignUp ? (
            <label className="label">
              Username:
              <input
                type="text"
                value={username}
                className="text-input"
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          ) : null}
          <label className="label">
            Password:
            <input
              type="password"
              value={password}
              className="text-input"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          {!isSignUp && (
            <p
              style={{ color: "#1b6990", cursor: "pointer" }}
              onClick={() => {
                navigate("reset");
              }}
            >
              Forgot Password?
            </p>
          )}

          <input
            type="submit"
            className="button tertiary-button"
            value={isSignUp ? "Sign Up" : "Login"}
            style={{ marginTop: 40 }}
          />
          {isSignUp ? (
            <p>
              Have an account?{" "}
              <a
                style={{ color: "#1b6990", cursor: "pointer" }}
                onClick={() => setIsSignUp(!isSignUp)}
              >
                Login
              </a>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <a
                style={{ color: "#1b6990", cursor: "pointer" }}
                onClick={() => setIsSignUp(!isSignUp)}
              >
                Sign Up
              </a>
            </p>
          )}
          {<div style={{ color: "red" }}>{authError}</div>}
        </form>
      </div>
    );
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
