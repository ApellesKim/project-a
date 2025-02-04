import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return; // Prevent empty submission

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/scrape", {
        method: "POST",  // This should be POST, not GET
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      if (response.ok) {
        onSearch(data.words); // Pass words back to App.js
      } else {
        onSearch([], data.error); // Handle error
      }
    } catch (error) {
      onSearch([], "Failed to fetch data.");
    }

    setLoading(false);
    setUrl(''); // Clear input field
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="URL of article..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="submit" disabled={loading}>{loading ? "Loading..." : "Submit URL"}</button>
    </form>
  );
};

export default SearchBar;