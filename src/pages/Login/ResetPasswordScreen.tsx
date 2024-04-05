import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../../supabase/profileFunctions";
import { sendPasswordResetToEmail } from "../../../supabase/auth.functions";
import "./LoginScreen.css";
import Button from "../../components/button/Button";

interface ResetPasswordScreenProps {
  userProps: User;
  sessionProps: Session;
}

export default function ResetPasswordScreen({
  userProps,
  sessionProps,
}: ResetPasswordScreenProps) {
  const navigate = useNavigate();

  const [session, setSession] = useState(sessionProps);
  const [user, setUser] = useState<User | null>(userProps);
  const [passwordResetResult, setPasswordResetResult] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const url = "localhost:5173/login/new_password"; // might need to remove later

  async function handleSendPasswordResetToEmail(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    console.log("reset");
    sendPasswordResetToEmail(email, url).then((result) => {
      setPasswordResetResult(result.success);
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
  if (passwordResetResult) {
    return <div>Check Email</div>;
  } else {
    return (
      <div className="screen">
        <form onSubmit={handleSendPasswordResetToEmail} className="box">
          <h2
            className="box-title-reset"
            onClick={() => {
              navigate("/");
            }}
          >
            Cook 'n' Collab
          </h2>
          <h4>Enter email to reset password</h4>
          <label className="label">
            Email
            <input
              type="text"
              value={email}
              className="text-input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <div className="side-by-side-buttons-container">
            <Button
              text="Go Back"
              onClick={() => navigate("/login")}
              style="button primary-button"
            />
            <input
              type="submit"
              className="button secondary-button"
              style={{ width: 96 }}
              value="Reset"
            />
          </div>
        </form>
      </div>
    );
  }
}
