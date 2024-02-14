import Profile from "../../interfaces/profile.interface";
import "./Navbar.css";

import { Link, useMatch, useResolvedPath } from "react-router-dom";

interface ProfileProps {
  profile: Profile | null; // replace `Profile` with the actual type of your profile
}

export default function Navbar({ profile }: ProfileProps) {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Cook 'n' Collab
      </Link>
      <div>
        <ul>
          <CustomLink to="/recipes">Recipes</CustomLink>
          {profile ? (
            <>
              <CustomLink to={`${profile?.username}`}>Profile</CustomLink>
            </>
          ) : (
            <CustomLink to="/login">Login</CustomLink>
          )}
        </ul>
      </div>
    </nav>
  );
}

interface CustomLinkProps {
  to: any;
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
