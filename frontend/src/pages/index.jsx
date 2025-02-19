import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Create root element and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // StrictMode helps identify potential problems
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
