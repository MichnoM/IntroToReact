import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const texts = [
    "The quick brown fox jumps over the lazy dog.",
    "React is a powerful library for building user interfaces.",
    "Programming is both an art and a science."
  ];

  const [text, setText] = useState(''); // Stores the randomly selected text
  const [userInput, setUserInput] = useState(''); // Stores the user input
  const [startTime, setStartTime] = useState(null); // Stores the time when the user started typing
  const [endTime, setEndTime] = useState(null); // Stores the time when the user stopped typing
  const [wpm, setWpm] = useState(null); // Stores the words per minute result
  const [isCompleted, setIsCompleted] = useState(false); // Stores if the test has been completed

  useEffect(() => {
    // Generate a random text when the component mounts
    const randomIndex = Math.floor(Math.random() * texts.length);
    setText(texts[randomIndex]);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (startTime === null) {
      setStartTime(Date.now()); // Start timer when typing begins
    }

    setUserInput(value);

    // Check if the user finished typing
    if (value === text) {
      setEndTime(Date.now());
      setIsCompleted(true);
      calculateResults(value);
    }
  };

  const calculateResults = () => {
    // Calculate time in minutes
    const timeTaken = (Date.now() - startTime) / 1000 / 60; // in minutes
    const wordCount = text.split(" ").length; // Count words in the target text
    const wpm = Math.round(wordCount / timeTaken); // Words per minute
  
    setWpm(wpm);
  };

  const resetTest = () => {
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setWpm(null);
    setIsCompleted(false);
    const randomIndex = Math.floor(Math.random() * texts.length);
    setText(texts[randomIndex]);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Typing Speed Test</h1>
      <p>Type the text below as fast as you can:</p>
      <p style={{ fontSize: '18px', fontStyle: 'italic', margin: '20px 0' }}>{text}</p>

      {!isCompleted ? (
        <textarea
          value={userInput}
          onChange={handleInputChange}
          placeholder="Start typing here..."
          rows="5"
          style={{ width: '80%', padding: '10px' }}
        />
      ) : (
        <div>
          <h2>Results:</h2>
          <p>WPM: {wpm}</p>
          <button onClick={resetTest} style={{ padding: '10px 20px', cursor: 'pointer' }}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};
  
  export default App;