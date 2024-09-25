import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' in React 18
import './index.css';
import App from './App';

// Get the root element from the DOM
const rootElement = document.getElementById('root');

// Create a root using the new createRoot API
const root = ReactDOM.createRoot(rootElement);

// Render your app using root.render
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
