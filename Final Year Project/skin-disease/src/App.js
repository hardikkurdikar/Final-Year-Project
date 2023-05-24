import React, { useState } from 'react';
import AboutUs from './AboutUs';
import PredictionPage from './PredictionPage';
import './App.css';

function App() {
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showPredictionPage, setShowPredictionPage] = useState(false);

  const handleAboutUsClick = () => {
    setShowAboutUs(true);
  };

  const handlePredictionClick = () => {
    setShowPredictionPage(true);
  };

  const handleBackToHomeClick = () => {
    setShowAboutUs(false);
  };

  return (
    <div className="App">
      {!showAboutUs && !showPredictionPage && (
        <>
          <h1 className="maintitle">Skin Disease Prediction</h1>
          <div className="btn-container">
            <button className="btnabt" onClick={handleAboutUsClick}>About Us</button>
            <button className="btnsp" onClick={handlePredictionClick}>Start Prediction</button>
          </div>
        </>
      )}
      {showAboutUs && (
        <AboutUs onBackToHomeClick={handleBackToHomeClick} />
      )}
      {showPredictionPage && (
        <PredictionPage />
      )}
    </div>
  );
}

export default App;
