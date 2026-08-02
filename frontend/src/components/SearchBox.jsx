function SearchBox({
  username,
  setUsername,
  onSearch,
  loading,
}) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Enter username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
      />

      <button onClick={onSearch}>
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
}

export default SearchBox;