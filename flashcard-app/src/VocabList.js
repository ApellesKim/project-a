import { useState, useEffect } from "react";

function VocabList() {
  const [vocabWords, setVocabWords] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://ideal-space-halibut-496vqvrxrxjcqqjp-5000.app.github.dev/vocab")
      .then((response) => {
        console.log("Response Status:", response.status);  // Check status code
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data);  // Check the returned data
        setVocabWords(data.map((item) => item.word));
        setError("");
      })
      .catch((error) => {
        console.error("Fetch error:", error);  // Log fetch error
        setError("Failed to fetch vocabulary words.");
      });
  }, []);
  

  return (
    <div>
      <h2>Random Vocabulary Words</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <ul>
        {vocabWords.map((word, index) => (
          <li key={index}>
            <strong>{word.word}</strong>: {word.definition}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VocabList;
