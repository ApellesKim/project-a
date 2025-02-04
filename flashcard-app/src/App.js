import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import SearchBar from './search-bar';

function App() {
  const [words, setWords] = useState([]);
  const [error, setError] = useState("");

  const handleSearchResults = (wordsList, errorMessage = "") => {
    setWords(wordsList);
    setError(errorMessage);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Paste URL of article that you want to use!</p>
        <SearchBar onSearch={handleSearchResults} />
        
        {error && <p style={{ color: "red" }}>{error}</p>}
        
        {words.length > 0 && (
          <div>
            <h3>Extracted Words:</h3>
            <ul>
              {words.map((word, index) => (
                <li key={index}>{word}</li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;