import { Link, useMatch, useResolvedPath } from "react-router-dom";

import Profile from "../../interfaces/profile.interface";
import "./Navbar.css";

interface ProfileProps {
  profile: Profile | null; // replace `Profile` with the actual type of your profile
}

export default function Navbar({ profile }: ProfileProps) {
  return (
    <nav className="nav">
      <Link to="/" className="nav-home">
        <img
          src="/icons/cookncollab-logo2.png"
          alt="logo"
          className="nav-site-icon"
        />
        <h1 className="nav-site-title">Cook 'n' Collab</h1>
      </Link>
      <ul className="tabs">
        <CustomLink to="/recipes">Recipes</CustomLink>
        {profile ? (
          <>
            <CustomLink to={`${profile?.username}`}>Profile</CustomLink>
          </>
        ) : (
          <CustomLink to="/login">Login</CustomLink>
        )}
      </ul>
    </nav>
  );
}

interface CustomLinkProps {
  to: string;
  children: React.ReactNode;
}

function CustomLink({ to, children, ...props }: CustomLinkProps) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <>
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    </>
  );
}
