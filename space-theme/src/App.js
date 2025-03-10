import React, { useState } from "react";
import "./App.css"; // Importing CSS file for styles

function App() {
  const [message, setMessage] = useState("");

  const handleButtonClick = (text) => {
    setMessage(text);
  };

  return (
    <div>
      <div className="star-background"></div>

      <div className="hello-text">
        <p>Hello</p>
      </div>

      <div>
        <button
          className="button"
          onClick={() => handleButtonClick("Button 1 clicked!")}
        >
          Button 1
        </button>
        <button
          className="button"
          onClick={() => handleButtonClick("Button 2 clicked!")}
        >
          Button 2
        </button>
      </div>

      {message && (
        <div style={{ fontSize: "1.5rem", color: "#ff9900", marginTop: "20px" }}>
          {message}
        </div>
      )}
    </div>
  );
}

export default App;
