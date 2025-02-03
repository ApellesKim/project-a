import React, { useState } from 'react';

const SearchBar = () => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`URL submitted: ${url}`);
    setUrl(''); // Clear the input after submitting
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="URL of article..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="submit">Submit URL</button>
    </form>
  );
};

export default SearchBar;
