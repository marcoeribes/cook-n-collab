import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="nav">
      <a href="/" className="site-title">
        Site Name
      </a>
      <ul>
        <li>
          <a href="/recipes">Recipes</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
      </ul>
    </nav>
  );
}
