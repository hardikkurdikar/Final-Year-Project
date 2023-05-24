import React, { useState } from 'react';
import './PredictionPage.css';

function PredictionPage({ onBackToHomeClick }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleNextClick = () => {
    if (selectedFile) {
      setProcessing(true);
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const img = new Image();
      img.src = URL.createObjectURL(selectedFile);
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        const imageData = context.getImageData(0, 0, img.width, img.height);
        const data = imageData.data;

        // Convert to grayscale
        setTimeout(() => {
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const gray = 0.2989 * r + 0.5870 * g + 0.1140 * b;
            data[i] = gray;
            data[i + 1] = gray;
            data[i + 2] = gray;
          }

          context.putImageData(imageData, 0, 0);
          const newDataUrl = canvas.toDataURL('image/jpeg', 1.0);
          setSelectedFile(dataURItoBlob(newDataUrl));

          // Apply sharpening effect to the grayscale image
          setTimeout(() => {
            const sharpenedData = applySharpeningEffect(data, img.width, img.height, 1.5);
            for (let i = 0; i < sharpenedData.length; i++) {
              imageData.data[i] = sharpenedData[i];
            }

            context.putImageData(imageData, 0, 0);
            const newSharpenedDataUrl = canvas.toDataURL('image/jpeg', 1.0);
            setSelectedFile(dataURItoBlob(newSharpenedDataUrl));

            // Convert sharpened image to binary
            setTimeout(() => {
              const binaryData = applyBinaryEffect(sharpenedData);
              for (let i = 0; i < binaryData.length; i++) {
                imageData.data[i] = binaryData[i];
              }
              context.putImageData(imageData, 0, 0);
              const newBinaryDataUrl = canvas.toDataURL('image/jpeg', 1.0);
              setSelectedFile(dataURItoBlob(newBinaryDataUrl));
              setProcessing(false);
            }, 5000);
          }, 5000);
        }, 5000);
      };
    }
  };

  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    return blob;
  }

  function applySharpeningEffect(data, width, height, sharpnessMultiplier) {
    const newImageData = new Uint8ClampedArray(data.length);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;

        // Get the pixel values for the current and neighboring pixels
        const center = data.slice(index, index + 3);
        const left = data.slice(index - 4, index - 1);
        const right = data.slice(index + 4, index + 7);
        const above = data.slice(index - width * 4, index - width * 4 + 3);
        const below = data.slice(index + width * 4, index + width * 4 + 3);

        // Calculate the sharpened pixel values with configurable sharpness
        const sharpened = center.map((value, i) =>
          value + (sharpnessMultiplier * value - (left[i] + right[i] + above[i] + below[i]) / 3)
        );

        // Update the newImageData array with the sharpened pixel values
        for (let i = 0; i < 3; i++) {
          newImageData[index + i] = sharpened[i];
        }

        // Preserve the alpha channel
        newImageData[index + 3] = data[index + 3];
      }
    }

    return newImageData;
  }

  function applyBinaryEffect(data) {
    // Apply your desired binary effect here
    // Replace this implementation with your own logic
    const binaryData = new Uint8ClampedArray(data.length);
    for (let i = 0; i < data.length; i++) {
      binaryData[i] = data[i] > 128 ? 255 : 0;
    }
    return binaryData;
  }

  return (
    <div className="prediction-page">
      <h1 className="title">Prediction Page</h1>
      <div
        className="dropzone"
        onClick={() => document.getElementById('fileInput').click()}
      >
        {!selectedFile && <span className="add-image">Click To Add Image</span>}
        {selectedFile && (
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Selected file"
            className="image-preview"
          />
        )}
      </div>
      <input
        type="file"
        id="fileInput"
        accept=".jpg,.jpeg,.png"
        onChange={handleFileSelect}
        className="file-input"
      />
      <button
        className="next-btn"
        onClick={handleNextClick}
        disabled={!selectedFile || processing}
      >
        {processing ? 'Processing...' : 'Next'}
      </button>
      {/* <button className="back-btn" onClick={onBackToHomeClick}>
        Back to Home
      </button> */}
    </div>
  );
}

export default PredictionPage;