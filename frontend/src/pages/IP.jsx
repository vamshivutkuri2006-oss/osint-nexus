import { useState } from "react";
import { ipLookup } from "../services/api";

function IP() {
  const [ip, setIp] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLookup = async () => {
    if (!ip.trim()) {
      setError("Please enter an IP address.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await ipLookup(ip.trim());
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="username-page">
      <h1>IP Intelligence 🌍</h1>

      <p className="subtitle">
        Analyze basic information about an IP address.
      </p>

      <div className="username-search-box">
        <input
          type="text"
          placeholder="Enter IP address..."
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLookup();
            }
          }}
        />

        <button
          className="full-button"
          onClick={handleLookup}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "🔎 Investigate"}
        </button>
      </div>

      {error && (
        <div className="error">
          ⚠️ {error}
        </div>
      )}

      {loading && (
        <div className="scan-status">
          <div className="spinner"></div>

          <div>
            <strong>Analyzing IP...</strong>
            <p>Checking IP address properties.</p>
          </div>
        </div>
      )}

      {result && !loading && (
        <div className="search-results">
          <div className="results-header">
            <div>
              <h2>IP Analysis</h2>
              <p>{result.ip}</p>
            </div>

            <div className="result-count">
              🌍
            </div>
          </div>

          <div className="stats-grid">

            <div className="stat-card">
              <span>🌍</span>
              <div>
                <small>IP Address</small>
                <strong>{result.ip}</strong>
              </div>
            </div>

            <div className="stat-card">
              <span>🔢</span>
              <div>
                <small>Version</small>
                <strong>
                  {result.version
                    ? `IPv${result.version}`
                    : "Invalid"}
                </strong>
              </div>
            </div>

            <div className="stat-card">
              <span>🔒</span>
              <div>
                <small>Private</small>
                <strong>
                  {result.private ? "Yes" : "No"}
                </strong>
              </div>
            </div>

            <div className="stat-card">
              <span>🌐</span>
              <div>
                <small>Global</small>
                <strong>
                  {result.global ? "Yes" : "No"}
                </strong>
              </div>
            </div>

          </div>

          <div className="stats-grid">

            <div className="stat-card">
              <span>🔄</span>
              <div>
                <small>Loopback</small>
                <strong>
                  {result.loopback ? "Yes" : "No"}
                </strong>
              </div>
            </div>

            <div className="stat-card">
              <span>⚠️</span>
              <div>
                <small>Reserved</small>
                <strong>
                  {result.reserved ? "Yes" : "No"}
                </strong>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default IP;