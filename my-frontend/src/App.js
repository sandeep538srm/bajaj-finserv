import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    alphabets: false,
    numbers: false,
    highestAlphabet: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = JSON.parse(jsonInput);
      if (!Array.isArray(data.data)) {
        throw new Error("Invalid data format");
      }
      const res = await axios.post(
        "https://bajaj-finserv-ovkwfc6d0-sandeep-reddy-yarams-projects.vercel.app/bfhl",
        data
      );
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError("Invalid JSON input or server error");
      setResponse(null);
    }
  };

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilter((prev) => ({ ...prev, [name]: checked }));
  };

  const renderResponse = () => {
    if (!response) return null;
    const { alphabets, numbers, highest_alphabet } = response;
    const result = {};
    if (filter.alphabets) result.alphabets = alphabets;
    if (filter.numbers) result.numbers = numbers;
    if (filter.highestAlphabet) result.highestAlphabet = highest_alphabet;
    return <pre>{JSON.stringify(result, null, 2)}</pre>;
  };

  return (
    <div className="App">
      <h1>Your Roll Number</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON here (e.g., {"data": ["A", "C", "z"]})'
          rows="6"
          cols="50"
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response && (
        <div>
          <h2>Filter Results</h2>
          <label>
            <input
              type="checkbox"
              name="alphabets"
              checked={filter.alphabets}
              onChange={handleFilterChange}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              name="numbers"
              checked={filter.numbers}
              onChange={handleFilterChange}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              name="highestAlphabet"
              checked={filter.highestAlphabet}
              onChange={handleFilterChange}
            />
            Highest Alphabet
          </label>
          <div>{renderResponse()}</div>
        </div>
      )}
    </div>
  );
}

export default App;
