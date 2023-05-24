import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us">
      <h1 className="title">About Us</h1>
      <div className="content">
        <div className="rectangle">
          <p className="text">
            Welcome to our website for skin disease prediction using deep learning! Our team, consisting of Medhavi Raikar, Hardik Kurdikar and Vaishnavi Palkar has developed an advanced system that accurately identifies and classifies skin diseases using deep learning. Our mission is to use technology to improve healthcare outcomes and empower patients to take control of their health. Thank you for visiting our website!
          </p>
        </div>
        <a href="/" className="btn">Back to Home</a>
      </div>
    </div>
  );
}

export default AboutUs;