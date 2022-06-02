import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fontsource/inter/variable.css';
import { AppEntry } from './AppEntry';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppEntry />
  </React.StrictMode>
);
