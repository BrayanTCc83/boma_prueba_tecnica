import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './design/styles.css';

const ROOT = document.getElementById('root');

if (ROOT) {
  const root = ReactDOM.createRoot(ROOT);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  throw new Error('Elemento HTML root no encontrado.');
}