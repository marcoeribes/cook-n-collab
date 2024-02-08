import "./Navbar.css";

import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Cook 'n' Collab
      </Link>
      <div>
        <ul>
          <CustomLink to="/recipes">Recipes</CustomLink>
          <CustomLink to="/login">Login</CustomLink>
          <CustomLink to="/profile">Profile</CustomLink>
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
