import { Routes, Route, NavLink } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Username from "./pages/Username";
import Email from "./pages/Email";
import Domain from "./pages/Domain";
import IP from "./pages/IP";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
  return (
    <div className="app">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">
          🔎 OSINT Nexus
        </div>

        <nav>
          <a href="/">Home</a>
          <a href="#">Documentation</a>

          <a
            href="https://github.com/vamshivutkuri2006-oss/osint-nexus"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </nav>
      </header>

      <div className="layout">

        {/* SIDEBAR */}
        <aside className="sidebar">
          <h3>OSINT Tools</h3>

          <NavLink
            to="/"
            className={({ isActive }) =>
              `menu ${isActive ? "active" : ""}`
            }
          >
            🏠 Dashboard
          </NavLink>

          <NavLink
            to="/username"
            className={({ isActive }) =>
              `menu ${isActive ? "active" : ""}`
            }
          >
            🔎 Username Search
          </NavLink>

          <NavLink
            to="/email"
            className={({ isActive }) =>
              `menu ${isActive ? "active" : ""}`
            }
          >
            📧 Email Lookup
          </NavLink>

          <NavLink
            to="/domain"
            className={({ isActive }) =>
              `menu ${isActive ? "active" : ""}`
            }
          >
            🌐 Domain Lookup
          </NavLink>

          <NavLink
            to="/ip"
            className={({ isActive }) =>
              `menu ${isActive ? "active" : ""}`
            }
          >
            🌍 IP Lookup
          </NavLink>

          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `menu ${isActive ? "active" : ""}`
            }
          >
            📄 Reports
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `menu ${isActive ? "active" : ""}`
            }
          >
            ⚙️ Settings
          </NavLink>
        </aside>

        {/* PAGE CONTENT */}
        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/username" element={<Username />} />
            <Route path="/email" element={<Email />} />
            <Route path="/domain" element={<Domain />} />
            <Route path="/ip" element={<IP />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>

      </div>
    </div>
  );
}

export default App;