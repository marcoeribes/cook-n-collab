import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../../supabase/profileFunctions";
import { updatePassword } from "../../../supabase/auth.functions";
import "./LoginScreen.css";
import { passwordCharsRegex, passwordLengthRegex } from "../../utils/regex";

interface NewPasswordScreenProps {
  userProps: User;
  sessionProps: Session;
}

export default function NewPasswordScreen({
  userProps,
  sessionProps,
}: NewPasswordScreenProps) {
  const navigate = useNavigate();

  const [session, setSession] = useState(sessionProps);
  const [user, setUser] = useState<User | null>(userProps);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [username, setUsername] = useState("");
  const [authError, setAuthError] = useState("");

  async function handlePasswordUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    switch (true) {
      case password.trim() === "" || confirmPassword.trim() === "":
        setAuthError("Please enter all fields");
        return;
      case !passwordCharsRegex.test(password) ||
        !passwordCharsRegex.test(confirmPassword):
        setAuthError(
          "Password must contain at least one digit, one lowercase letter, and one uppercase letter"
        );
        return;
      case !passwordLengthRegex.test(password) ||
        !passwordLengthRegex.test(confirmPassword):
        setAuthError("Password must be at least 8 characters");
        return;
      case password !== confirmPassword:
        setAuthError("Passwords do not match");
        return;
      default:
        setAuthError("");
        break;
    }

    console.log("update");
    updatePassword(password).then((result) => {
      if (result.success === true) navigate("/");
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
  return (
    <div className="screen">
      <form onSubmit={handlePasswordUpdate} className="box">
        <h2 className="box-title-reset">Cook 'n' Collab</h2>
        <h4>Enter new password</h4>
        <label className="label">
          Password
          <input
            type="password"
            value={password}
            className="text-input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="label">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            className="text-input"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <div className="side-by-side-buttons-container">
          <input
            type="submit"
            className="button tertiary-button"
            style={{ width: 96 }}
            value="Enter"
          />
        </div>
        <div style={{ color: "red", paddingTop: 40 }}>{authError}</div>
      </form>
    </div>
  );
}
