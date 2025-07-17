import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import BudgetTracker from './BudgetTracker';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BudgetTracker />
  </React.StrictMode>
);
