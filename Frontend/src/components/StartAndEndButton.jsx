import React from 'react';
import './StartAndEndButton.css';

const StartAndEndButton = ({ 
  isConfigured, 
  isRunning, 
  onStart, 
  onStop,
  vendors // Add vendors as a prop
}) => {
  const handleStart = () => {
    if (vendors === 0) {
      alert("Cannot start the program with 0 vendors. Please add at least one vendor.");
      return;
    }
    onStart(); // Only call onStart if vendors > 0
  };

  return (
    <div className="start-stop-container">
      <button 
        className="start-button" 
        onClick={handleStart} // Use the new handler
        disabled={!isConfigured || isRunning}
      >
        Start
      </button>
      <button 
        className="stop-button" 
        onClick={onStop}
        disabled={!isRunning}
      >
        Stop
      </button>
    </div>
  );
};

export default StartAndEndButton;