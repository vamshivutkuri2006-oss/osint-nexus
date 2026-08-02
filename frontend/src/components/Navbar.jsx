import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        🔎 <span>OSINT Nexus</span>
      </div>

      <div className="nav-links">
        <a href="#">Home</a>
        <a href="#">Documentation</a>
        <a
          href="https://github.com/vamshivutkuri2006-oss/osint-nexus"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>
    </nav>
  );
}

export default Navbar;