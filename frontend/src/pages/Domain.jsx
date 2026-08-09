import { useState } from "react";
import { domainLookup } from "../services/api";

function Domain() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLookup = async () => {
    if (!domain.trim()) {
      setError("Please enter a domain.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await domainLookup(domain.trim());
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

      <h1>Domain Intelligence 🌐</h1>

      <p className="subtitle">
        Analyze a domain and resolve its basic network information.
      </p>

      <div className="username-search-box">

        <input
          type="text"
          placeholder="Enter domain (example.com)..."
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
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
            <strong>Analyzing domain...</strong>
            <p>
              Resolving domain information.
            </p>
          </div>
        </div>
      )}

      {result && !loading && (
        <div className="search-results">

          <div className="results-header">
            <div>
              <h2>Domain Analysis</h2>
              <p>{result.domain}</p>
            </div>

            <div className="result-count">
              🌐
            </div>
          </div>

          <div className="stats-grid">

            <div className="stat-card">
              <span>🌐</span>

              <div>
                <small>Domain</small>
                <strong>{result.domain}</strong>
              </div>
            </div>

            <div className="stat-card">
              <span>📡</span>

              <div>
                <small>IP Address</small>
                <strong>
                  {result.ip_address || "Not found"}
                </strong>
              </div>
            </div>

            <div className="stat-card">
              <span>🖥️</span>

              <div>
                <small>Hostname</small>
                <strong>
                  {result.hostname || "Unknown"}
                </strong>
              </div>
            </div>

            <div className="stat-card">
              <span>
                {result.status === "Active" ? "✅" : "⚠️"}
              </span>

              <div>
                <small>Status</small>
                <strong>{result.status}</strong>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Domain;