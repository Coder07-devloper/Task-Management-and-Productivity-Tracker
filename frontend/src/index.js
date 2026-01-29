/**
 * Index.js - React Entry Point
 * 
 * This is the main entry point for our React application.
 * It renders the App component into the root HTML element.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Get the root element from index.html
// React will render our App component inside this element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component
root.render(
  <React.StrictMode>
    {/* StrictMode helps identify potential problems during development */}
    <App />
  </React.StrictMode>
);

