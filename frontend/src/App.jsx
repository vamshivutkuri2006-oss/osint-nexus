import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";
import { searchUsername } from "./services/api";

function App() {
  const [username, setUsername] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const data = await searchUsername(username);
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>🔎 OSINT Nexus</h1>

        <SearchBox
          username={username}
          setUsername={setUsername}
          onSearch={handleSearch}
          loading={loading}
        />

        {error && <p className="error">{error}</p>}

        {!loading && results.length > 0 && (
          <div className="results">
            <h2>Found {results.length} Profiles</h2>

            {results.map((item, index) => (
              <div className="card" key={index}>
                <h3>{item.site}</h3>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.url}
                </a>

                <br />
                <br />

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(item.url);
                    alert("Copied!");
                  }}
                >
                  Copy Link
                </button>
              </div>
            ))}
          </div>
        )}

        {!loading &&
          results.length === 0 &&
          username !== "" &&
          !error && <p>No profiles found.</p>}
      </div>
    </>
  );
}

export default App;