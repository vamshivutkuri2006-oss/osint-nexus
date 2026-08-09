import { useState } from "react";
import axios from "axios";

function Email() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!email.trim()) {
      setError("Please enter an email address.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/email/${encodeURIComponent(
          email.trim()
        )}`
      );

      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="username-page">
      <h1>Email Intelligence 📧</h1>

      <p className="subtitle">
        Analyze an email address and its domain.
      </p>

      <div className="username-search-box">
        <input
          type="email"
          placeholder="Enter email address..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <button
          className="full-button"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "🔎 Investigate"}
        </button>
      </div>

      {error && <div className="error">⚠️ {error}</div>}

      {loading && (
        <div className="scan-status">
          <div className="spinner"></div>
          <div>
            <strong>Analyzing email...</strong>
            <p>Checking syntax, domain and provider information.</p>
          </div>
        </div>
      )}

      {result && !loading && (
        <div className="search-results">
          <div className="results-header">
            <div>
              <h2>Email Analysis</h2>
              <p>{result.email}</p>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <span>✅</span>
              <div>
                <small>Format</small>
                <strong>
                  {result.valid_format ? "Valid" : "Invalid"}
                </strong>
              </div>
            </div>

            <div className="stat-card">
              <span>🌐</span>
              <div>
                <small>Domain</small>
                <strong>{result.domain || "Unknown"}</strong>
              </div>
            </div>

            <div className="stat-card">
              <span>📮</span>
              <div>
                <small>Provider</small>
                <strong>{result.provider || "Unknown"}</strong>
              </div>
            </div>

            <div className="stat-card">
              <span>🛡️</span>
              <div>
                <small>Disposable</small>
                <strong>
                  {result.disposable ? "Yes" : "No"}
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Email;