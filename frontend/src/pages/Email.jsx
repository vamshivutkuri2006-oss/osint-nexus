import { useState } from "react";
import { emailLookup } from "../services/api";

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
      const data = await emailLookup(email.trim());
      setResult(data);
    } catch (err) {
      console.error("Email lookup error:", err);
      setError("Unable to connect to the OSINT Nexus backend.");
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

      {error && (
        <div className="error">
          ⚠️ {error}
        </div>
      )}

      {loading && (
        <div className="scan-status">
          <div className="spinner"></div>

          <div>
            <strong>Analyzing email...</strong>
            <p>
              Checking email format, domain and provider.
            </p>
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

            <div className="result-count">
              📧
            </div>
          </div>

          <div className="stats-grid">

            <div className="stat-card">
              <span>✅</span>

              <div>
                <small>Format</small>
                <strong>
                  {result.valid_format
                    ? "Valid"
                    : "Invalid"}
                </strong>
              </div>
            </div>

            <div className="stat-card">
              <span>🌐</span>

              <div>
                <small>Domain</small>
                <strong>
                  {result.domain || "Unknown"}
                </strong>
              </div>
            </div>

            <div className="stat-card">
              <span>📮</span>

              <div>
                <small>Provider</small>
                <strong>
                  {result.provider || "Unknown"}
                </strong>
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