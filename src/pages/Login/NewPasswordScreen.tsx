import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../../supabase/profileFunctions";
import { updatePassword } from "../../../supabase/auth.functions";
import "./LoginScreen.css";

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

  async function handlePasswordUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
      </form>
    </div>
  );
}
