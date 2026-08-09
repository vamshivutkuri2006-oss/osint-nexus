import { useState } from "react";
import { quickSearch, fullSearch } from "../services/api";

function Username() {
  const [username, setUsername] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("");
  const [error, setError] = useState("");
  const [scanTime, setScanTime] = useState(null);

  const handleSearch = async (searchFunction, scanMode) => {
    if (!username.trim()) {
      setError("Please enter a username.");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);
    setMode(scanMode);
    setScanTime(null);

    const startTime = performance.now();

    try {
      const data = await searchFunction(username.trim());

      const endTime = performance.now();
      const elapsed = ((endTime - startTime) / 1000).toFixed(2);

      setResults(data.results || []);
      setScanTime(elapsed);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the OSINT Nexus backend.");
    } finally {
      setLoading(false);
    }
  };

  const copyLink = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="username-page">

      <h1>Username Intelligence 🔎</h1>

      <p className="subtitle">
        Investigate public profiles associated with a username.
      </p>

      <div className="username-search-box">

        <input
          type="text"
          placeholder="Enter username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(fullSearch, "Full Scan");
            }
          }}
        />

        <button
          className="quick-button"
          disabled={loading}
          onClick={() =>
            handleSearch(quickSearch, "Quick Scan")
          }
        >
          ⚡ Quick Scan
        </button>

        <button
          className="full-button"
          disabled={loading}
          onClick={() =>
            handleSearch(fullSearch, "Full Scan")
          }
        >
          🔍 Full Scan
        </button>

      </div>

      {loading && (
        <div className="scan-status">
          <div className="spinner"></div>

          <div>
            <strong>{mode} in progress...</strong>
            <p>
              Searching public OSINT sources. Please wait.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="error">
          ⚠️ {error}
        </div>
      )}

      {!loading && scanTime !== null && (
        <div className="stats-grid">

          <div className="stat-card">
            <span>🔎</span>
            <div>
              <small>Scan Type</small>
              <strong>{mode}</strong>
            </div>
          </div>

          <div className="stat-card">
            <span>👤</span>
            <div>
              <small>Username</small>
              <strong>{username}</strong>
            </div>
          </div>

          <div className="stat-card">
            <span>🌐</span>
            <div>
              <small>Profiles Found</small>
              <strong>{results.length}</strong>
            </div>
          </div>

          <div className="stat-card">
            <span>⏱️</span>
            <div>
              <small>Scan Time</small>
              <strong>{scanTime}s</strong>
            </div>
          </div>

        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="search-results">

          <div className="results-header">
            <div>
              <h2>Investigation Results</h2>

              <p>
                Public profiles discovered for{" "}
                <strong>{username}</strong>
              </p>
            </div>

            <div className="result-count">
              {results.length}
              <span> Profiles</span>
            </div>
          </div>

          {results.map((item, index) => (
            <div
              className="result-card"
              key={`${item.site}-${index}`}
            >

              <div className="result-info">

                <div className="site-icon">
                  🌐
                </div>

                <div>
                  <h3>{item.site}</h3>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.url}
                  </a>
                </div>

              </div>

              <button
                className="copy-button"
                onClick={() => copyLink(item.url)}
              >
                📋 Copy
              </button>

            </div>
          ))}

        </div>
      )}

      {!loading &&
        scanTime !== null &&
        results.length === 0 &&
        !error && (
          <div className="no-results">
            <h3>No profiles found</h3>
            <p>
              No matching public profiles were detected for this username.
            </p>
          </div>
        )}

    </div>
  );
}

export default Username;