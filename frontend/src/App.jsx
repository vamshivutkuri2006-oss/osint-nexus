import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [results, setResults] = useState([]);
  const [count, setCount] = useState(0);

  const search = async () => {
    const res = await axios.get(
      `http://127.0.0.1:8000/search/${username}`
    );

    setResults(res.data.results);
    setCount(res.data.count);
  };

  return (
    <div className="container">
      <h1>OSINT Nexus</h1>

      <div className="searchBox">
        <input
          placeholder="Username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button onClick={search}>Search</button>
      </div>

      <h3>Accounts Found: {count}</h3>

      {results.map((item, index) => (
        <div className="card" key={index}>
          <h3>{item.site}</h3>

          <a href={item.url} target="_blank" rel="noreferrer">
            {item.url}
          </a>
        </div>
      ))}
    </div>
  );
}

export default App;